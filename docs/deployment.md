# Panduan Deployment Staging & Production — PT. Sejahtera Abadi Bersama

Panduan resmi deployment sistem LPK PT. Sejahtera Abadi Bersama pada tiga platform utama:
1. **Frontend:** Vercel (Next.js)
2. **Backend API:** Container Service (Railway / Render / Fly.io / GCP Cloud Run)
3. **Database & Auth:** Supabase Cloud

---

## 1. Konfigurasi Supabase Cloud

### Langkah 1: Buat Project Baru
1. Buka [Supabase Dashboard](https://supabase.com).
2. Buat project baru bernama `lpk-sejahtera-abadi`.
3. Pilih Region terdekat (`Singapore / ap-southeast-1`) untuk latensi terendah dari Indonesia.

### Langkah 2: Jalankan Migrasi Database
Buka tab **SQL Editor** pada Supabase Dashboard, jalankan file SQL berurutan:
1. `services/api/migrations/000001_init_schema.up.sql` (Tabel & Relasi)
2. `services/api/migrations/000002_rls_policies.up.sql` (Row Level Security)
3. `services/api/migrations/000003_seed_data.up.sql` (Seed Data)
4. `services/api/migrations/000004_bootstrap_admin.up.sql` (Fungsi Bootstrap Super Admin)

### Prosedur Rollback Migration (Jika Diperlukan):
Jalankan file `.down.sql` dalam urutan terbalik:
1. `000004_bootstrap_admin.down.sql`
2. `000002_rls_policies.down.sql`
3. `000001_init_schema.down.sql`

### Langkah 3: Konfigurasi Storage Bucket
Buka tab **Storage** di Supabase:
1. Buat bucket baru bernama `student-documents`:
   - Set **Public Bucket: OFF** (Wajib Privat).
   - Maksimum ukuran file: 5 MB.
   - Allowed MIME types: `image/jpeg, image/png, application/pdf`.
2. Buat bucket baru bernama `public-assets`:
   - Set **Public Bucket: ON**.

### Langkah 4: Simpan Kredensial
Salin dari menu **Project Settings -> API**:
- Project URL (`https://xyz.supabase.co`)
- Project API Keys: `anon public` dan `service_role secret`
- JWT Secret (dari menu **API -> JWT Settings**)

---

## 2. Bootstrap Akun Super Admin Pertama Secara Aman

Mekanisme bootstrap dibuat secara terkontrol tanpa membuka endpoint publik yang rentan:

### Prosedur:
1. Daftarkan akun baru di web LPK (`/register`) menggunakan email khusus admin lembaga (misal: `direktur@lpksejahtera.com`).
2. Buka tab **SQL Editor** di Supabase Console, jalankan query berikut:
```sql
SELECT bootstrap_super_admin('direktur@lpksejahtera.com');
```
3. Prosedur ini akan:
   - Memvalidasi keberadaan akun di `auth.users`.
   - Mengisi profil di tabel `profiles`.
   - Memberikan role `super_admin` di tabel `user_roles`.
   - Mencatat tindakan ke tabel `audit_logs`.
4. Setelah super admin pertama aktif, nonaktifkan atau hapus prosedur ini jika diinginkan:
```sql
DROP FUNCTION IF EXISTS bootstrap_super_admin(TEXT);
```

---

## 3. Deployment Backend Go API (Docker / Cloud Run / Railway)

### Environment Variables Wajib:
```env
PORT=8080
ENV=production
ALLOWED_ORIGINS=https://lpksejahtera.com,https://lpk-sejahtera.vercel.app
DATABASE_URL=postgres://postgres.xyz:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_JWT_SECRET=your-jwt-secret-from-supabase
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Langkah Deployment dengan Docker:
1. File `services/api/Dockerfile` siap di-build dengan multi-stage build berukuran ringan (< 25MB).
2. Command build & run:
```bash
docker build -t lpk-api services/api/
docker run -p 8080:8080 --env-file .env lpk-api
```
3. Pastikan endpoint healthcheck `GET /healthz` mengembalikan HTTP 200 OK.

---

## 4. Deployment Frontend Next.js di Vercel

### Langkah 1: Import Repository
1. Login ke [Vercel](https://vercel.com).
2. Import repository GitHub `lpk-sejahtera`.
3. Set **Root Directory** ke: `apps/web`.

### Langkah 2: Konfigurasi Environment Variables di Vercel:
```env
NEXT_PUBLIC_APP_URL=https://lpksejahtera.com
NEXT_PUBLIC_API_URL=https://api.lpksejahtera.com/api/v1
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
```

### Langkah 3: Deploy & Domain
1. Klik **Deploy**.
2. Hubungkan domain resmi lembaga (misalnya `lpksejahtera.com` dan `api.lpksejahtera.com`).
3. Vercel akan otomatis mengaktifkan sertifikat SSL/HTTPS Let's Encrypt.

---

## 5. Checklist Verifikasi End-to-End (E2E) Staging

- [x] Homepage & Katalog Program terbuka cepat dan responsif.
- [x] Logo resmi `logo.jpeg` tampil di Navbar, Hero, Profil, dan Footer.
- [x] Registrasi akun peserta baru berhasil.
- [x] Form pendaftaran 5 langkah berhasil submit.
- [x] Dashboard siswa menampilkan status pendaftaran secara real-time.
- [x] Dashboard admin menampilkan statistik pendaftaran.
- [x] Admin dapat meninjau berkas dan mengubah status pendaftaran (Approve/Reject).
- [x] Siswa tidak dapat mengakses dashboard admin (`/admin` dicegah oleh RBAC).
- [x] Alokasi kuota aman dari race condition menggunakan row locking `FOR UPDATE`.
- [x] Dokumen privat terlindungi di bucket `student-documents`.
