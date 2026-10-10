package domain

import (
	"time"

	"github.com/google/uuid"
)

type Role string

const (
	RoleSuperAdmin Role = "super_admin"
	RoleAdmin      Role = "admin"
	RoleStaff      Role = "staff"
	RoleStudent    Role = "student"
)

type Profile struct {
	ID        uuid.UUID `json:"id"`
	FullName  string    `json:"full_name"`
	Phone     *string   `json:"phone,omitempty"`
	AvatarURL *string   `json:"avatar_url,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type UserWithRoles struct {
	Profile
	Roles []Role `json:"roles"`
}

type ProgramCategory struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Slug        string    `json:"slug"`
	Description *string   `json:"description,omitempty"`
	IsActive    bool      `json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
}

type Program struct {
	ID            uuid.UUID `json:"id"`
	CategoryID    uuid.UUID `json:"category_id"`
	CategoryName  string    `json:"category_name,omitempty"`
	Title         string    `json:"title"`
	Slug          string    `json:"slug"`
	Description   string    `json:"description"`
	Curriculum    []string  `json:"curriculum"`
	Duration      string    `json:"duration"`
	Price         float64   `json:"price"`
	Requirements  []string  `json:"requirements"`
	Quota         int       `json:"quota"`
	ThumbnailPath *string   `json:"thumbnail_path,omitempty"`
	Status        string    `json:"status"` // draft, published, archived
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type ApplicationStatus string

const (
	AppStatusSubmitted   ApplicationStatus = "submitted"
	AppStatusUnderReview ApplicationStatus = "under_review"
	AppStatusVerified    ApplicationStatus = "verified"
	AppStatusApproved    ApplicationStatus = "approved"
	AppStatusRejected    ApplicationStatus = "rejected"
)

type Application struct {
	ID                uuid.UUID         `json:"id"`
	StudentID         uuid.UUID         `json:"student_id"`
	StudentName       string            `json:"student_name,omitempty"`
	ProgramID         uuid.UUID         `json:"program_id"`
	ProgramTitle      string            `json:"program_title,omitempty"`
	ApplicationNumber string            `json:"application_number"`
	Status            ApplicationStatus `json:"status"`
	SubmittedAt       time.Time         `json:"submitted_at"`
	ReviewedBy        *uuid.UUID        `json:"reviewed_by,omitempty"`
	ReviewedAt        *time.Time        `json:"reviewed_at,omitempty"`
	AdminNotes        *string           `json:"admin_notes,omitempty"`
	CreatedAt         time.Time         `json:"created_at"`
	UpdatedAt         time.Time         `json:"updated_at"`
}

type StudentDocument struct {
	ID                 uuid.UUID  `json:"id"`
	StudentID          uuid.UUID  `json:"student_id"`
	ApplicationID      *uuid.UUID `json:"application_id,omitempty"`
	DocumentType       string     `json:"document_type"`
	StoragePath        string     `json:"storage_path"`
	VerificationStatus string     `json:"verification_status"`
	VerifiedBy         *uuid.UUID `json:"verified_by,omitempty"`
	VerifiedAt         *time.Time `json:"verified_at,omitempty"`
	Notes              *string    `json:"notes,omitempty"`
	CreatedAt          time.Time  `json:"created_at"`
}

type Schedule struct {
	ID        uuid.UUID `json:"id"`
	ClassID   uuid.UUID `json:"class_id"`
	ClassName string    `json:"class_name,omitempty"`
	Title     string    `json:"title"`
	StartAt   time.Time `json:"start_at"`
	EndAt     time.Time `json:"end_at"`
	Location  string    `json:"location"`
	Notes     *string   `json:"notes,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

type Certificate struct {
	ID                uuid.UUID `json:"id"`
	StudentID         uuid.UUID `json:"student_id"`
	ProgramID         uuid.UUID `json:"program_id"`
	ProgramTitle      string    `json:"program_title,omitempty"`
	CertificateNumber string    `json:"certificate_number"`
	IssuedAt          time.Time `json:"issued_at"`
	StoragePath       string    `json:"storage_path"`
	CreatedAt         time.Time `json:"created_at"`
}

type Announcement struct {
	ID          uuid.UUID `json:"id"`
	Title       string    `json:"title"`
	Slug        string    `json:"slug"`
	Content     string    `json:"content"`
	PublishedAt time.Time `json:"published_at"`
	Status      string    `json:"status"`
}

type DashboardMetrics struct {
	TotalStudents       int `json:"total_students"`
	PendingApplications int `json:"pending_applications"`
	ActiveClasses       int `json:"active_classes"`
	PublishedPrograms   int `json:"published_programs"`
}
