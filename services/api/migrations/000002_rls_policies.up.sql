-- ==============================================================================
-- 000002_rls_policies.up.sql
-- PT. Sejahtera Abadi Bersama — Row Level Security (RLS) Policies
-- ==============================================================================

-- 1. PROFILES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by authenticated users"
    ON profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 2. ROLES & PERMISSIONS (Read-only for authenticated, managed by service-role)
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Roles viewable by authenticated" ON roles FOR SELECT TO authenticated USING (true);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permissions viewable by authenticated" ON permissions FOR SELECT TO authenticated USING (true);

ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Role permissions viewable by authenticated" ON role_permissions FOR SELECT TO authenticated USING (true);

-- 3. PROGRAM_CATEGORIES
ALTER TABLE program_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active program categories"
    ON program_categories FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- 4. PROGRAMS
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published programs"
    ON programs FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

-- 5. APPLICATIONS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own applications"
    ON applications FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

CREATE POLICY "Students can create applications for themselves"
    ON applications FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = student_id);

-- 6. STUDENT_DOCUMENTS
ALTER TABLE student_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own documents"
    ON student_documents FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

CREATE POLICY "Students can upload their own documents"
    ON student_documents FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = student_id AND verification_status = 'pending');

-- 7. INSTRUCTORS
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active instructors viewable by authenticated" ON instructors FOR SELECT TO authenticated USING (is_active = true);

-- 8. CLASSES
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Classes viewable by authenticated" ON classes FOR SELECT TO authenticated USING (true);

-- 9. CLASS_ENROLLMENTS
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view their own enrollments"
    ON class_enrollments FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

-- 10. SCHEDULES
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Schedules viewable by authenticated" ON schedules FOR SELECT TO authenticated USING (true);

-- 11. ATTENDANCE
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view their own attendance"
    ON attendance FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM class_enrollments ce
            WHERE ce.id = attendance.class_enrollment_id AND ce.student_id = auth.uid()
        )
    );

-- 12. ANNOUNCEMENTS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published announcements"
    ON announcements FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

-- 13. CERTIFICATES
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own certificates"
    ON certificates FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

-- 14. SITE_SETTINGS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    TO anon, authenticated
    USING (true);

-- 15. AUDIT_LOGS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Deny all student access to audit logs directly via client
CREATE POLICY "No direct client access to audit logs"
    ON audit_logs FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role_id IN ('super_admin', 'admin')
        )
    );
