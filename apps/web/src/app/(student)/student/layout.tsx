'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  FileText,
  Calendar,
  GraduationCap,
  Bell,
  FolderOpen,
  Award,
  Settings,
  LogOut,
} from 'lucide-react';

export default function StudentLayout({
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
    { name: 'Ringkasan', href: '/student', icon: LayoutDashboard },
    { name: 'Pendaftaran Saya', href: '/student#pendaftaran', icon: FileText },
    { name: 'Jadwal Pelatihan', href: '/student#jadwal', icon: Calendar },
    { name: 'Progres Belajar', href: '/student#progres', icon: GraduationCap },
    { name: 'Dokumen Saya', href: '/student#dokumen', icon: FolderOpen },
    { name: 'Sertifikat Saya', href: '/student#sertifikat', icon: Award },
    { name: 'Pengaturan Akun', href: '/student#pengaturan', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface-muted flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-slate-200 p-1 flex items-center justify-center bg-white shadow-xs">
              <Image
                src="/logo.jpeg"
                alt="Logo PT. Sejahtera Abadi Bersama"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-primary block leading-tight">
                PT. Sejahtera Abadi Bersama
              </span>
              <span className="text-[10px] text-secondary font-bold tracking-wider">
                PORTAL PESERTA
              </span>
            </div>
          </Link>

          {/* Navigasi Menu */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-secondary' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar: User & Keluar */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs">
              PS
            </div>
            <div className="text-xs overflow-hidden">
              <span className="font-bold text-primary block truncate">Budi Santoso</span>
              <span className="text-[10px] text-slate-400 block truncate">peserta@lpksejahtera.com</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
