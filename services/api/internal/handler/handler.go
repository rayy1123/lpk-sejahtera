package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"lpk-sejahtera/services/api/internal/domain"
	"lpk-sejahtera/services/api/internal/middleware"
	"lpk-sejahtera/services/api/internal/service"
)

type Handler struct {
	svc  *service.Service
	rbac *middleware.RBACMiddleware
	auth *middleware.AuthMiddleware
}

func New(svc *service.Service, auth *middleware.AuthMiddleware, rbac *middleware.RBACMiddleware) *Handler {
	return &Handler{
		svc:  svc,
		auth: auth,
		rbac: rbac,
	}
}

func (h *Handler) RegisterRoutes(r chi.Router) {
	// Public Routes
	r.Route("/api/v1", func(r chi.Router) {
		r.Get("/healthz", h.HealthCheck)

		r.Group(func(r chi.Router) {
			r.Get("/programs", h.ListPrograms)
			r.Get("/programs/{slug}", h.GetProgram)
			r.Get("/categories", h.ListCategories)
			r.Get("/announcements", h.ListAnnouncements)
		})

		// Protected Student Routes (requires valid Supabase JWT + student role)
		r.Group(func(r chi.Router) {
			r.Use(h.auth.RequireAuth)
			r.Use(h.rbac.RequireRoles(domain.RoleStudent, domain.RoleAdmin, domain.RoleSuperAdmin))

			r.Get("/student/profile", h.GetStudentProfile)
			r.Patch("/student/profile", h.UpdateStudentProfile)
			r.Get("/student/applications", h.GetStudentApplications)
			r.Post("/student/applications", h.SubmitApplication)
			r.Get("/student/schedules", h.GetStudentSchedules)
			r.Get("/student/documents", h.GetStudentDocuments)
			r.Get("/student/certificates", h.GetStudentCertificates)
		})

		// Protected Admin Routes (requires valid Supabase JWT + admin/super_admin/staff)
		r.Group(func(r chi.Router) {
			r.Use(h.auth.RequireAuth)
			r.Use(h.rbac.RequireRoles(domain.RoleAdmin, domain.RoleSuperAdmin, domain.RoleStaff))

			r.Get("/admin/dashboard", h.GetAdminDashboard)
			r.Get("/admin/applications", h.GetAdminApplications)
			r.Patch("/admin/applications/{id}/review", h.ReviewApplication)
		})
	})
}

func (h *Handler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	respondJSON(w, http.StatusOK, map[string]interface{}{
		"status":    "healthy",
		"service":   "PT. Sejahtera Abadi Bersama API",
		"version":   "1.0.0",
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func respondJSON(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_ = json.NewEncoder(w).Encode(data)
}

func respondError(w http.ResponseWriter, statusCode int, message string) {
	respondJSON(w, statusCode, map[string]interface{}{
		"error":   message,
		"success": false,
	})
}
