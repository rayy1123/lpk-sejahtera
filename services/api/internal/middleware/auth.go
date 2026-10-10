package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type contextKey string

const (
	UserContextKey  contextKey = "auth_user"
	RolesContextKey contextKey = "auth_roles"
)

type AuthContext struct {
	UserID uuid.UUID
	Email  string
	Role   string
}

type AuthMiddleware struct {
	jwtSecret string
}

func NewAuthMiddleware(jwtSecret string) *AuthMiddleware {
	return &AuthMiddleware{jwtSecret: jwtSecret}
}

func (a *AuthMiddleware) RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, `{"error":"Authorization header diperlukan"}`, http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			http.Error(w, `{"error":"Format Bearer token tidak valid"}`, http.StatusUnauthorized)
			return
		}

		tokenString := parts[1]

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("algoritma signing tidak terduga: %v", token.Header["alg"])
			}
			return []byte(a.jwtSecret), nil
		})

		if err != nil || !token.Valid {
			// Jika jwtSecret lokal kosong untuk dev testing, atau token invalid
			if a.jwtSecret == "" {
				// Mode development tanpa secret: bypass untuk dev mock jika ada dev mock header
				devUserID := r.Header.Get("X-Dev-User-ID")
				if devUserID != "" {
					parsedID, pErr := uuid.Parse(devUserID)
					if pErr == nil {
						authCtx := AuthContext{
							UserID: parsedID,
							Email:  "dev@lpksejahtera.com",
							Role:   "authenticated",
						}
						ctx := context.WithValue(r.Context(), UserContextKey, authCtx)
						next.ServeHTTP(w, r.WithContext(ctx))
						return
					}
				}
			}
			http.Error(w, `{"error":"Token tidak valid atau telah kedaluwarsa"}`, http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, `{"error":"Claims token tidak valid"}`, http.StatusUnauthorized)
			return
		}

		sub, ok := claims["sub"].(string)
		if !ok || sub == "" {
			http.Error(w, `{"error":"Subject user tidak ditemukan pada token"}`, http.StatusUnauthorized)
			return
		}

		userUUID, err := uuid.Parse(sub)
		if err != nil {
			http.Error(w, `{"error":"Format UUID user tidak valid"}`, http.StatusUnauthorized)
			return
		}

		email, _ := claims["email"].(string)
		appRole, _ := claims["role"].(string)

		authCtx := AuthContext{
			UserID: userUUID,
			Email:  email,
			Role:   appRole,
		}

		ctx := context.WithValue(r.Context(), UserContextKey, authCtx)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetAuthUser(ctx context.Context) (AuthContext, bool) {
	val, ok := ctx.Value(UserContextKey).(AuthContext)
	return val, ok
}
