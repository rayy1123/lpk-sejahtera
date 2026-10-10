package config

import (
	"os"
	"strings"
)

type Config struct {
	Port                string
	Env                 string
	AllowedOrigins      []string
	DatabaseURL         string
	SupabaseURL         string
	SupabaseJWTSecret   string
	SupabaseServiceRole string
}

func Load() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	env := os.Getenv("ENV")
	if env == "" {
		env = "development"
	}

	originsStr := os.Getenv("ALLOWED_ORIGINS")
	var allowedOrigins []string
	if originsStr != "" {
		for _, o := range strings.Split(originsStr, ",") {
			trimmed := strings.TrimSpace(o)
			if trimmed != "" {
				allowedOrigins = append(allowedOrigins, trimmed)
			}
		}
	} else {
		allowedOrigins = []string{"http://localhost:3000", "http://127.0.0.1:3000"}
	}

	return &Config{
		Port:                port,
		Env:                 env,
		AllowedOrigins:      allowedOrigins,
		DatabaseURL:         os.Getenv("DATABASE_URL"),
		SupabaseURL:         os.Getenv("SUPABASE_URL"),
		SupabaseJWTSecret:   os.Getenv("SUPABASE_JWT_SECRET"),
		SupabaseServiceRole: os.Getenv("SUPABASE_SERVICE_ROLE_KEY"),
	}
}
