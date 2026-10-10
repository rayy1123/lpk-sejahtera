package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"lpk-sejahtera/services/api/internal/domain"
)

func (h *Handler) ListPrograms(w http.ResponseWriter, r *http.Request) {
	categorySlug := r.URL.Query().Get("category")
	search := r.URL.Query().Get("search")

	programs, err := h.svc.ListPrograms(r.Context(), categorySlug, search)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Gagal memuat program pelatihan")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    programs,
	})
}

func (h *Handler) GetProgram(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	if slug == "" {
		respondError(w, http.StatusBadRequest, "Slug program diperlukan")
		return
	}

	program, err := h.svc.GetProgram(r.Context(), slug)
	if err != nil {
		if err == domain.ErrNotFound {
			respondError(w, http.StatusNotFound, "Program pelatihan tidak ditemukan")
			return
		}
		respondError(w, http.StatusInternalServerError, "Gagal mengambil data program")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    program,
	})
}

func (h *Handler) ListCategories(w http.ResponseWriter, r *http.Request) {
	categories := []map[string]interface{}{
		{
			"id":          "a0000000-0000-0000-0000-000000000001",
			"name":        "Pelatihan Bahasa Jepang & Magang",
			"slug":        "bahasa-jepang-magang",
			"description": "Program persiapan bahasa Jepang JLPT/JFT dan keterampilan kerja untuk program Tokutei Ginou dan Magang Jepang.",
		},
		{
			"id":          "a0000000-0000-0000-0000-000000000002",
			"name":        "Pelatihan Bahasa Korea & EPS-TOPIK",
			"slug":        "bahasa-korea-eps-topik",
			"description": "Program intensif penguasaan Hangul dan persiapan ujian EPS-TOPIK untuk penempatan Korea Selatan.",
		},
		{
			"id":          "a0000000-0000-0000-0000-000000000003",
			"name":        "Teknik Manufaktur & Pengelasan",
			"slug":        "teknik-manufaktur-pengelasan",
			"description": "Pelatihan vokasi pengelasan standar industri (SMAW, GMAW, GTAW) dan perakitan mekanikal.",
		},
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    categories,
	})
}

func (h *Handler) ListAnnouncements(w http.ResponseWriter, r *http.Request) {
	announcements := []map[string]interface{}{
		{
			"title":        "Pembukaan Pendaftaran Gelombang I Pelatihan Vokasi dan Bahasa Asing",
			"slug":         "pembukaan-pendaftaran-gelombang-1-lpk-sejahtera",
			"content":      "PT. Sejahtera Abadi Bersama secara resmi membuka pendaftaran peserta pelatihan baru untuk Program Bahasa Jepang (Tokutei Ginou), Bahasa Korea (EPS-TOPIK), dan Teknik Pengelasan.",
			"published_at": "2026-10-01T08:00:00Z",
		},
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    announcements,
	})
}
