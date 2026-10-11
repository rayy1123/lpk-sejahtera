import { Program, Application, DashboardMetrics } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('lpk_auth_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Request gagal dengan status ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    // Mutations (POST, PUT, PATCH, DELETE) MUST throw errors and never return silent mock fallbacks!
    if (options.method && options.method.toUpperCase() !== 'GET') {
      throw error;
    }
    console.warn(`API query ke ${endpoint} menggunakan fallback lokal:`, error);
    return getFallbackData<T>(endpoint);
  }
}

// Fallback data when backend server is offline during development/preview
function getFallbackData<T>(endpoint: string): T {
  const mockPrograms: Program[] = [
    {
      id: 'b0000000-0000-0000-0000-000000000001',
      category_id: 'a0000000-0000-0000-0000-000000000001',
      category_name: 'Pelatihan Bahasa Jepang & Magang',
      title: 'Program Persiapan Bahasa & Keterampilan Kerja Jepang (Tokutei Ginou)',
      slug: 'persiapan-bahasa-kerja-jepang-tokutei-ginou',
      description: 'Program pelatihan terpadu meliputi penguasaan bahasa Jepang setara N4/JFT-Basic A2, pemahaman budaya kerja Jepang (Hourensou), dan sertifikasi keahlian bidang pengolahan makanan atau manufaktur.',
      curriculum: ['Tata Bahasa Minna no Nihongo I & II', 'Percakapan Praktis (Kaiwa)', 'Kanji Industri', 'Budaya Kerja Hou-Ren-Sou'],
      duration: '4 Bulan (480 Jam)',
      price: 5500000,
      requirements: ['Usia minimal 18 tahun', 'Pendidikan minimal SMA/SMK', 'Sehat jasmani dan rohani'],
      quota: 30,
      status: 'published',
      created_at: new Date().toISOString(),
    },
    {
      id: 'b0000000-0000-0000-0000-000000000002',
      category_id: 'a0000000-0000-0000-0000-000000000002',
      category_name: 'Pelatihan Bahasa Korea & EPS-TOPIK',
      title: 'Kelas Intensif Bahasa Korea EPS-TOPIK',
      slug: 'kelas-intensif-bahasa-korea-eps-topik',
      description: 'Pelatihan intensif 3 bulan persiapan ujian EPS-TOPIK Government to Government (G to G) Korea Selatan, mencakup latihan mendengar, membaca, dan tes keterampilan.',
      curriculum: ['Huruf Hangul & Pengucapan', 'Kosakata Industri', 'Drilling Soal Komputer (UBT)', 'Simulasi Wawancara'],
      duration: '3 Bulan (360 Jam)',
      price: 4200000,
      requirements: ['Usia 18 - 39 tahun', 'Pendidikan minimal SMP/SMA', 'Tidak buta warna'],
      quota: 25,
      status: 'published',
      created_at: new Date().toISOString(),
    },
    {
      id: 'b0000000-0000-0000-0000-000000000003',
      category_id: 'a0000000-0000-0000-0000-000000000003',
      category_name: 'Teknik Manufaktur & Pengelasan',
      title: 'Pelatihan Vokasi Pengelasan 3G/4G SMAW & GMAW',
      slug: 'pelatihan-vokasi-pengelasan-smaw-gmaw',
      description: 'Kombinasi teori metalurgi dan 80% praktik pengelasan posisi 1G hingga 4G plat dan pipa, ditujukan untuk mencetak juru las profesional bersertifikat.',
      curriculum: ['K3 Bengkel Las', 'Gambar Teknik & Simbol Las', 'Pengelasan Busur Listrik (SMAW)', 'Uji Hasil Las'],
      duration: '2 Bulan (240 Jam)',
      price: 4800000,
      requirements: ['Minimal usia 18 tahun', 'Pendidikan minimal SMA/SMK Teknik'],
      quota: 20,
      status: 'published',
      created_at: new Date().toISOString(),
    },
  ];

  if (endpoint.startsWith('/programs/')) {
    const slug = endpoint.replace('/programs/', '').split('?')[0];
    const found = mockPrograms.find((p) => p.slug === slug);
    return (found || mockPrograms[0]) as unknown as T;
  }

  if (endpoint.startsWith('/programs')) {
    return mockPrograms as unknown as T;
  }

  if (endpoint.startsWith('/admin/dashboard')) {
    return {
      total_students: 142,
      pending_applications: 18,
      active_classes: 8,
      published_programs: 4,
    } as unknown as T;
  }

  return [] as unknown as T;
}

export const api = {
  getPrograms: (params?: { category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return fetchAPI<Program[]>(`/programs${query}`);
  },

  getProgramBySlug: (slug: string) => {
    return fetchAPI<Program>(`/programs/${slug}`);
  },

  applyProgram: (payload: {
    program_id: string;
    full_name?: string;
    nik?: string;
    email?: string;
    phone?: string;
    gender?: string;
    birth_date?: string;
    address?: string;
    education?: string;
    consent?: boolean;
  } | string) => {
    const bodyObj = typeof payload === 'string' ? { program_id: payload } : payload;
    return fetchAPI<Application>('/student/applications', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
    });
  },

  getStudentApplications: () => {
    return fetchAPI<Application[]>('/student/applications');
  },

  getAdminMetrics: () => {
    return fetchAPI<DashboardMetrics>('/admin/dashboard');
  },

  getAdminApplications: (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return fetchAPI<Application[]>(`/admin/applications${query}`);
  },

  reviewApplication: (id: string, status: string, notes: string) => {
    return fetchAPI<Application>(`/admin/applications/${id}/review`, {
      method: 'PATCH',
      body: JSON.stringify({ status, admin_notes: notes }),
    });
  },
};
