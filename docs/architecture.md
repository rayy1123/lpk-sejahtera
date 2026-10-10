# Dokumen Arsitektur Sistem — PT. Sejahtera Abadi Bersama

## 1. Ringkasan Eksekutif & Karakteristik Bisnis
**PT. Sejahtera Abadi Bersama** adalah Lembaga Pelatihan Kerja (LPK) yang berfokus pada pelatihan vokasi, sertifikasi kompetensi, dan pelatihan bahasa untuk calon tenaga kerja terampil serta calon pekerja migran.

Kebutuhan utama sistem mencakup:
1. **Kepercayaan & Kredibilitas:** Tampilan profesional, legalitas yang dapat diverifikasi, informasi program transparan, dan tidak ada klaim palsu.
2. **Kemudahan Pendaftaran:** Alur pendaftaran multi-step dengan upload berkas terenkripsi.
3. **Privasi & Keamanan:** Dokumen kependudukan (KTP, Paspor, Ijazah) harus terproteksi ketat di bucket privat dan hanya dapat diakses pemilik dan staf berwenang melalui signed URL.
4. **Operasional LPK:** Manajemen kelas, instruktur, jadwal pelatihan, pencatatan kehadiran, progres belajar, serta penerbitan sertifikat digital.
5. **Skalabilitas & Keandalan:** Pemisahan frontend Next.js di Vercel dan backend Go di container service dengan Supabase PostgreSQL terkelola.

---

## 2. Pilihan Teknologi & Rationale

| Layer | Teknologi | Rationale Pemilihan |
|---|---|---|
| **Frontend** | **Next.js 14+ (App Router, TS)** | Server-side rendering (SSR) untuk SEO halaman publik, Static Site Generation (SSG) untuk katalog program, dan Client Components untuk interaktivitas dashboard. Strict mode menjamin keandalan tipe. |
| **Styling** | **Tailwind CSS** | Styling terstandarisasi, kontrol token warna (`#163A5F`, `#16A6A1`), performa tinggi tanpa runtime overhead CSS-in-JS, dan responsivitas mobile-first. |
| **Backend API** | **Go 1.22+ (Chi Router)** | Efisiensi memori tinggi, eksekusi konkuren ringan via goroutines, type-safe, binary tunggal mudah dideploy ke container kecil, dan latensi sub-millisecond. |
| **Database** | **Supabase PostgreSQL** | Relational integrity (ACID), dukungan native UUID, JSONB untuk audit log metadata, dan Row Level Security (RLS) di level engine. |
| **Autentikasi** | **Supabase Auth (GoTrue)** | Autentikasi berbasis standar OAuth2/OIDC, hashing bcrypt/argon2 yang aman, session refresh, dan token JWT terverifikasi. |
| **Storage** | **Supabase Storage (S3-compatible)** | Pengelolaan bucket privat untuk dokumen sensitif siswa menggunakan presigned URL berbatas waktu (maks 15 menit). |

---

## 3. Diagram Alur & Interaksi Komponen

```
+-----------------------------------------------------------------------------------------+
|                                    CLIENT BROWSER                                       |
|  - Halaman Publik (SEO, Katalog)  - Formulir Pendaftaran  - Dashboard Siswa & Admin    |
+------------------------------+------------------------------------+---------------------+
                               |                                    |
          1. Navigasi & SSR    |                                    | 2. Direct Auth Token
          (Next.js App Router) |                                    |    (Supabase Client)
                               v                                    v
                 +---------------------------+       +-----------------------------+
                 |       Vercel Edge         |       |        Supabase Auth        |
                 |     (Next.js Host)        |       |    (Login/Register/JWT)     |
                 +-------------+-------------+       +--------------+--------------+
                               |                                    |
                               | 3. REST API Requests               | Token Bearer JWT
                               |    (/api/v1/*)                     |
                               v                                    v
                 +-----------------------------------------------------------------+
                 |                        Go REST API Server                       |
                 |  - Router (Chi)                                                 |
                 |  - Middleware: CORS, Structured Logging, Rate Limiter           |
                 |  - Middleware: Supabase JWT Verifier (Signature, Issuer, Exp)   |
                 |  - Middleware: RBAC Engine (super_admin, admin, staff, student) |
                 |  - Clean Architecture: Handler -> Service -> Repository        |
                 +--------------------------------+--------------------------------+
                                                  |
                                                  | 4. Database Queries (pgx)
                                                  |    & Private Storage Admin
                                                  v
                 +-----------------------------------------------------------------+
                 |                       Supabase PostgreSQL                       |
                 |  - 18 Tabel Terstruktur (UUID PK, FK, Constraints, Indexes)     |
                 |  - Row Level Security (RLS) Policies                            |
                 |  - Private S3 Bucket: student-documents                         |
                 |  - Public S3 Bucket: public-assets                              |
                 +-----------------------------------------------------------------+
```

---

## 4. Keamanan & RBAC (Defense in Depth)

Sistem menerapkan **3 lapis pertahanan**:

### Lapis 1: Frontend Routing & Context Guard
- Client routes `/admin/*` hanya dapat dibuka jika user memiliki role `super_admin`, `admin`, atau `staff`.
- Client route `/student/*` hanya dapat dibuka jika user memiliki role `student`.
- Bila belum login, redirect ke `/login`. Bila role tidak cocok, redirect ke `/403`.

### Lapis 2: Backend API Authorization Middleware
- Seluruh endpoint privat `/api/v1/student/*` dan `/api/v1/admin/*` wajib melewati `AuthMiddleware`.
- `AuthMiddleware` mengekstrak JWT Bearer, memvalidasi tanda tangan kriptografis dengan secret Supabase, memeriksa expiry time (`exp`), dan issuer (`iss`).
- `RBACMiddleware` membaca permission pengguna dari database dan mencocokkan dengan aksi endpoint yang diminta.
- Prinsip *Deny-by-Default* dan *Least Privilege*.

### Lapis 3: Database Row Level Security (RLS)
- Seluruh tabel publik memiliki policy RLS aktif.
- Akses langsung via Supabase client dibatasi hanya untuk baris data milik pengguna (`auth.uid() = student_id`).
- Audit log tidak dapat diubah (immutable).

---

## 5. Alur Data Pendaftaran (User Journey)

1. Calon peserta membuka Homepage -> melihat Katalog Program -> memilih Program Detail.
2. Calon peserta mengisi formulir pendaftaran bertahap (Identitas -> Kontak -> Pilihan Program -> Upload Berkas -> Review).
3. Calon peserta melakukan Submit -> Akun dibuat via Supabase Auth jika belum memiliki akun -> Data pendaftaran disimpan ke tabel `applications` dengan status `pending`.
4. Berkas identitas diupload ke bucket privat `student-documents/{student_id}/{application_id}/...`.
5. Staff LPK membuka Dashboard Admin -> Meninjau berkas pendaftaran -> Menyetujui/Menolak pendaftaran.
6. Saat disetujui, peserta dialokasikan ke kelas pelatihan aktif dan notifikasi dikirimkan ke Dashboard Peserta.
