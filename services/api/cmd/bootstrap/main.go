package main

import (
	"context"
	"flag"
	"fmt"
	"log/slog"
	"os"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"lpk-sejahtera/services/api/internal/config"
)

func main() {
	emailFlag := flag.String("email", "", "Email akun yang akan dijadikan super admin")
	flag.Parse()

	if *emailFlag == "" {
		fmt.Println("Penggunaan: go run cmd/bootstrap/main.go -email admin@lpksejahtera.com")
		os.Exit(1)
	}

	cfg := config.Load()
	if cfg.DatabaseURL == "" {
		slog.Error("DATABASE_URL wajib diisi untuk menjalankan bootstrap admin")
		os.Exit(1)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	pool, err := pgxpool.New(ctx, cfg.DatabaseURL)
	if err != nil {
		slog.Error("Gagal menghubungkan ke database", "error", err)
		os.Exit(1)
	}
	defer pool.Close()

	var userID uuid.UUID
	err = pool.QueryRow(ctx, "SELECT id FROM auth.users WHERE email = $1", *emailFlag).Scan(&userID)
	if err != nil {
		slog.Error("User tidak ditemukan di auth.users. Pastikan user telah registrasi di Supabase Auth.", "email", *emailFlag, "error", err)
		os.Exit(1)
	}

	// Pastikan profile ada
	_, _ = pool.Exec(ctx, `
		INSERT INTO profiles (id, full_name, created_at, updated_at)
		VALUES ($1, 'Super Administrator LPK', NOW(), NOW())
		ON CONFLICT (id) DO NOTHING
	`, userID)

	// Berikan role super_admin
	_, err = pool.Exec(ctx, `
		INSERT INTO user_roles (user_id, role_id, assigned_by, created_at)
		VALUES ($1, 'super_admin', $1, NOW())
		ON CONFLICT (user_id, role_id) DO NOTHING
	`, userID)
	if err != nil {
		slog.Error("Gagal memberikan role super_admin", "error", err)
		os.Exit(1)
	}

	// Catat di audit log
	_, _ = pool.Exec(ctx, `
		INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, metadata, created_at)
		VALUES ($1, 'BOOTSTRAP_SUPER_ADMIN_CLI', 'user_roles', $1, '{"method":"CLI"}'::jsonb, NOW())
	`, userID)

	slog.Info("BERHASIL: Akun berhasil ditingkatkan menjadi super_admin", "user_id", userID, "email", *emailFlag)
}
