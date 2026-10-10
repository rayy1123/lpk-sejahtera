import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Bell } from 'lucide-react';

export default function InformasiPage() {
  const articles = [
    {
      id: 1,
      title: 'Pembukaan Pendaftaran Gelombang I Pelatihan Vokasi & Bahasa Asing 2026',
      slug: 'pembukaan-pendaftaran-gelombang-1-lpk-sejahtera',
      date: '10 Oktober 2026',
      category: 'Pengumuman Resmi',
      summary: 'PT. Sejahtera Abadi Bersama secara resmi membuka pendaftaran peserta pelatihan baru untuk Program Bahasa Jepang (Tokutei Ginou), Bahasa Korea (EPS-TOPIK), dan Teknik Pengelasan.',
    },
    {
      id: 2,
      title: 'Sosialisasi Standar Kualifikasi dan Alur Penempatan Tenaga Kerja',
      slug: 'sosialisasi-standar-kualifikasi-dan-alur-penempatan',
      date: '02 Oktober 2026',
      category: 'Agenda & Berita',
      summary: 'LPK Sejahtera Abadi mengundang seluruh calon peserta dan orang tua untuk menghadiri sesi konsultasi terbuka mengenai tahapan pelatihan, persyaratan dokumen resmi, dan pengenalan kurikulum kerja.',
    },
    {
      id: 3,
      title: 'Kiat Sukses Menghadapi Ujian Komputer EPS-TOPIK (UBT) Bahasa Korea',
      slug: 'kiat-sukses-ujian-eps-topik-ubt-bahasa-korea',
      date: '25 September 2026',
      category: 'Edukasi & Tips',
      summary: 'Panduan teknis dan strategi manajemen waktu bagi calon peserta ujian dalam menghadapi sesi mendengar (listening) dan membaca (reading) sistem UBT.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest">
          Pusat Informasi
        </span>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Berita, Agenda & Pengumuman Resmi
        </h1>
        <p className="text-sm text-slate-600">
          Informasi terkini seputar jadwal pendaftaran, agenda sosialisasi, dan wawasan pelatihan kerja.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between space-y-4 hover:border-secondary/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-secondary">{art.category}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {art.date}
                </span>
              </div>
              <h2 className="text-base font-bold text-primary leading-snug hover:text-secondary transition-colors">
                {art.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {art.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <span className="text-xs font-bold text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
