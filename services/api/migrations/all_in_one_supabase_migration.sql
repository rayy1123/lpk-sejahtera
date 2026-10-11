-- ==============================================================================
-- ALL-IN-ONE SUPABASE MIGRATION SCRIPT
-- PT. Sejahtera Abadi Bersama — Lembaga Pelatihan Kerja
-- ==============================================================================
-- Cukup salin seluruh isi file ini sekali saja ke SQL Editor Supabase, lalu klik RUN.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABEL-TABEL (18 Tabel)
-- A. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- B. ROLES
CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- C. USER_ROLES
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role_id VARCHAR(50) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_roles UNIQUE (user_id, role_id)
);

-- D. PERMISSIONS
CREATE TABLE IF NOT EXISTS permissions (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT
);

-- E. ROLE_PERMISSIONS
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id VARCHAR(50) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id VARCHAR(100) NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- F. PROGRAM_CATEGORIES
CREATE TABLE IF NOT EXISTS program_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- G. PROGRAMS
CREATE TABLE IF NOT EXISTS programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES program_categories(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    curriculum JSONB NOT NULL DEFAULT '[]'::jsonb,
    duration VARCHAR(100) NOT NULL,
    price NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
    quota INT NOT NULL DEFAULT 30,
    thumbnail_path TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- H. APPLICATIONS
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    program_id UUID NOT NULL REFERENCES programs(id) ON DELETE RESTRICT,
    application_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'verified', 'approved', 'rejected')),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- I. STUDENT_DOCUMENTS
CREATE TABLE IF NOT EXISTS student_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('ktp', 'kk', 'ijazah', 'paspor', 'foto', 'skck', 'medis')),
    storage_path TEXT NOT NULL,
    verification_status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'valid', 'invalid')),
    verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    verified_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- J. INSTRUCTORS
CREATE TABLE IF NOT EXISTS instructors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    bio TEXT,
    specialization VARCHAR(200) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- K. CLASSES
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES programs(id) ON DELETE RESTRICT,
    instructor_id UUID REFERENCES instructors(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    capacity INT NOT NULL DEFAULT 25,
    status VARCHAR(30) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- L. CLASS_ENROLLMENTS
CREATE TABLE IF NOT EXISTS class_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'active', 'passed', 'failed', 'dropped')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_class_student UNIQUE (class_id, student_id)
);

-- M. SCHEDULES
CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    location VARCHAR(255) DEFAULT 'Kampus LPK PT. Sejahtera Abadi Bersama',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- N. ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_enrollment_id UUID NOT NULL REFERENCES class_enrollments(id) ON DELETE CASCADE,
    schedule_id UUID NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
    attendance_status VARCHAR(30) NOT NULL CHECK (attendance_status IN ('present', 'late', 'excused', 'absent')),
    recorded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_enrollment_schedule UNIQUE (class_enrollment_id, schedule_id)
);

-- O. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(30) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- P. CERTIFICATES
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    program_id UUID NOT NULL REFERENCES programs(id) ON DELETE RESTRICT,
    class_enrollment_id UUID REFERENCES class_enrollments(id) ON DELETE SET NULL,
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    storage_path TEXT NOT NULL,
    issued_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Q. SITE_SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- R. AUDIT_LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category_id);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_applications_student ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_program ON applications(program_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_appnum ON applications(application_number);
CREATE INDEX IF NOT EXISTS idx_student_docs_student ON student_documents(student_id);
CREATE INDEX IF NOT EXISTS idx_student_docs_app ON student_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_classes_program ON classes(program_id);
CREATE INDEX IF NOT EXISTS idx_classes_status ON classes(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON class_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class ON class_enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_schedules_class ON schedules(class_id);
CREATE INDEX IF NOT EXISTS idx_schedules_dates ON schedules(start_at, end_at);
CREATE INDEX IF NOT EXISTS idx_attendance_schedule ON attendance(schedule_id);
CREATE INDEX IF NOT EXISTS idx_attendance_enrollment ON attendance(class_enrollment_id);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public profiles are viewable by authenticated users" ON profiles;
CREATE POLICY "Public profiles are viewable by authenticated users" ON profiles FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Roles viewable by authenticated" ON roles;
CREATE POLICY "Roles viewable by authenticated" ON roles FOR SELECT TO authenticated USING (true);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own roles" ON user_roles;
CREATE POLICY "Users can view their own roles" ON user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permissions viewable by authenticated" ON permissions;
CREATE POLICY "Permissions viewable by authenticated" ON permissions FOR SELECT TO authenticated USING (true);

ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Role permissions viewable by authenticated" ON role_permissions;
CREATE POLICY "Role permissions viewable by authenticated" ON role_permissions FOR SELECT TO authenticated USING (true);

ALTER TABLE program_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active program categories" ON program_categories;
CREATE POLICY "Public can view active program categories" ON program_categories FOR SELECT TO anon, authenticated USING (is_active = true);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published programs" ON programs;
CREATE POLICY "Public can view published programs" ON programs FOR SELECT TO anon, authenticated USING (status = 'published');

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Students can view their own applications" ON applications;
CREATE POLICY "Students can view their own applications" ON applications FOR SELECT TO authenticated USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Students can create applications for themselves" ON applications;
CREATE POLICY "Students can create applications for themselves" ON applications FOR INSERT TO authenticated WITH CHECK (auth.uid() = student_id);

ALTER TABLE student_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Students can view their own documents" ON student_documents;
CREATE POLICY "Students can view their own documents" ON student_documents FOR SELECT TO authenticated USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Students can upload their own documents" ON student_documents;
CREATE POLICY "Students can upload their own documents" ON student_documents FOR INSERT TO authenticated WITH CHECK (auth.uid() = student_id AND verification_status = 'pending');

ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Active instructors viewable by authenticated" ON instructors;
CREATE POLICY "Active instructors viewable by authenticated" ON instructors FOR SELECT TO authenticated USING (is_active = true);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Classes viewable by authenticated" ON classes;
CREATE POLICY "Classes viewable by authenticated" ON classes FOR SELECT TO authenticated USING (true);

ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Students view their own enrollments" ON class_enrollments;
CREATE POLICY "Students view their own enrollments" ON class_enrollments FOR SELECT TO authenticated USING (auth.uid() = student_id);

ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Schedules viewable by authenticated" ON schedules;
CREATE POLICY "Schedules viewable by authenticated" ON schedules FOR SELECT TO authenticated USING (true);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Students view their own attendance" ON attendance;
CREATE POLICY "Students view their own attendance" ON attendance FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM class_enrollments ce WHERE ce.id = attendance.class_enrollment_id AND ce.student_id = auth.uid())
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published announcements" ON announcements;
CREATE POLICY "Public can view published announcements" ON announcements FOR SELECT TO anon, authenticated USING (status = 'published');

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Students can view their own certificates" ON certificates;
CREATE POLICY "Students can view their own certificates" ON certificates FOR SELECT TO authenticated USING (auth.uid() = student_id);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No direct client access to audit logs" ON audit_logs;
CREATE POLICY "No direct client access to audit logs" ON audit_logs FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = auth.uid() AND ur.role_id IN ('super_admin', 'admin'))
);

-- 5. INITIAL SEED DATA
INSERT INTO roles (id, name, description) VALUES
('super_admin', 'Super Administrator', 'Akses penuh ke seluruh konfigurasi, user, dan audit log'),
('admin', 'Administrator Operasional', 'Mengelola program, kelas, instruktur, dan pendaftaran'),
('staff', 'Staf Administrasi', 'Verifikasi dokumen dan operasional harian'),
('student', 'Peserta Pelatihan', 'Peserta pelatihan LPK')
ON CONFLICT (id) DO NOTHING;

INSERT INTO permissions (id, name, description) VALUES
('programs:read', 'Lihat Program', 'Melihat daftar dan detail program'),
('programs:write', 'Kelola Program', 'Membuat, mengubah, menghapus program'),
('applications:read', 'Lihat Pendaftaran', 'Melihat berkas pendaftaran'),
('applications:review', 'Review Pendaftaran', 'Memverifikasi dan menyetujui pendaftaran'),
('documents:verify', 'Verifikasi Dokumen', 'Menilai keabsahan dokumen kependudukan peserta'),
('classes:manage', 'Kelola Kelas', 'Mengatur kelas, jadwal, dan instruktur'),
('certificates:issue', 'Terbitkan Sertifikat', 'Menerbitkan sertifikat digital kelulusan'),
('users:manage', 'Kelola Pengguna', 'Mengatur role dan permission pengguna'),
('audit:read', 'Lihat Audit Log', 'Melihat jejak aktivitas keamanan sistem')
ON CONFLICT (id) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id) VALUES
('super_admin', 'programs:read'), ('super_admin', 'programs:write'), ('super_admin', 'applications:read'),
('super_admin', 'applications:review'), ('super_admin', 'documents:verify'), ('super_admin', 'classes:manage'),
('super_admin', 'certificates:issue'), ('super_admin', 'users:manage'), ('super_admin', 'audit:read'),
('admin', 'programs:read'), ('admin', 'programs:write'), ('admin', 'applications:read'),
('admin', 'applications:review'), ('admin', 'documents:verify'), ('admin', 'classes:manage'),
('admin', 'certificates:issue'),
('staff', 'programs:read'), ('staff', 'applications:read'), ('staff', 'documents:verify'),
('staff', 'classes:manage'),
('student', 'programs:read')
ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO program_categories (id, name, slug, description, is_active) VALUES
('a0000000-0000-0000-0000-000000000001', 'Pelatihan Bahasa Jepang & Magang', 'bahasa-jepang-magang', 'Program persiapan bahasa Jepang JLPT/JFT dan keterampilan kerja untuk program Tokutei Ginou dan Magang Jepang.', true),
('a0000000-0000-0000-0000-000000000002', 'Pelatihan Bahasa Korea & EPS-TOPIK', 'bahasa-korea-eps-topik', 'Program intensif penguasaan Hangul dan persiapan ujian EPS-TOPIK untuk penempatan manufaktur dan perikanan Korea Selatan.', true),
('a0000000-0000-0000-0000-000000000003', 'Teknik Manufaktur & Pengelasan', 'teknik-manufaktur-pengelasan', 'Pelatihan vokasi pengelasan standar industri (SMAW, GMAW, GTAW) dan perakitan mekanikal bersertifikasi kompetensi.', true),
('a0000000-0000-0000-0000-000000000004', 'Caregiver & Hospitality Internasional', 'caregiver-hospitality', 'Pelatihan perawat lansia profesional (Kaigo) dan layanan perhotelan berstandar keselamatan global.', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO programs (id, category_id, title, slug, description, curriculum, duration, price, requirements, quota, status) VALUES
(
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Program Persiapan Bahasa & Keterampilan Kerja Jepang (Tokutei Ginou)',
    'persiapan-bahasa-kerja-jepang-tokutei-ginou',
    'Program pelatihan terpadu meliputi penguasaan bahasa Jepang setara N4/JFT-Basic A2, pemahaman budaya kerja Jepang (Hourensou), serta sertifikasi keahlian bidang pengolahan makanan atau manufaktur.',
    '["Tata Bahasa Minna no Nihongo I & II", "Percakapan Praktis di Tempat Kerja (Kaiwa)", "Karakter Kanji & Kosakata Industri", "Budaya Kerja & Disiplin Hou-Ren-Sou", "Simulasi Ujian JFT-Basic A2"]'::jsonb,
    '4 Bulan (480 Jam Pelatihan)',
    5500000.00,
    '["Usia minimal 18 tahun dan maksimal 30 tahun", "Pendidikan minimal SMA/SMK sederajat", "Sehat jasmani dan rohani (bebas narkoba & hepatitis)", "Tidak bertato dan tidak bertindik bagi pria"]'::jsonb,
    30,
    'published'
),
(
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000002',
    'Kelas Intensif Bahasa Korea EPS-TOPIK',
    'kelas-intensif-bahasa-korea-eps-topik',
    'Pelatihan intensif 3 bulan persiapan ujian EPS-TOPIK Government to Government (G to G) Korea Selatan, mencakup latihan soal mendengar, membaca, dan tes keterampilan (skill test).',
    '["Struktur Huruf Hangul & Pengucapan", "Kosakata Kehidupan & Industri Manufaktur", "Tata Bahasa Standar EPS-TOPIK", "Drilling Soal Ujian Komputer (UBT)", "Persiapan Wawancara & Tes Keterampilan Fisik"]'::jsonb,
    '3 Bulan (360 Jam Pelatihan)',
    4200000.00,
    '["Usia 18 - 39 tahun", "Pendidikan minimal SMP/SMA sederajat", "Tidak buta warna total/parsial", "Tidak memiliki catatan kriminalitas"]'::jsonb,
    25,
    'published'
),
(
    'b0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000003',
    'Pelatihan Vokasi Pengelasan 3G/4G SMAW & GMAW',
    'pelatihan-vokasi-pengelasan-smaw-gmaw',
    'Kombinasi teori metalurgi dan 80% praktik pengelasan posisi 1G hingga 4G plat dan pipa, ditujukan untuk mempersiapkan juru las profesional bersertifikat.',
    '["Keselamatan & Kesehatan Kerja (K3) Bengkel Las", "Membaca Gambar Teknik & Simbol Las", "Teknik Pengelasan Busur Listrik Manual (SMAW)", "Teknik Pengelasan Gas Metal (GMAW/MIG)", "Pengujian Hasil Las (Visual & Bending Test)"]'::jsonb,
    '2 Bulan (240 Jam Pelatihan)',
    4800000.00,
    '["Pria/Wanita minimal usia 18 tahun", "Pendidikan minimal SMA/SMK (diutamakan jurusan teknik)", "Tidak memiliki gangguan penglihatan berat"]'::jsonb,
    20,
    'published'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
('company_info', '{
    "name": "PT. Sejahtera Abadi Bersama",
    "short_name": "LPK Sejahtera Abadi",
    "business_type": "Lembaga Pelatihan Kerja (LPK)",
    "email": "kontak@ratechs.id",
    "website": "ratechs.id",
    "address": "Jl. Kesejahteraan Raya No. 88, Pusat Pelatihan Kerja, Indonesia",
    "working_hours": "Senin - Jumat: 08.00 - 17.00 WIB | Sabtu: 08.00 - 13.00 WIB",
    "headline": "Mempersiapkan Masa Depan, Membuka Peluang Dunia.",
    "subheadline": "Lembaga Pelatihan Kerja profesional yang membekali calon tenaga kerja dengan kompetensi vokasi terstandarisasi dan penguasaan bahasa asing untuk siap bersaing di pasar kerja domestik maupun global."
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

INSERT INTO announcements (id, title, slug, content, published_at, status) VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    'Pembukaan Pendaftaran Gelombang I Pelatihan Vokasi dan Bahasa Asing',
    'pembukaan-pendaftaran-gelombang-1-lpk-sejahtera',
    'PT. Sejahtera Abadi Bersama secara resmi membuka pendaftaran peserta pelatihan baru untuk Program Bahasa Jepang (Tokutei Ginou), Bahasa Korea (EPS-TOPIK), dan Teknik Pengelasan.',
    NOW(),
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- 6. BOOTSTRAP SUPER ADMIN STORED PROCEDURE
CREATE OR REPLACE FUNCTION bootstrap_super_admin(target_email TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    target_user_id UUID;
    result JSONB;
BEGIN
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = target_email;

    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User dengan email % tidak ditemukan di auth.users. Daftarkan akun terlebih dahulu.', target_email;
    END IF;

    INSERT INTO profiles (id, full_name, phone, created_at, updated_at)
    VALUES (target_user_id, 'Super Administrator LPK', NULL, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO user_roles (user_id, role_id, assigned_by, created_at)
    VALUES (target_user_id, 'super_admin', target_user_id, NOW())
    ON CONFLICT (user_id, role_id) DO NOTHING;

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

REVOKE ALL ON FUNCTION bootstrap_super_admin(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION bootstrap_super_admin(TEXT) FROM anon;
REVOKE ALL ON FUNCTION bootstrap_super_admin(TEXT) FROM authenticated;
GRANT EXECUTE ON FUNCTION bootstrap_super_admin(TEXT) TO service_role;
