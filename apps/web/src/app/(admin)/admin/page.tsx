'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { DashboardMetrics, Application } from '@/types';
import {
  Users,
  Clock,
  GraduationCap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileText,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    total_students: 142,
    pending_applications: 18,
    active_classes: 8,
    published_programs: 4,
  });

  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const m = await api.getAdminMetrics();
        if (m) setMetrics(m);

        const apps = await api.getAdminApplications();
        if (apps) setApplications(apps);
      } catch (err) {
        console.error('Gagal memuat metrik admin:', err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Dashboard */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-secondary uppercase tracking-wider">
          Panel Kontrol Operasional
        </span>
        <h1 className="text-2xl font-extrabold text-primary">
          Ringkasan Administrasi LPK
        </h1>
        <p className="text-xs text-slate-500">
          PT. Sejahtera Abadi Bersama — Monitoring Pendaftaran, Kelas, dan Verifikasi Berkas
        </p>
      </div>

      {/* 4 Kartu Metrik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Peserta Terdaftar</span>
            <span className="text-2xl font-black text-primary block">{metrics.total_students}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Users className="w-6 h-6 text-secondary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Pendaftaran Menunggu</span>
            <span className="text-2xl font-black text-amber-600 block">{metrics.pending_applications}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Kelas Aktif Berjalan</span>
            <span className="text-2xl font-black text-primary block">{metrics.active_classes}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-secondary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Program Pelatihan Aktif</span>
            <span className="text-2xl font-black text-primary block">{metrics.published_programs}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-secondary" />
          </div>
        </div>
      </div>

      {/* Tabel Pendaftaran Menunggu Verifikasi */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-primary">
              Pendaftaran Terbaru Menunggu Peninjauan
            </h2>
            <p className="text-xs text-slate-400">
              Verifikasi kelengkapan berkas kependudukan calon peserta sebelum penempatan kelas.
            </p>
          </div>
          <Link
            href="/admin/pendaftaran"
            className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">No. Pendaftaran</th>
                <th className="py-3 px-4">Nama Calon Peserta</th>
                <th className="py-3 px-4">Program Pilihan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary">
                      {app.application_number}
                    </td>
                    <td className="py-3.5 px-4 font-semibold">
                      {app.student_name || 'Peserta Terdaftar'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {app.program_title || 'Bahasa Jepang Tokutei Ginou'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {app.status === 'submitted' ? 'Menunggu Review' : app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/admin/pendaftaran"
                        className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-light text-white text-[11px] font-semibold transition-colors"
                      >
                        Tinjau Berkas
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400">
                    Tidak ada pendaftaran menunggu saat ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
