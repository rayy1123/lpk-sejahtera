import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Award,
  Globe2,
  Users2,
  CalendarCheck,
  ShieldCheck,
  FileText,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const categories = [
    {
      title: 'Pelatihan Bahasa Jepang & Magang',
      desc: 'Penguasaan JLPT/JFT dan etos kerja industri untuk persiapan Tokutei Ginou dan Magang.',
      icon: Globe2,
      count: '2 Program Aktif',
      href: '/program?category=bahasa-jepang-magang',
    },
    {
      title: 'Pelatihan Bahasa Korea & EPS-TOPIK',
      desc: 'Kurikulum intensif persiapan ujian G to G penempatan sektor manufaktur dan perikanan Korea Selatan.',
      icon: BookOpen,
      count: '1 Program Aktif',
      href: '/program?category=bahasa-korea-eps-topik',
    },
    {
      title: 'Teknik Pengelasan (Welding 3G/4G)',
      desc: 'Praktik pengelasan SMAW & GMAW terstandarisasi untuk mencetak teknisi las bersertifikat.',
      icon: Award,
      count: '1 Program Aktif',
      href: '/program?category=teknik-manufaktur-pengelasan',
    },
    {
      title: 'Caregiver & Keperawatan Lansia (Kaigo)',
      desc: 'Keahlian pendampingan lansia berstandar Jepang dengan etika perawatan internasional.',
      icon: Users2,
      count: '1 Program Aktif',
      href: '/program?category=caregiver-hospitality',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Pendaftaran Akun',
      desc: 'Isi identitas diri dasar calon peserta dan buat akun portal secara mandiri.',
    },
    {
      step: '02',
      title: 'Pilih Program & Unggah Berkas',
      desc: 'Pilih jurusan pelatihan dan unggah dokumen persyaratan (KTP, Ijazah, Surat Keterangan Sehat).',
    },
    {
      step: '03',
      title: 'Verifikasi Administrasi',
      desc: 'Tim pengelola LPK memeriksa kelengkapan dan keabsahan berkas yang diunggah.',
    },
    {
      step: '04',
      title: 'Wawancara & Tes Penempatan',
      desc: 'Pengukuran kemampuan awal dan wawancara komitmen motivasi belajar.',
    },
    {
      step: '05',
      title: 'Mulai Pelatihan Terstruktur',
      desc: 'Mengikuti kelas teori, laboratorium bahasa, dan praktik bengkel kerja hingga lulus uji kompetensi.',
    },
  ];

  const faqs = [
    {
      q: 'Apakah PT. Sejahtera Abadi Bersama berizin resmi?',
      a: 'Ya, lembaga ini beroperasi sebagai Lembaga Pelatihan Kerja (LPK) resmi yang tercatat di Dinas Tenaga Kerja dengan kurikulum berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI).',
    },
    {
      q: 'Berapa lama durasi setiap program pelatihan?',
      a: 'Durasi berkisar antara 2 hingga 4 bulan (240 hingga 480 jam pelatihan), tergantung pada bidang keahlian dan tingkat penguasaan bahasa yang ditargetkan.',
    },
    {
      q: 'Apakah pemula tanpa latar belakang bahasa asing bisa mendaftar?',
      a: 'Bisa. Seluruh kelas bahasa (Jepang dan Korea) dimulai dari tingkat dasar (pengenalan huruf, tata bahasa pemula, dan kosakata sehari-hari) dengan bimbingan intensif pengajar berpengalaman.',
    },
    {
      q: 'Bagaimana keamanan dokumen identitas yang saya unggah?',
      a: 'Dokumen kependudukan Anda disimpan dalam penyimpanan privat terenkripsi (private storage) dan hanya dapat diakses oleh staf administrasi yang berwenang untuk keperluan verifikasi.',
    },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-primary/5 via-white to-surface-muted pt-16 pb-20 overflow-hidden border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Teks Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Penerimaan Peserta Gelombang 2026/2027 Dibuka</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.15]">
                Siapkan Keterampilanmu, Raih Peluang Karier Masa Depan.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Lembaga Pelatihan Kerja profesional yang membekali calon tenaga kerja dengan kompetensi vokasi terstandarisasi dan penguasaan bahasa asing untuk siap bersaing di pasar kerja domestik maupun global.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/program"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white text-base font-semibold shadow-md transition-all hover:shadow-lg"
                >
                  <span>Jelajahi Program</span>
                  <ArrowRight className="w-5 h-5 text-secondary" />
                </Link>
                <Link
                  href="/daftar"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white text-base font-semibold shadow-md transition-all hover:shadow-lg"
                >
                  <span>Daftar Sekarang</span>
                </Link>
                <a
                  href="/promo-video.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-secondary text-secondary hover:bg-secondary/10 text-base font-semibold shadow-sm transition-all"
                >
                  <span>▶ Tonton Video Animasi</span>
                </a>
              </div>

              {/* Legalitas & Kepercayaan */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>Legalitas LPK Terverifikasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Instruktur Berpengalaman</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-secondary" />
                  <span>Sertifikat Uji Kompetensi</span>
                </div>
              </div>
            </div>

            {/* Kartu Profil / Logo Showcase Hero */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-slate-200/90 text-center space-y-6">
                <div className="mx-auto w-28 h-28 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shadow-inner">
                  <Image
                    src="/logo.jpeg"
                    alt="Logo PT. Sejahtera Abadi Bersama"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary">
                    PT. Sejahtera Abadi Bersama
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Pusat Pembinaan & Pelatihan Kerja Terpadu
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-surface-muted border border-slate-200/60">
                    <span className="text-xs text-slate-500 block">Fokus Vokasi</span>
                    <span className="text-sm font-bold text-primary">Teknik & Bahasa</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-muted border border-slate-200/60">
                    <span className="text-xs text-slate-500 block">Metode Belajar</span>
                    <span className="text-sm font-bold text-primary">70% Praktik</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-muted border border-slate-200/60">
                    <span className="text-xs text-slate-500 block">Kualifikasi Bahasa</span>
                    <span className="text-sm font-bold text-primary">N4 / EPS-TOPIK</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-muted border border-slate-200/60">
                    <span className="text-xs text-slate-500 block">Sertifikasi</span>
                    <span className="text-sm font-bold text-primary">Resmi BNSP/LPK</span>
                  </div>
                </div>

                <Link
                  href="/profil"
                  className="block w-full py-2.5 text-center text-xs font-semibold text-secondary hover:text-secondary-dark border border-secondary/30 rounded-lg hover:bg-secondary/5 transition-colors"
                >
                  Pelajari Profil Lembaga Lebih Lanjut →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KATEGORI & PROGRAM UNGGULAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest">
            Bidang Pelatihan
          </span>
          <h2 className="text-3xl font-bold text-primary tracking-tight">
            Program Pelatihan Kerja & Bahasa Pilihan
          </h2>
          <p className="text-sm text-slate-600">
            Kurikulum dirancang selaras dengan standar kompetensi kerja nasional dan tuntutan kualifikasi industri luar negeri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-base font-bold text-primary leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">{cat.count}</span>
                  <Link
                    href={cat.href}
                    className="text-xs font-bold text-secondary hover:text-secondary-dark flex items-center gap-1"
                  >
                    <span>Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ALUR PENDAFTARAN */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              Langkah Bergabung
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Alur Pendaftaran Calon Peserta
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Proses pendaftaran transparan, jelas, dan didampingi penuh oleh staf administrasi profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-primary-light/40 border border-primary-light flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-black text-secondary">{s.step}</span>
                  <h4 className="text-sm font-bold text-white leading-snug">{s.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/daftar"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white text-sm font-bold shadow-lg transition-all"
            >
              <span>Mulai Pendaftaran Online Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. KEUNGGULAN TERVERIFIKASI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              Mengapa Memilih Kami
            </span>
            <h2 className="text-3xl font-bold text-primary tracking-tight">
              Kualitas Pelatihan dengan Komitmen Kredibilitas Nyata
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kami tidak mengandalkan klaim kosong. Fokus kami adalah membekali Anda dengan disiplin mental, penguasaan bahasa riil, dan keahlian teknis yang siap diuji di dunia kerja.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-primary">Instruktur Praktisi & Native Speaker</h4>
                  <p className="text-xs text-slate-600">Pengajar memiliki pengalaman kerja industri dan sertifikasi N2/N1 serta penutur asli untuk aksen alami.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-primary">Fasilitas Bengkel & Lab Komputer Lengkap</h4>
                  <p className="text-xs text-slate-600">Peralatan las standar industri dan sistem simulasi ujian komputer (UBT) untuk tes bahasa EPS-TOPIK.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-primary">Keamanan Berkas & Privasi Calon Peserta</h4>
                  <p className="text-xs text-slate-600">Seluruh dokumen pribadi disimpan di cloud storage berenkripsi, tidak dipublikasikan ke sembarang pihak.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-3xl font-extrabold text-primary">480+</span>
              <span className="text-xs text-slate-500 block">Jam Pelatihan Intensif</span>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-3xl font-extrabold text-secondary">70%</span>
              <span className="text-xs text-slate-500 block">Porsi Praktik Mandiri</span>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-3xl font-extrabold text-secondary">100%</span>
              <span className="text-xs text-slate-500 block">Kurikulum Sesuai Standar</span>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-3xl font-extrabold text-primary">Resmi</span>
              <span className="text-xs text-slate-500 block">Terdaftar Dinas Tenaga Kerja</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest">
            Pertanyaan Umum
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-2"
            >
              <h4 className="text-sm font-bold text-primary flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-600 pl-6.5 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-light p-10 sm:p-14 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto leading-tight">
            Ambil Langkah Pertama Menuju Masa Depan Mandiri dan Sejahtera.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Pendaftaran gelombang baru kini dibuka. Konsultasikan pilihan minat dan kualifikasi Anda bersama tim penasihat LPK kami.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/daftar"
              className="px-7 py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-sm shadow-md transition-all"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/kontak"
              className="px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              Hubungi Layanan Konsultasi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
