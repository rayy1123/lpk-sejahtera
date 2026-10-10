import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Target, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProfilPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header Profil */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Profil Lembaga Pelatihan Kerja</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
          PT. Sejahtera Abadi Bersama
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Membangun insan kerja berkarakter, berdisiplin tinggi, dan berkompeten untuk menjawab tantangan dunia industri global.
        </p>
      </div>

      {/* Tentang Kami dengan Logo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-64 h-64 rounded-3xl bg-white border border-slate-200 shadow-lg p-6 flex flex-col items-center justify-center text-center space-y-4">
            <Image
              src="/logo.jpeg"
              alt="Logo PT. Sejahtera Abadi Bersama"
              width={140}
              height={140}
              className="object-contain"
            />
            <div>
              <h3 className="font-bold text-primary text-base">PT. Sejahtera Abadi Bersama</h3>
              <p className="text-xs text-secondary font-medium">LPK Berstandar Ketenagakerjaan</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-primary">Tentang Perusahaan</h2>
          <p>
            <strong>PT. Sejahtera Abadi Bersama</strong> didirikan dengan tekad mulia untuk mengentaskan kesenjangan antara kemampuan lulusan vokasi di tanah air dengan kualifikasi standar kerja yang dibutuhkan industri modern di dalam dan luar negeri.
          </p>
          <p>
            Sebagai Lembaga Pelatihan Kerja (LPK), kami berorientasi pada hasil nyata: penguasaan bahasa secara fungsional, penguasaan alat kerja teknis dengan standar keselamatan ketat, serta penanaman integritas dan etika kerja tinggi.
          </p>
          <div className="p-4 rounded-xl bg-surface-muted border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-primary block">Status Legalitas & Registrasi:</span>
            <p>• Terdaftar di Kementerian Ketenagakerjaan RI (KEMNAKER) sebagai LPK Resmi.</p>
            <p>• Memiliki izin operasional pelatihan kerja kejuruan Bahasa Asing dan Teknik Manufaktur.</p>
          </div>
        </div>
      </div>

      {/* Visi dan Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Target className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold text-primary">Visi Kami</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Menjadi Lembaga Pelatihan Kerja terdepan dan terpercaya di Indonesia yang menghasilkan tenaga kerja profesional berdaya saing global, berintegritas tinggi, dan sejahtera lahir batin.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <HeartHandshake className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold text-primary">Misi Kami</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>Menyelenggarakan pelatihan bahasa asing yang praktis dan berorientasi pada percakapan industri kerja.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>Membina keterampilan vokasi teknik berbasis kurikulum industri yang mutakhir dan aplikatif.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>Menanamkan budaya disiplin, tanggung jawab moral, dan etos kerja standar internasional.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Pendekatan & Nilai Utama */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest">
            Nilai Perusahaan
          </span>
          <h3 className="text-2xl font-bold text-primary">Nilai & Karakter Utama LPK</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-surface-muted border border-slate-200/60 space-y-2">
            <span className="text-base font-bold text-primary">1. Disiplin & Tanggung Jawab</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tepat waktu, taat prosedur keselamatan kerja (K3), dan memegang teguh komitmen kerja sama.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-surface-muted border border-slate-200/60 space-y-2">
            <span className="text-base font-bold text-primary">2. Kompetensi Teruji</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Setiap materi teori dibuktikan lewat uji praktik berkala hingga peserta benar-benar menguasainya.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-surface-muted border border-slate-200/60 space-y-2">
            <span className="text-base font-bold text-primary">3. Integritas & Transparansi</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Informasi biaya, persyaratan, dan alur pelatihan disampaikan secara jujur dan tanpa biaya tersembunyi.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-8">
        <Link
          href="/program"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-md transition-all"
        >
          <span>Lihat Seluruh Program Pelatihan</span>
          <ArrowRight className="w-4 h-4 text-secondary" />
        </Link>
      </div>
    </div>
  );
}
