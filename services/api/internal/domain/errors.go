package domain

import "errors"

var (
	ErrNotFound          = errors.New("data tidak ditemukan")
	ErrUnauthorized      = errors.New("tidak memiliki otorisasi")
	ErrForbidden         = errors.New("akses ditolak")
	ErrBadRequest        = errors.New("parameter atau data tidak valid")
	ErrConflict          = errors.New("data sudah terdaftar atau terjadi konflik")
	ErrInternalServer   = errors.New("terjadi kesalahan pada server internal")
	ErrQuotaExceeded     = errors.New("kuota program telah penuh")
	ErrInvalidToken      = errors.New("token autentikasi tidak valid atau sudah kedaluwarsa")
)
