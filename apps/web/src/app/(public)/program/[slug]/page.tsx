import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { formatRupiah } from '@/lib/utils';
import {
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default async function ProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = await api.getProgramBySlug(params.slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Banner / Header Program */}
      <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-primary-light/50 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold tracking-wide">
            {program.category_name || 'Program Unggulan'}
          </span>
          <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
            <Users className="w-4 h-4 text-secondary" /> Kuota: {program.quota} Peserta
          </span>
          <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-secondary" /> {program.duration}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
          {program.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {program.description}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-primary-light/40">
          <div>
            <span className="text-xs text-slate-400 block font-semibold uppercase">Biaya Pelatihan Resmi</span>
            <span className="text-2xl font-black text-white">
              {formatRupiah(program.price)}
            </span>
          </div>
          <Link
            href={`/daftar?program=${program.id}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-sm shadow-lg transition-all"
          >
            <span>Daftar Program Ini</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Konten 2 Kolom */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Kolom Kiri: Kurikulum & Persyaratan */}
        <div className="lg:col-span-8 space-y-10">
          {/* Kurikulum */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-primary">Materi & Keterampilan yang Dipelajari</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {program.curriculum && program.curriculum.length > 0 ? (
                program.curriculum.map((materi, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-surface-muted border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{materi}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 col-span-2">Kurikulum detail dalam tahap finalisasi teknis.</p>
              )}
            </div>
          </div>

          {/* Persyaratan Pendaftaran */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FileCheck className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="text-xl font-bold text-primary">Persyaratan Calon Peserta</h2>
            </div>

            <ul className="space-y-3">
              {program.requirements && program.requirements.length > 0 ? (
                program.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-400">Persyaratan umum: WNI, usia minimal 18 tahun, sehat jasmani.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Kolom Kanan: Rangkuman & Informasi Tambahan */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-primary pb-3 border-b border-slate-100">
              Informasi Pelatihan
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Durasi Pelatihan</span>
                <span className="font-bold text-primary">{program.duration}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Jadwal Kelas Terdekat</span>
                <span className="font-bold text-primary">Setiap Awal Bulan (Senin - Jumat)</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Metode Pelatihan</span>
                <span className="font-bold text-primary">Tatap Muka & Praktik Lab (Offline)</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Sertifikasi</span>
                <span className="font-bold text-primary">Sertifikat Kelulusan Resmi LPK</span>
              </div>
            </div>

            <Link
              href={`/daftar?program=${program.id}`}
              className="block w-full py-3 text-center rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-xs shadow transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-3 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-bold text-primary">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Jaminan Kualitas Pelatihan</span>
            </div>
            <p className="leading-relaxed">
              Program ini didesain sesuai regulasi ketenagakerjaan dan dibimbing langsung oleh instruktur tersertifikasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
