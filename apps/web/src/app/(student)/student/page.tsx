'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Application } from '@/types';
import {
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderOpen,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getStudentApplications();
        if (res && res.length > 0) {
          setApps(res);
        }
      } catch (err) {
        console.warn('Gagal memuat aplikasi siswa:', err);
      }
    }
    loadData();
  }, []);
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Selamat Datang di Portal Peserta
          </span>
          <h1 className="text-2xl font-extrabold text-primary">
            Halo, Budi Santoso!
          </h1>
          <p className="text-xs text-slate-500">
            Nomor Induk Peserta: <span className="font-mono font-bold text-primary">NIP-2026-0881</span>
          </p>
        </div>

        <Link
          href="/program"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white text-xs font-bold transition-all shadow"
        >
          <span>Jelajahi Program Lain</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Ringkasan Status 3 Kotak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Status Pendaftaran</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
              Sedang Diverifikasi
            </span>
          </div>
          <h3 className="text-base font-bold text-primary">
            Bahasa Jepang Tokutei Ginou
          </h3>
          <p className="text-xs text-slate-500">
            Berkas pendaftaran sedang dalam proses validasi oleh staf administrasi.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Jadwal Terdekat</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
              Mendatang
            </span>
          </div>
          <h3 className="text-base font-bold text-primary">
            Tes Penempatan & Orientasi
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-secondary" />
            <span>Senin, 13 Oktober 2026 • 09.00 WIB</span>
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Kelengkapan Berkas</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
              Lengkap (3/3)
            </span>
          </div>
          <h3 className="text-base font-bold text-primary">
            Dokumen Persyaratan
          </h3>
          <p className="text-xs text-slate-500">
            KTP, Ijazah, dan Pasfoto telah terunggah dengan aman di private storage.
          </p>
        </div>
      </div>

      {/* Rincian Pendaftaran & Dokumen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="pendaftaran">
        {/* Kolom Kiri: Pendaftaran Aktif */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-primary flex items-center gap-2">
            <FileText className="w-4 h-4 text-secondary" />
            <span>Riwayat Pendaftaran Pelatihan</span>
          </h2>

          <div className="space-y-4">
            {apps.length > 0 ? (
              apps.map((a) => (
                <div key={a.id} className="p-4 rounded-2xl bg-surface-muted border border-slate-200/80 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">NO. {a.application_number}</span>
                      <h4 className="text-sm font-bold text-primary">
                        {a.program_title || 'Program Persiapan Bahasa & Keterampilan Kerja Jepang'}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 shrink-0">
                      {a.status === 'submitted' ? 'Menunggu Review' : a.status === 'under_review' ? 'Dalam Proses' : a.status === 'approved' ? 'Disetujui' : a.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Tanggal Pengajuan:</span>
                      <span className="font-semibold text-primary">10 Oktober 2026</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Durasi:</span>
                      <span className="font-semibold text-primary">3 - 4 Bulan Pelatihan</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-2xl bg-surface-muted border border-slate-200/80 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">NO. APP-LPK-2026-001</span>
                    <h4 className="text-sm font-bold text-primary">
                      Program Persiapan Bahasa & Keterampilan Kerja Jepang (Tokutei Ginou)
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 shrink-0">
                    Dalam Review
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Tanggal Pengajuan:</span>
                    <span className="font-semibold text-primary">10 Oktober 2026</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Durasi:</span>
                    <span className="font-semibold text-primary">4 Bulan (480 Jam)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Status Berkas Saya */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6" id="dokumen">
          <h2 className="text-base font-bold text-primary flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-secondary" />
            <span>Status Verifikasi Dokumen</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-surface-muted flex items-center justify-between">
              <div>
                <span className="font-bold text-primary block">KTP / Tanda Penduduk</span>
                <span className="text-[10px] text-slate-400">ktp_budi.jpg</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-muted flex items-center justify-between">
              <div>
                <span className="font-bold text-primary block">Ijazah Terakhir (SMK)</span>
                <span className="text-[10px] text-slate-400">ijazah_smk.pdf</span>
              </div>
              <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Menunggu Staf
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-muted flex items-center justify-between">
              <div>
                <span className="font-bold text-primary block">Pasfoto Formal 3x4</span>
                <span className="text-[10px] text-slate-400">foto_formal.jpg</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
