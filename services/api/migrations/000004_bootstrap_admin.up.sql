-- ==============================================================================
-- 000004_bootstrap_admin.up.sql
-- PT. Sejahtera Abadi Bersama — Prosedur Bootstrap Super Admin Aman & Konkuren
-- ==============================================================================

-- Fungsi ini HANYA dapat dijalankan oleh Postgres Superuser / Service Role di Supabase SQL Editor.
-- Tidak terpapar ke API REST publik dan tidak dapat dipanggil oleh anon/authenticated.

CREATE OR REPLACE FUNCTION bootstrap_super_admin(target_email TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
DECLARE
    target_user_id UUID;
    result JSONB;
BEGIN
    -- 1. Kunci transaksi menggunakan Transaction-Scoped Advisory Lock eksklusif
    -- Mencegah race condition jika fungsi dipanggil bersamaan dari dua sesi konkuren.
    -- Lock dilepas otomatis saat transaksi berakhir (commit atau rollback).
    PERFORM pg_advisory_xact_lock(hashtext('bootstrap_super_admin_lock'));

    -- 2. Cari user di auth.users berdasarkan email (schema-qualified)
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = target_email;

    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User dengan email % tidak ditemukan di auth.users. Daftarkan akun terlebih dahulu di Supabase Auth.', target_email;
    END IF;

    -- 3. Pastikan prosedur hanya untuk bootstrapping admin PERTAMA (First-Admin Lockout)
    IF EXISTS (SELECT 1 FROM public.user_roles WHERE role_id = 'super_admin') THEN
        IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = target_user_id AND role_id = 'super_admin') THEN
            RETURN jsonb_build_object(
                'success', true,
                'message', 'User sudah memiliki role super_admin',
                'user_id', target_user_id
            );
        END IF;
        RAISE EXCEPTION 'Mekanisme bootstrap terkunci: Super Admin sudah terdaftar di sistem. Penambahan admin baru harus melalui panel administrasi resmi.';
    END IF;

    -- 4. Pastikan profil pengguna ada di tabel profiles (schema-qualified)
    INSERT INTO public.profiles (id, full_name, phone, created_at, updated_at)
    VALUES (target_user_id, 'Super Administrator LPK', NULL, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;

    -- 5. Berikan role super_admin (schema-qualified)
    INSERT INTO public.user_roles (user_id, role_id, assigned_by, created_at)
    VALUES (target_user_id, 'super_admin', target_user_id, NOW())
    ON CONFLICT (user_id, role_id) DO NOTHING;

    -- 6. Catat tindakan bootstrap ke dalam tabel audit_logs (schema-qualified)
    INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, metadata, created_at)
    VALUES (
        target_user_id,
        'BOOTSTRAP_SUPER_ADMIN_LOCKED',
        'user_roles',
        target_user_id::TEXT,
        jsonb_build_object(
            'email', target_email,
            'role', 'super_admin',
            'method', 'SECURITY_DEFINER_STORED_PROCEDURE_ADVISORY_LOCKED',
            'timestamp', NOW()
        ),
        NOW()
    );

    result := jsonb_build_object(
        'success', true,
        'message', 'Akun berhasil ditingkatkan menjadi super_admin pertama. Mekanisme bootstrap kini terkunci otomatis.',
        'user_id', target_user_id,
        'email', target_email
    );

    RETURN result;
END;
$$;

-- Cabut seluruh izin eksekusi dari role publik dan peserta
REVOKE ALL ON FUNCTION bootstrap_super_admin(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION bootstrap_super_admin(TEXT) FROM anon;
REVOKE ALL ON FUNCTION bootstrap_super_admin(TEXT) FROM authenticated;

-- Hanya berikan ke service_role (Admin Console Supabase)
GRANT EXECUTE ON FUNCTION bootstrap_super_admin(TEXT) TO service_role;
