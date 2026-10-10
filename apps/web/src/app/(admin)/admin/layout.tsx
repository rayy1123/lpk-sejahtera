'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  FileCheck2,
  Users,
  GraduationCap,
  CalendarDays,
  FileSpreadsheet,
  Award,
  Newspaper,
  ShieldAlert,
  History,
  Settings,
  LogOut,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lpk_auth_token');
      localStorage.removeItem('lpk_user_role');
    }
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Pendaftaran Peserta', href: '/admin/pendaftaran', icon: FileCheck2 },
    { name: 'Program Pelatihan', href: '/admin#program', icon: BookOpen },
    { name: 'Data Peserta', href: '/admin#peserta', icon: Users },
    { name: 'Pengajar & Instruktur', href: '/admin#instruktur', icon: GraduationCap },
    { name: 'Kelas & Jadwal', href: '/admin#kelas', icon: CalendarDays },
    { name: 'Verifikasi Dokumen', href: '/admin#dokumen', icon: FileSpreadsheet },
    { name: 'Penerbitan Sertifikat', href: '/admin#sertifikat', icon: Award },
    { name: 'Berita & Pengumuman', href: '/admin#pengumuman', icon: Newspaper },
    { name: 'Audit Log Keamanan', href: '/admin#audit', icon: History },
    { name: 'Pengaturan Website', href: '/admin#pengaturan', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface-muted flex flex-col md:flex-row">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 bg-primary text-white p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Logo PT. Sejahtera Abadi Bersama"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-white block leading-tight">
                PT. Sejahtera Abadi Bersama
              </span>
              <span className="text-[10px] text-secondary font-bold tracking-wider">
                ADMINISTRASI LPK
              </span>
            </div>
          </Link>

          {/* Menu Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-secondary text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-primary-light/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Badge & Logout */}
        <div className="pt-6 border-t border-primary-light/40 space-y-3">
          <div className="flex items-center gap-3 px-1 text-xs">
            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs shrink-0">
              SA
            </div>
            <div className="overflow-hidden">
              <span className="font-bold text-white block truncate">Super Admin</span>
              <span className="text-[10px] text-slate-300 block">Hak Akses: Penuh</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi Admin</span>
          </button>
        </div>
      </aside>

      {/* Konten Dashboard Admin */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
