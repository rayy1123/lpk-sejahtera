package service

import (
	"context"

	"github.com/google/uuid"
	"lpk-sejahtera/services/api/internal/domain"
	"lpk-sejahtera/services/api/internal/repository"
)

type Service struct {
	repo *repository.Repository
}

func New(repo *repository.Repository) *Service {
	return &Service{repo: repo}
}

// Programs
func (s *Service) ListPrograms(ctx context.Context, categorySlug, search string) ([]domain.Program, error) {
	return s.repo.GetPublishedPrograms(ctx, categorySlug, search)
}

func (s *Service) GetProgram(ctx context.Context, slug string) (*domain.Program, error) {
	if slug == "" {
		return nil, domain.ErrBadRequest
	}
	return s.repo.GetProgramBySlug(ctx, slug)
}

// Applications
func (s *Service) ApplyProgram(ctx context.Context, studentID, programID uuid.UUID) (*domain.Application, error) {
	if studentID == uuid.Nil || programID == uuid.Nil {
		return nil, domain.ErrBadRequest
	}
	return s.repo.CreateApplication(ctx, studentID, programID)
}

func (s *Service) GetStudentApplications(ctx context.Context, studentID uuid.UUID) ([]domain.Application, error) {
	if studentID == uuid.Nil {
		return nil, domain.ErrUnauthorized
	}
	return s.repo.GetStudentApplications(ctx, studentID)
}

// Admin
func (s *Service) GetAdminMetrics(ctx context.Context) (*domain.DashboardMetrics, error) {
	return s.repo.GetAdminDashboardMetrics(ctx)
}
