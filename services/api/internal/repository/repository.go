package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"lpk-sejahtera/services/api/internal/domain"
)

type Repository struct {
	pool *pgxpool.Pool
}

func New(pool *pgxpool.Pool) *Repository {
	return &Repository{pool: pool}
}

// 1. ROLES & PERMISSIONS
func (r *Repository) GetUserRoles(ctx context.Context, userID string) ([]domain.Role, error) {
	if r.pool == nil {
		// Mock fallback untuk offline testing
		return []domain.Role{domain.RoleSuperAdmin, domain.RoleAdmin, domain.RoleStudent}, nil
	}

	query := `
		SELECT role_id FROM user_roles
		WHERE user_id = $1
	`
	rows, err := r.pool.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var roles []domain.Role
	for rows.Next() {
		var roleStr string
		if err := rows.Scan(&roleStr); err == nil {
			roles = append(roles, domain.Role(roleStr))
		}
	}

	if len(roles) == 0 {
		roles = append(roles, domain.RoleStudent)
	}

	return roles, nil
}

// 2. PROGRAMS
func (r *Repository) GetPublishedPrograms(ctx context.Context, categorySlug, search string) ([]domain.Program, error) {
	if r.pool == nil {
		// Return standard seed programs
		return getMockPrograms(), nil
	}

	query := `
		SELECT p.id, p.category_id, c.name, p.title, p.slug, p.description, p.duration, p.price, p.quota, p.thumbnail_path, p.status, p.created_at, p.updated_at
		FROM programs p
		JOIN program_categories c ON p.category_id = c.id
		WHERE p.status = 'published'
	`
	args := []interface{}{}
	argIdx := 1

	if categorySlug != "" {
		query += fmt.Sprintf(" AND c.slug = $%d", argIdx)
		args = append(args, categorySlug)
		argIdx++
	}

	if search != "" {
		query += fmt.Sprintf(" AND (p.title ILIKE $%d OR p.description ILIKE $%d)", argIdx, argIdx)
		args = append(args, "%"+search+"%")
		argIdx++
	}

	query += " ORDER BY p.created_at DESC"

	rows, err := r.pool.Query(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var programs []domain.Program
	for rows.Next() {
		var p domain.Program
		err := rows.Scan(
			&p.ID, &p.CategoryID, &p.CategoryName, &p.Title, &p.Slug, &p.Description,
			&p.Duration, &p.Price, &p.Quota, &p.ThumbnailPath, &p.Status, &p.CreatedAt, &p.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		programs = append(programs, p)
	}

	return programs, nil
}

func (r *Repository) GetProgramBySlug(ctx context.Context, slug string) (*domain.Program, error) {
	if r.pool == nil {
		for _, p := range getMockPrograms() {
			if p.Slug == slug {
				return &p, nil
			}
		}
		return nil, domain.ErrNotFound
	}

	query := `
		SELECT p.id, p.category_id, c.name, p.title, p.slug, p.description, p.duration, p.price, p.quota, p.thumbnail_path, p.status, p.created_at, p.updated_at
		FROM programs p
		JOIN program_categories c ON p.category_id = c.id
		WHERE p.slug = $1 AND p.status = 'published'
	`
	var p domain.Program
	err := r.pool.QueryRow(ctx, query, slug).Scan(
		&p.ID, &p.CategoryID, &p.CategoryName, &p.Title, &p.Slug, &p.Description,
		&p.Duration, &p.Price, &p.Quota, &p.ThumbnailPath, &p.Status, &p.CreatedAt, &p.UpdatedAt,
	)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}

	return &p, nil
}

// 3. APPLICATIONS
func (r *Repository) CreateApplication(ctx context.Context, studentID, programID uuid.UUID) (*domain.Application, error) {
	appNumber := fmt.Sprintf("APP-%d-%s", time.Now().Unix(), studentID.String()[:4])
	now := time.Now()

	app := &domain.Application{
		ID:                uuid.New(),
		StudentID:         studentID,
		ProgramID:         programID,
		ApplicationNumber: appNumber,
		Status:            domain.AppStatusSubmitted,
		SubmittedAt:       now,
		CreatedAt:         now,
		UpdatedAt:         now,
	}

	if r.pool == nil {
		return app, nil
	}

	// Transaction with quota verification and idempotency check
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	// Check if student already has an active application for this program (prevent duplicate applications on retry)
	var existingApp domain.Application
	checkExistingQuery := `
		SELECT id, application_number, status, submitted_at, created_at, updated_at
		FROM applications
		WHERE student_id = $1 AND program_id = $2 AND status IN ('submitted', 'under_review', 'verified', 'approved')
		LIMIT 1
	`
	err = tx.QueryRow(ctx, checkExistingQuery, studentID, programID).Scan(
		&existingApp.ID, &existingApp.ApplicationNumber, &existingApp.Status,
		&existingApp.SubmittedAt, &existingApp.CreatedAt, &existingApp.UpdatedAt,
	)
	if err == nil {
		// Active application already exists: return existing application idempotently
		existingApp.StudentID = studentID
		existingApp.ProgramID = programID
		return &existingApp, nil
	} else if err != pgx.ErrNoRows {
		return nil, err
	}

	// Check program quota
	var currentCount int
	countQuery := `SELECT COUNT(*) FROM applications WHERE program_id = $1 AND status != 'rejected'`
	if err := tx.QueryRow(ctx, countQuery, programID).Scan(&currentCount); err != nil {
		return nil, err
	}

	var quota int
	if err := tx.QueryRow(ctx, "SELECT quota FROM programs WHERE id = $1 FOR UPDATE", programID).Scan(&quota); err != nil {
		return nil, err
	}

	if currentCount >= quota {
		return nil, domain.ErrQuotaExceeded
	}

	insertQuery := `
		INSERT INTO applications (id, student_id, program_id, application_number, status, submitted_at, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id
	`
	err = tx.QueryRow(ctx, insertQuery,
		app.ID, app.StudentID, app.ProgramID, app.ApplicationNumber, app.Status, app.SubmittedAt, app.CreatedAt, app.UpdatedAt,
	).Scan(&app.ID)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, err
	}

	return app, nil
}

func (r *Repository) UpdateProfile(ctx context.Context, userID uuid.UUID, fullName, phone string) error {
	if r.pool == nil {
		return nil
	}
	query := `
		UPDATE profiles
		SET full_name = COALESCE(NULLIF($2, ''), full_name),
		    phone = COALESCE(NULLIF($3, ''), phone),
		    updated_at = NOW()
		WHERE id = $1
	`
	_, err := r.pool.Exec(ctx, query, userID, fullName, phone)
	return err
}

func (r *Repository) GetStudentApplications(ctx context.Context, studentID uuid.UUID) ([]domain.Application, error) {
	if r.pool == nil {
		return []domain.Application{
			{
				ID:                uuid.New(),
				StudentID:         studentID,
				ProgramID:         uuid.MustParse("b0000000-0000-0000-0000-000000000001"),
				ProgramTitle:      "Program Persiapan Bahasa & Keterampilan Kerja Jepang",
				ApplicationNumber: "APP-LPK-2026-001",
				Status:            domain.AppStatusUnderReview,
				SubmittedAt:       time.Now().Add(-48 * time.Hour),
				CreatedAt:         time.Now().Add(-48 * time.Hour),
				UpdatedAt:         time.Now(),
			},
		}, nil
	}

	query := `
		SELECT a.id, a.student_id, a.program_id, p.title, a.application_number, a.status, a.submitted_at, a.reviewed_by, a.reviewed_at, a.admin_notes, a.created_at, a.updated_at
		FROM applications a
		JOIN programs p ON a.program_id = p.id
		WHERE a.student_id = $1
		ORDER BY a.submitted_at DESC
	`
	rows, err := r.pool.Query(ctx, query, studentID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var apps []domain.Application
	for rows.Next() {
		var a domain.Application
		err := rows.Scan(
			&a.ID, &a.StudentID, &a.ProgramID, &a.ProgramTitle, &a.ApplicationNumber,
			&a.Status, &a.SubmittedAt, &a.ReviewedBy, &a.ReviewedAt, &a.AdminNotes, &a.CreatedAt, &a.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		apps = append(apps, a)
	}

	return apps, nil
}

// 4. ADMIN DASHBOARD METRICS
func (r *Repository) GetAdminDashboardMetrics(ctx context.Context) (*domain.DashboardMetrics, error) {
	if r.pool == nil {
		return &domain.DashboardMetrics{
			TotalStudents:       142,
			PendingApplications: 18,
			ActiveClasses:       8,
			PublishedPrograms:   4,
		}, nil
	}

	var m domain.DashboardMetrics
	_ = r.pool.QueryRow(ctx, "SELECT COUNT(*) FROM profiles").Scan(&m.TotalStudents)
	_ = r.pool.QueryRow(ctx, "SELECT COUNT(*) FROM applications WHERE status IN ('submitted', 'under_review')").Scan(&m.PendingApplications)
	_ = r.pool.QueryRow(ctx, "SELECT COUNT(*) FROM classes WHERE status = 'ongoing'").Scan(&m.ActiveClasses)
	_ = r.pool.QueryRow(ctx, "SELECT COUNT(*) FROM programs WHERE status = 'published'").Scan(&m.PublishedPrograms)

	return &m, nil
}

func getMockPrograms() []domain.Program {
	return []domain.Program{
		{
			ID:           uuid.MustParse("b0000000-0000-0000-0000-000000000001"),
			CategoryID:   uuid.MustParse("a0000000-0000-0000-0000-000000000001"),
			CategoryName: "Pelatihan Bahasa Jepang & Magang",
			Title:        "Program Persiapan Bahasa & Keterampilan Kerja Jepang (Tokutei Ginou)",
			Slug:         "persiapan-bahasa-kerja-jepang-tokutei-ginou",
			Description:  "Program pelatihan terpadu meliputi penguasaan bahasa Jepang setara N4/JFT-Basic A2, pemahaman budaya kerja Jepang, dan sertifikasi keahlian.",
			Duration:     "4 Bulan (480 Jam Pelatihan)",
			Price:        5500000,
			Quota:        30,
			Status:       "published",
			Curriculum:   []string{"Tata Bahasa Minna no Nihongo", "Percakapan Praktis (Kaiwa)", "Karakter Kanji Industri", "Budaya Kerja Hou-Ren-Sou"},
			Requirements: []string{"Usia minimal 18 tahun", "Pendidikan minimal SMA/SMK", "Sehat jasmani dan rohani"},
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
		},
		{
			ID:           uuid.MustParse("b0000000-0000-0000-0000-000000000002"),
			CategoryID:   uuid.MustParse("a0000000-0000-0000-0000-000000000002"),
			CategoryName: "Pelatihan Bahasa Korea & EPS-TOPIK",
			Title:        "Kelas Intensif Bahasa Korea EPS-TOPIK",
			Slug:         "kelas-intensif-bahasa-korea-eps-topik",
			Description:  "Pelatihan intensif persiapan ujian EPS-TOPIK G to G Korea Selatan mencakup latihan mendengar, membaca, dan tes keterampilan.",
			Duration:     "3 Bulan (360 Jam Pelatihan)",
			Price:        4200000,
			Quota:        25,
			Status:       "published",
			Curriculum:   []string{"Struktur Huruf Hangul", "Kosakata Kehidupan & Industri", "Drilling Soal Ujian Komputer (UBT)"},
			Requirements: []string{"Usia 18 - 39 tahun", "Pendidikan minimal SMP/SMA", "Tidak buta warna"},
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
		},
		{
			ID:           uuid.MustParse("b0000000-0000-0000-0000-000000000003"),
			CategoryID:   uuid.MustParse("a0000000-0000-0000-0000-000000000003"),
			CategoryName: "Teknik Manufaktur & Pengelasan",
			Title:        "Pelatihan Vokasi Pengelasan 3G/4G SMAW & GMAW",
			Slug:         "pelatihan-vokasi-pengelasan-smaw-gmaw",
			Description:  "Kombinasi teori dan 80% praktik pengelasan posisi 1G hingga 4G plat dan pipa untuk mencetak juru las bersertifikasi industri.",
			Duration:     "2 Bulan (240 Jam Pelatihan)",
			Price:        4800000,
			Quota:        20,
			Status:       "published",
			Curriculum:   []string{"K3 Bengkel Las", "Membaca Gambar Teknik", "Pengelasan Busur Listrik (SMAW)", "Uji Bending & Visual"},
			Requirements: []string{"Minimal usia 18 tahun", "Pendidikan minimal SMA/SMK"},
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
		},
	}
}
