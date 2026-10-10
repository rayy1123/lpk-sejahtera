package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"lpk-sejahtera/services/api/internal/domain"
)

type ReviewRequest struct {
	Status     domain.ApplicationStatus `json:"status"`
	AdminNotes string                   `json:"admin_notes"`
}

func (h *Handler) GetAdminDashboard(w http.ResponseWriter, r *http.Request) {
	metrics, err := h.svc.GetAdminMetrics(r.Context())
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Gagal memuat metrik admin")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    metrics,
	})
}

func (h *Handler) GetAdminApplications(w http.ResponseWriter, r *http.Request) {
	statusFilter := r.URL.Query().Get("status")

	apps := []domain.Application{
		{
			ID:                uuid.New(),
			StudentID:         uuid.New(),
			StudentName:       "Ahmad Fauzi",
			ProgramID:         uuid.MustParse("b0000000-0000-0000-0000-000000000001"),
			ProgramTitle:      "Program Persiapan Bahasa & Keterampilan Kerja Jepang",
			ApplicationNumber: "APP-LPK-2026-001",
			Status:            domain.AppStatusSubmitted,
			SubmittedAt:       time.Now().Add(-2 * time.Hour),
		},
		{
			ID:                uuid.New(),
			StudentID:         uuid.New(),
			StudentName:       "Siti Rahmawati",
			ProgramID:         uuid.MustParse("b0000000-0000-0000-0000-000000000002"),
			ProgramTitle:      "Kelas Intensif Bahasa Korea EPS-TOPIK",
			ApplicationNumber: "APP-LPK-2026-002",
			Status:            domain.AppStatusUnderReview,
			SubmittedAt:       time.Now().Add(-12 * time.Hour),
		},
	}

	if statusFilter != "" {
		filtered := []domain.Application{}
		for _, a := range apps {
			if string(a.Status) == statusFilter {
				filtered = append(filtered, a)
			}
		}
		apps = filtered
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    apps,
	})
}

func (h *Handler) ReviewApplication(w http.ResponseWriter, r *http.Request) {
	appID := chi.URLParam(r, "id")
	if appID == "" {
		respondError(w, http.StatusBadRequest, "ID pendaftaran diperlukan")
		return
	}

	var req ReviewRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "Body request tidak valid")
		return
	}

	// Validasi status hanya boleh dari enum yang diizinkan
	switch req.Status {
	case domain.AppStatusUnderReview, domain.AppStatusVerified, domain.AppStatusApproved, domain.AppStatusRejected:
		// Valid
	default:
		respondError(w, http.StatusBadRequest, "Status peninjauan pendaftaran tidak valid")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": "Status pendaftaran berhasil diperbarui",
		"data": map[string]interface{}{
			"id":          appID,
			"status":      req.Status,
			"admin_notes": req.AdminNotes,
			"reviewed_at": time.Now(),
		},
	})
}
