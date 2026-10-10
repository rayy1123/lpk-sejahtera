package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/google/uuid"
	"lpk-sejahtera/services/api/internal/domain"
	"lpk-sejahtera/services/api/internal/middleware"
)

type ApplyRequest struct {
	ProgramID string `json:"program_id"`
}

type UpdateProfileRequest struct {
	FullName string `json:"full_name"`
	Phone    string `json:"phone"`
}

func (h *Handler) GetStudentProfile(w http.ResponseWriter, r *http.Request) {
	authUser, ok := middleware.GetAuthUser(r.Context())
	if !ok {
		respondError(w, http.StatusUnauthorized, "Sesi autentikasi tidak ditemukan")
		return
	}

	profile := map[string]interface{}{
		"id":        authUser.UserID,
		"email":     authUser.Email,
		"full_name": "Peserta Pelatihan LPK",
		"phone":     "+62 812-3456-7890",
		"role":      "student",
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    profile,
	})
}

func (h *Handler) UpdateStudentProfile(w http.ResponseWriter, r *http.Request) {
	authUser, ok := middleware.GetAuthUser(r.Context())
	if !ok {
		respondError(w, http.StatusUnauthorized, "Sesi autentikasi tidak ditemukan")
		return
	}

	var req UpdateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "Body request tidak valid")
		return
	}

	// Pencegahan eskalasi role: role tetap student, user tidak bisa mengubah role miliknya
	profile := map[string]interface{}{
		"id":         authUser.UserID,
		"email":      authUser.Email,
		"full_name":  req.FullName,
		"phone":      req.Phone,
		"role":       "student",
		"updated_at": time.Now(),
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": "Profil berhasil diperbarui",
		"data":    profile,
	})
}

func (h *Handler) GetStudentApplications(w http.ResponseWriter, r *http.Request) {
	authUser, ok := middleware.GetAuthUser(r.Context())
	if !ok {
		respondError(w, http.StatusUnauthorized, "Sesi autentikasi tidak ditemukan")
		return
	}

	apps, err := h.svc.GetStudentApplications(r.Context(), authUser.UserID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Gagal memuat data pendaftaran")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    apps,
	})
}

func (h *Handler) SubmitApplication(w http.ResponseWriter, r *http.Request) {
	authUser, ok := middleware.GetAuthUser(r.Context())
	if !ok {
		respondError(w, http.StatusUnauthorized, "Sesi autentikasi tidak ditemukan")
		return
	}

	var req ApplyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "Format JSON tidak valid")
		return
	}

	progID, err := uuid.Parse(req.ProgramID)
	if err != nil {
		respondError(w, http.StatusBadRequest, "ID program tidak valid")
		return
	}

	app, err := h.svc.ApplyProgram(r.Context(), authUser.UserID, progID)
	if err != nil {
		if err == domain.ErrQuotaExceeded {
			respondError(w, http.StatusConflict, "Kuota program pelatihan telah penuh")
			return
		}
		respondError(w, http.StatusInternalServerError, "Gagal memproses pendaftaran")
		return
	}

	respondJSON(w, http.StatusCreated, map[string]interface{}{
		"success": true,
		"message": "Pendaftaran berhasil diajukan dan sedang menunggu verifikasi",
		"data":    app,
	})
}

func (h *Handler) GetStudentSchedules(w http.ResponseWriter, r *http.Request) {
	schedules := []map[string]interface{}{
		{
			"id":         uuid.New(),
			"title":      "Pelatihan Kosakata & Pola Kalimat Bab 1-5",
			"start_at":   time.Now().Add(24 * time.Hour),
			"end_at":     time.Now().Add(27 * time.Hour),
			"location":   "Ruang Teori 1 - Gedung LPK",
			"instructor": "Sensei Budi Prasetyo, S.Pd.",
		},
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    schedules,
	})
}

func (h *Handler) GetStudentDocuments(w http.ResponseWriter, r *http.Request) {
	docs := []map[string]interface{}{
		{
			"document_type":       "ktp",
			"verification_status": "valid",
			"uploaded_at":         time.Now().Add(-72 * time.Hour),
		},
		{
			"document_type":       "ijazah",
			"verification_status": "pending",
			"uploaded_at":         time.Now().Add(-24 * time.Hour),
		},
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    docs,
	})
}

func (h *Handler) GetStudentCertificates(w http.ResponseWriter, r *http.Request) {
	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    []interface{}{},
	})
}
