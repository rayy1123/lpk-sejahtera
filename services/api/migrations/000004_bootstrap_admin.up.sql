-- ==============================================================================
-- 000004_bootstrap_admin.up.sql
-- PT. Sejahtera Abadi Bersama — Prosedur Bootstrap Super Admin Aman
-- ==============================================================================

-- Fungsi ini HANYA dapat dijalankan oleh Postgres Superuser / Service Role di Supabase SQL Editor.
-- Tidak terpapar ke API REST publik dan tidak dapat dipanggil oleh anon/authenticated.

CREATE OR REPLACE FUNCTION bootstrap_super_admin(target_email TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Berjalan dengan privileges pembuat (database owner)
AS $$
DECLARE
    target_user_id UUID;
    existing_role VARCHAR(50);
    result JSONB;
BEGIN
    -- 1. Cari user di auth.users berdasarkan email
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = target_email;

    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User dengan email % tidak ditemukan di auth.users. Daftarkan akun terlebih dahulu.', target_email;
    END IF;

    -- 2. Pastikan profil pengguna ada di tabel profiles
    INSERT INTO profiles (id, full_name, phone, created_at, updated_at)
    VALUES (target_user_id, 'Super Administrator LPK', NULL, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;

    -- 3. Berikan role super_admin
    INSERT INTO user_roles (user_id, role_id, assigned_by, created_at)
    VALUES (target_user_id, 'super_admin', target_user_id, NOW())
    ON CONFLICT (user_id, role_id) DO NOTHING;

    -- 4. Catat tindakan bootstrap ke dalam tabel audit_logs
    INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, metadata, created_at)
    VALUES (
        target_user_id,
        'BOOTSTRAP_SUPER_ADMIN',
        'user_roles',
        target_user_id::TEXT,
        jsonb_build_object(
            'email', target_email,
            'role', 'super_admin',
            'method', 'SECURITY_DEFINER_STORED_PROCEDURE',
            'timestamp', NOW()
        ),
        NOW()
    );

    result := jsonb_build_object(
        'success', true,
        'message', 'Akun berhasil ditingkatkan menjadi super_admin secara aman',
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
