package middleware

import (
	"context"
	"net/http"

	"lpk-sejahtera/services/api/internal/domain"
)

type RoleChecker interface {
	GetUserRoles(ctx context.Context, userID string) ([]domain.Role, error)
}

type RBACMiddleware struct {
	roleChecker RoleChecker
}

func NewRBACMiddleware(rc RoleChecker) *RBACMiddleware {
	return &RBACMiddleware{roleChecker: rc}
}

func (m *RBACMiddleware) RequireRoles(allowedRoles ...domain.Role) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			user, ok := GetAuthUser(r.Context())
			if !ok {
				http.Error(w, `{"error":"Autentikasi diperlukan"}`, http.StatusUnauthorized)
				return
			}

			// Ambil roles dari RoleChecker database
			roles, err := m.roleChecker.GetUserRoles(r.Context(), user.UserID.String())
			if err != nil {
				// Fallback jika database belum ada data user_roles (default student)
				roles = []domain.Role{domain.RoleStudent}
			}

			hasRole := false
			for _, userRole := range roles {
				for _, allowed := range allowedRoles {
					if userRole == allowed {
						hasRole = true
						break
					}
				}
				if hasRole {
					break
				}
			}

			if !hasRole {
				http.Error(w, `{"error":"Akses ditolak: role tidak memiliki izin untuk resource ini"}`, http.StatusForbidden)
				return
			}

			ctx := context.WithValue(r.Context(), RolesContextKey, roles)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
