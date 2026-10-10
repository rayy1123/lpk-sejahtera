export type Role = 'super_admin' | 'admin' | 'staff' | 'student';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  roles: Role[];
}

export interface Program {
  id: string;
  category_id: string;
  category_name?: string;
  title: string;
  slug: string;
  description: string;
  curriculum: string[];
  duration: string;
  price: number;
  requirements: string[];
  quota: number;
  thumbnail_path?: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
}

export interface ProgramCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
}

export interface Application {
  id: string;
  student_id: string;
  student_name?: string;
  program_id: string;
  program_title?: string;
  application_number: string;
  status: 'submitted' | 'under_review' | 'verified' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at?: string;
  admin_notes?: string;
}

export interface Schedule {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  location: string;
  instructor?: string;
}

export interface DashboardMetrics {
  total_students: number;
  pending_applications: number;
  active_classes: number;
  published_programs: number;
}
