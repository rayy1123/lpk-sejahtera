# Skema Database & ERD — PT. Sejahtera Abadi Bersama

Database menggunakan **PostgreSQL** pada infrastruktur Supabase dengan ekstensi `uuid-ossp` atau `pgcrypto` untuk primary key UUID v4, constraint relasional yang ketat, index performa, dan Row Level Security (RLS).

---

## 1. Diagram Relasi Entitas (ERD Tekstual)

```
[auth.users] (Supabase Auth)
     │ 1:1
     ▼
[profiles] ──── 1:N ──── [user_roles] ──── N:1 ──── [roles] ──── 1:N ──── [role_permissions] ──── N:1 ──── [permissions]
     │                       │
     │ 1:1                   │
     ├────────► [instructors]
     │               │
     │               │ 1:N
     │               ▼
     │          [classes] ◄──── N:1 ──── [programs] ◄──── N:1 ──── [program_categories]
     │               │                      │
     │               │ 1:N                  │ 1:N
     │               ▼                      ▼
     │          [schedules]            [applications] ──── 1:N ──── [student_documents]
     │               │                      ▲
     │               │ 1:N                  │ 1:1
     │               ▼                      │
     │          [attendance] ◄─── N:1 ─── [class_enrollments] ──── 1:N ──── [certificates]
     │
     └────────► [audit_logs]
```

---

## 2. Definisi Rinci Tabel (18 Tabel)

### A. Entitas Pengguna & Otorisasi
1. **`profiles`**
   - `id`: UUID (PK, references `auth.users.id` ON DELETE CASCADE)
   - `full_name`: VARCHAR(255) NOT NULL
   - `phone`: VARCHAR(30)
   - `avatar_url`: TEXT
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()
   - `updated_at`: TIMESTAMPTZ DEFAULT NOW()

2. **`roles`**
   - `id`: VARCHAR(50) PRIMARY KEY (`super_admin`, `admin`, `staff`, `student`)
   - `name`: VARCHAR(100) NOT NULL
   - `description`: TEXT

3. **`user_roles`**
   - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - `user_id`: UUID NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
   - `role_id`: VARCHAR(50) NOT NULL REFERENCES `roles(id)` ON DELETE CASCADE
   - `assigned_by`: UUID REFERENCES `profiles(id)`
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()
   - *Constraint:* UNIQUE(`user_id`, `role_id`)

4. **`permissions`**
   - `id`: VARCHAR(100) PRIMARY KEY (e.g. `programs:create`, `applications:review`)
   - `name`: VARCHAR(150) NOT NULL
   - `description`: TEXT

5. **`role_permissions`**
   - `role_id`: VARCHAR(50) NOT NULL REFERENCES `roles(id)` ON DELETE CASCADE
   - `permission_id`: VARCHAR(100) NOT NULL REFERENCES `permissions(id)` ON DELETE CASCADE
   - *PK:* (`role_id`, `permission_id`)

---

### B. Entitas Program Pelatihan
6. **`program_categories`**
   - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - `name`: VARCHAR(150) NOT NULL
   - `slug`: VARCHAR(150) UNIQUE NOT NULL
   - `description`: TEXT
   - `is_active`: BOOLEAN DEFAULT TRUE
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()

7. **`programs`**
   - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - `category_id`: UUID NOT NULL REFERENCES `program_categories(id)` ON DELETE RESTRICT
   - `title`: VARCHAR(255) NOT NULL
   - `slug`: VARCHAR(255) UNIQUE NOT NULL
   - `description`: TEXT NOT NULL
   - `curriculum`: JSONB DEFAULT '[]'::jsonb
   - `duration`: VARCHAR(100) NOT NULL (e.g. "3 Bulan / 360 Jam")
   - `price`: NUMERIC(12,2) DEFAULT 0.00
   - `requirements`: JSONB DEFAULT '[]'::jsonb
   - `quota`: INT DEFAULT 30
   - `thumbnail_path`: TEXT
   - `status`: VARCHAR(30) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived'))
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()
   - `updated_at`: TIMESTAMPTZ DEFAULT NOW()

---

### C. Entitas Pendaftaran & Dokumen Peserta
8. **`applications`**
   - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - `student_id`: UUID NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
   - `program_id`: UUID NOT NULL REFERENCES `programs(id)` ON DELETE RESTRICT
   - `application_number`: VARCHAR(50) UNIQUE NOT NULL
   - `status`: VARCHAR(30) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'verified', 'approved', 'rejected'))
   - `submitted_at`: TIMESTAMPTZ DEFAULT NOW()
   - `reviewed_by`: UUID REFERENCES `profiles(id)`
   - `reviewed_at`: TIMESTAMPTZ
   - `admin_notes`: TEXT
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()
   - `updated_at`: TIMESTAMPTZ DEFAULT NOW()

9. **`student_documents`**
   - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - `student_id`: UUID NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
   - `application_id`: UUID REFERENCES `applications(id)` ON DELETE CASCADE
   - `document_type`: VARCHAR(50) NOT NULL CHECK (document_type IN ('ktp', 'kk', 'ijazah', 'paspor', 'foto', 'skck', 'medis'))
   - `storage_path`: TEXT NOT NULL
   - `verification_status`: VARCHAR(30) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'valid', 'invalid'))
   - `verified_by`: UUID REFERENCES `profiles(id)`
   - `verified_at`: TIMESTAMPTZ
   - `notes`: TEXT
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()

---

### D. Entitas Akademik (Instruktur, Kelas, Jadwal, Presensi)
10. **`instructors`**
    - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `profile_id`: UUID UNIQUE NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
    - `bio`: TEXT
    - `specialization`: VARCHAR(200) NOT NULL
    - `is_active`: BOOLEAN DEFAULT TRUE
    - `created_at`: TIMESTAMPTZ DEFAULT NOW()

11. **`classes`**
    - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `program_id`: UUID NOT NULL REFERENCES `programs(id)` ON DELETE RESTRICT
    - `instructor_id`: UUID REFERENCES `instructors(id)` ON DELETE SET NULL
    - `name`: VARCHAR(200) NOT NULL
    - `start_date`: DATE NOT NULL
    - `end_date`: DATE NOT NULL
    - `capacity`: INT NOT NULL DEFAULT 25
    - `status`: VARCHAR(30) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled'))
    - `created_at`: TIMESTAMPTZ DEFAULT NOW()

12. **`class_enrollments`**
    - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `class_id`: UUID NOT NULL REFERENCES `classes(id)` ON DELETE CASCADE
    - `student_id`: UUID NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
    - `application_id`: UUID REFERENCES `applications(id)` ON DELETE SET NULL
    - `status`: VARCHAR(30) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'active', 'passed', 'failed', 'dropped'))
    - `created_at`: TIMESTAMPTZ DEFAULT NOW()
    - *Constraint:* UNIQUE(`class_id`, `student_id`)

13. **`schedules`**
    - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `class_id`: UUID NOT NULL REFERENCES `classes(id)` ON DELETE CASCADE
    - `title`: VARCHAR(200) NOT NULL
    - `start_at`: TIMESTAMPTZ NOT NULL
    - `end_at`: TIMESTAMPTZ NOT NULL
    - `location`: VARCHAR(255) DEFAULT 'Ruang Teori 1 - Kampus LPK'
    - `notes`: TEXT
    - `created_at`: TIMESTAMPTZ DEFAULT NOW()

14. **`attendance`**
    - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `class_enrollment_id`: UUID NOT NULL REFERENCES `class_enrollments(id)` ON DELETE CASCADE
    - `schedule_id`: UUID NOT NULL REFERENCES `schedules(id)` ON DELETE CASCADE
    - `attendance_status`: VARCHAR(30) NOT NULL CHECK (attendance_status IN ('present', 'late', 'excused', 'absent'))
    - `recorded_by`: UUID REFERENCES `profiles(id)`
    - `recorded_at`: TIMESTAMPTZ DEFAULT NOW()
    - *Constraint:* UNIQUE(`class_enrollment_id`, `schedule_id`)

---

### E. Sertifikasi, Konten & Pengaturan Sistem
15. **`announcements`**
    - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `title`: VARCHAR(255) NOT NULL
    - `slug`: VARCHAR(255) UNIQUE NOT NULL
    - `content`: TEXT NOT NULL
    - `published_at`: TIMESTAMPTZ DEFAULT NOW()
    - `status`: VARCHAR(30) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived'))
    - `created_by`: UUID REFERENCES `profiles(id)`

16. **`certificates`**
    - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `student_id`: UUID NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
    - `program_id`: UUID NOT NULL REFERENCES `programs(id)` ON DELETE RESTRICT
    - `class_enrollment_id`: UUID REFERENCES `class_enrollments(id)` ON DELETE SET NULL
    - `certificate_number`: VARCHAR(100) UNIQUE NOT NULL
    - `issued_at`: TIMESTAMPTZ DEFAULT NOW()
    - `storage_path`: TEXT NOT NULL
    - `issued_by`: UUID REFERENCES `profiles(id)`
    - `created_at`: TIMESTAMPTZ DEFAULT NOW()

17. **`site_settings`**
    - `key`: VARCHAR(100) PRIMARY KEY
    - `value`: JSONB NOT NULL
    - `updated_by`: UUID REFERENCES `profiles(id)`
    - `updated_at`: TIMESTAMPTZ DEFAULT NOW()

18. **`audit_logs`**
    - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `actor_id`: UUID REFERENCES `profiles(id)`
    - `action`: VARCHAR(100) NOT NULL
    - `entity_type`: VARCHAR(100) NOT NULL
    - `entity_id`: VARCHAR(100) NOT NULL
    - `metadata`: JSONB DEFAULT '{}'::jsonb
    - `created_at`: TIMESTAMPTZ DEFAULT NOW()
