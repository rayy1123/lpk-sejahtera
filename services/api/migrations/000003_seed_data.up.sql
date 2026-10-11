-- ==============================================================================
-- 000003_seed_data.up.sql
-- PT. Sejahtera Abadi Bersama — Initial Seed Data
-- ==============================================================================

-- 1. ROLES
INSERT INTO roles (id, name, description) VALUES
('super_admin', 'Super Administrator', 'Akses penuh ke seluruh konfigurasi, user, dan audit log'),
('admin', 'Administrator Operasional', 'Mengelola program, kelas, instruktur, dan pendaftaran'),
('staff', 'Staf Administrasi', 'Verifikasi dokumen dan operasional harian'),
('student', 'Peserta Pelatihan', 'Peserta pelatihan LPK')
ON CONFLICT (id) DO NOTHING;

-- 2. PERMISSIONS
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

-- 3. ROLE_PERMISSIONS
INSERT INTO role_permissions (role_id, permission_id) VALUES
-- Super Admin: Semua permission
('super_admin', 'programs:read'),
('super_admin', 'programs:write'),
('super_admin', 'applications:read'),
('super_admin', 'applications:review'),
('super_admin', 'documents:verify'),
('super_admin', 'classes:manage'),
('super_admin', 'certificates:issue'),
('super_admin', 'users:manage'),
('super_admin', 'audit:read'),
-- Admin
('admin', 'programs:read'),
('admin', 'programs:write'),
('admin', 'applications:read'),
('admin', 'applications:review'),
('admin', 'documents:verify'),
('admin', 'classes:manage'),
('admin', 'certificates:issue'),
-- Staff
('staff', 'programs:read'),
('staff', 'applications:read'),
('staff', 'documents:verify'),
('staff', 'classes:manage'),
-- Student
('student', 'programs:read')
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- 4. PROGRAM CATEGORIES
INSERT INTO program_categories (id, name, slug, description, is_active) VALUES
('a0000000-0000-0000-0000-000000000001', 'Pelatihan Bahasa Jepang & Magang', 'bahasa-jepang-magang', 'Program persiapan bahasa Jepang JLPT/JFT dan keterampilan kerja untuk program Tokutei Ginou dan Magang Jepang.', true),
('a0000000-0000-0000-0000-000000000002', 'Pelatihan Bahasa Korea & EPS-TOPIK', 'bahasa-korea-eps-topik', 'Program intensif penguasaan Hangul dan persiapan ujian EPS-TOPIK untuk penempatan manufaktur dan perikanan Korea Selatan.', true),
('a0000000-0000-0000-0000-000000000003', 'Teknik Manufaktur & Pengelasan', 'teknik-manufaktur-pengelasan', 'Pelatihan vokasi pengelasan standar industri (SMAW, GMAW, GTAW) dan perakitan mekanikal bersertifikasi kompetensi.', true),
('a0000000-0000-0000-0000-000000000004', 'Caregiver & Hospitality Internasional', 'caregiver-hospitality', 'Pelatihan perawat lansia profesional (Kaigo) dan layanan perhotelan berstandar keselamatan global.', true)
ON CONFLICT (slug) DO NOTHING;

-- 5. PROGRAMS (Data Awal Unggulan)
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
),
(
    'b0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000004',
    'Pelatihan Caregiver Lansia (Kaigo) Standar Internasional',
    'pelatihan-caregiver-lansia-kaigo-internasional',
    'Program sertifikasi keperawatan lansia berstandar Jepang, meliputi etika perawatan, teknik mobilisasi fisik lansia, pendampingan demensia, dan bahasa Jepang medis dasar.',
    '["Etika Profesi & Standar Pelayanan Kaigo", "Teknik Pemindahan & Mobilisasi Pasien (Body Mechanics)", "Nutrisi & Kebersihan Lansia", "Penanganan Kondisi Darurat & Pertolongan Pertama (P3K)", "Komunikasi Empatik dalam Bahasa Jepang Medis"]'::jsonb,
    '3 Bulan (360 Jam Pelatihan)',
    5000000.00,
    '["Pendidikan minimal SMK Kesehatan / D3 Keperawatan / Kebidanan / Umum", "Memiliki kepedulian tinggi terhadap lansia", "Tinggi badan proporsional dan sehat medis"]'::jsonb,
    25,
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- 6. SITE SETTINGS
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
}'::jsonb),
('registration_flow', '{
    "steps": [
        {"step": 1, "name": "Pengisian Data Diri & Akun"},
        {"step": 2, "name": "Pemilihan Program & Dokumen"},
        {"step": 3, "name": "Verifikasi Berkas oleh Tim Administrasi"},
        {"step": 4, "name": "Tes Penempatan & Wawancara"},
        {"step": 5, "name": "Mulai Pelatihan di Kelas"}
    ]
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 7. ANNOUNCEMENTS
INSERT INTO announcements (id, title, slug, content, published_at, status) VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    'Pembukaan Pendaftaran Gelombang I Pelatihan Vokasi dan Bahasa Asing',
    'pembukaan-pendaftaran-gelombang-1-lpk-sejahtera',
    'PT. Sejahtera Abadi Bersama secara resmi membuka pendaftaran peserta pelatihan baru untuk Program Bahasa Jepang (Tokutei Ginou), Bahasa Korea (EPS-TOPIK), dan Teknik Pengelasan. Pendaftaran dapat dilakukan langsung melalui portal online resmi ini.',
    NOW(),
    'published'
),
(
    'c0000000-0000-0000-0000-000000000002',
    'Sosialisasi Standar Kualifikasi dan Alur Penempatan Tenaga Kerja',
    'sosialisasi-standar-kualifikasi-dan-alur-penempatan',
    'LPK Sejahtera Abadi mengundang seluruh calon peserta dan orang tua untuk menghadiri sesi konsultasi terbuka mengenai tahapan pelatihan, persyaratan dokumen resmi, dan pengenalan kurikulum kerja.',
    NOW(),
    'published'
)
ON CONFLICT (slug) DO NOTHING;
