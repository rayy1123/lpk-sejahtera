package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"lpk-sejahtera/services/api/internal/domain"
	"lpk-sejahtera/services/api/internal/handler"
	"lpk-sejahtera/services/api/internal/middleware"
	"lpk-sejahtera/services/api/internal/repository"
	"lpk-sejahtera/services/api/internal/service"
)

const testSecret = "test-secret-key-32-bytes-minimum-length"

func setupTestServer() http.Handler {
	repo := repository.New(nil) // in-memory fallback
	svc := service.New(repo)
	authMW := middleware.NewAuthMiddleware(testSecret)
	rbacMW := middleware.NewRBACMiddleware(repo)

	h := handler.New(svc, authMW, rbacMW)

	r := chi.NewRouter()
	h.RegisterRoutes(r)

	return r
}

func generateTestJWT(userID uuid.UUID, email, role string, secret string, expired bool) string {
	exp := time.Now().Add(1 * time.Hour)
	if expired {
		exp = time.Now().Add(-1 * time.Hour)
	}

	claims := jwt.MapClaims{
		"sub":   userID.String(),
		"email": email,
		"role":  role,
		"exp":   exp.Unix(),
		"iat":   time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _ := token.SignedString([]byte(secret))
	return tokenString
}

// 1. Healthcheck
func TestHealthCheck(t *testing.T) {
	app := setupTestServer()

	req, _ := http.NewRequest(http.MethodGet, "/api/v1/healthz", nil)
	rr := httptest.NewRecorder()

	app.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rr.Code)
	}

	var res map[string]interface{}
	if err := json.NewDecoder(rr.Body).Decode(&res); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if res["status"] != "healthy" {
		t.Errorf("expected status 'healthy', got '%v'", res["status"])
	}
}

// 2. Public Programs
func TestListProgramsPublic(t *testing.T) {
	app := setupTestServer()

	req, _ := http.NewRequest(http.MethodGet, "/api/v1/programs", nil)
	rr := httptest.NewRecorder()

	app.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rr.Code)
	}

	var res map[string]interface{}
	if err := json.NewDecoder(rr.Body).Decode(&res); err != nil {
		t.Fatalf("failed to decode json: %v", err)
	}

	if res["success"] != true {
		t.Errorf("expected success true, got %v", res["success"])
	}
}

// 3. Unauthenticated Rejection (Deny-by-default)
func TestProtectedEndpoint_RejectsUnauthenticated(t *testing.T) {
	app := setupTestServer()

	req, _ := http.NewRequest(http.MethodGet, "/api/v1/student/profile", nil)
	rr := httptest.NewRecorder()

	app.ServeHTTP(rr, req)

	if rr.Code != http.StatusUnauthorized {
		t.Errorf("expected status 401 Unauthorized, got %d", rr.Code)
	}
}

func TestAdminEndpoint_RejectsUnauthenticated(t *testing.T) {
	app := setupTestServer()

	req, _ := http.NewRequest(http.MethodGet, "/api/v1/admin/dashboard", nil)
	rr := httptest.NewRecorder()

	app.ServeHTTP(rr, req)

	if rr.Code != http.StatusUnauthorized {
		t.Errorf("expected status 401 Unauthorized for admin endpoint, got %d", rr.Code)
	}
}

// 4. Invalid Token Signature Rejection
func TestInvalidTokenSignature_Rejection(t *testing.T) {
	app := setupTestServer()

	// Signed with wrong secret
	tamperedToken := generateTestJWT(uuid.New(), "attacker@fake.com", "super_admin", "wrong-secret-key-32-bytes-long", false)

	req, _ := http.NewRequest(http.MethodGet, "/api/v1/admin/dashboard", nil)
	req.Header.Set("Authorization", "Bearer "+tamperedToken)
	rr := httptest.NewRecorder()

	app.ServeHTTP(rr, req)

	if rr.Code != http.StatusUnauthorized {
		t.Errorf("expected status 401 Unauthorized for tampered token, got %d", rr.Code)
	}
}

// 5. Expired Token Rejection
func TestExpiredToken_Rejection(t *testing.T) {
	app := setupTestServer()

	expiredToken := generateTestJWT(uuid.New(), "user@lpk.com", "student", testSecret, true)

	req, _ := http.NewRequest(http.MethodGet, "/api/v1/student/profile", nil)
	req.Header.Set("Authorization", "Bearer "+expiredToken)
	rr := httptest.NewRecorder()

	app.ServeHTTP(rr, req)

	if rr.Code != http.StatusUnauthorized {
		t.Errorf("expected status 401 Unauthorized for expired token, got %d", rr.Code)
	}
}

// 6. RBAC: Valid Student JWT Accessing Student Endpoint
func TestStudentEndpoint_AllowedForStudent(t *testing.T) {
	app := setupTestServer()

	studentToken := generateTestJWT(uuid.New(), "student@lpk.com", "student", testSecret, false)

	req, _ := http.NewRequest(http.MethodGet, "/api/v1/student/profile", nil)
	req.Header.Set("Authorization", "Bearer "+studentToken)
	rr := httptest.NewRecorder()

	app.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected status 200 OK for student, got %d", rr.Code)
	}
}

// 7. Input Validation: Invalid Status on Review
func TestAdminReview_InvalidStatusRejected(t *testing.T) {
	app := setupTestServer()

	adminToken := generateTestJWT(uuid.New(), "admin@lpk.com", "admin", testSecret, false)

	invalidBody := []byte(`{"status":"unauthorized_arbitrary_status","admin_notes":"hacking attempt"}`)
	req, _ := http.NewRequest(http.MethodPatch, "/api/v1/admin/applications/test-id/review", bytes.NewBuffer(invalidBody))
	req.Header.Set("Authorization", "Bearer "+adminToken)
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()

	app.ServeHTTP(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Errorf("expected status 400 Bad Request for invalid review status, got %d", rr.Code)
	}
}

// 8. Safe Profile Update: Privilege Escalation Prevention
func TestStudentProfile_PreventsRoleElevation(t *testing.T) {
	app := setupTestServer()

	studentToken := generateTestJWT(uuid.New(), "student@lpk.com", "student", testSecret, false)

	// Attacker tries to inject role: super_admin in profile update body
	body := []byte(`{"full_name":"Hacked Name","phone":"081234567","role":"super_admin"}`)
	req, _ := http.NewRequest(http.MethodPatch, "/api/v1/student/profile", bytes.NewBuffer(body))
	req.Header.Set("Authorization", "Bearer "+studentToken)
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()

	app.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected status 200 OK, got %d", rr.Code)
	}

	var res map[string]interface{}
	_ = json.NewDecoder(rr.Body).Decode(&res)
	data, _ := res["data"].(map[string]interface{})

	// Assert role remained 'student', not 'super_admin'
	if data["role"] != "student" {
		t.Errorf("CRITICAL SECURITY FLAW: Role was elevated to %v", data["role"])
	}
}
