import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-200 pt-16 pb-12 border-t border-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-primary-light/40">
          {/* Kolom 1: Profil Lembaga & Logo */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white p-1 border border-slate-200 overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.jpeg"
                  alt="Logo PT. Sejahtera Abadi Bersama"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  PT. Sejahtera Abadi Bersama
                </h3>
                <p className="text-xs text-secondary font-medium tracking-wide">
                  LEMBAGA PELATIHAN KERJA
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Membina dan membekali calon tenaga kerja dengan kompetensi vokasi terstandarisasi, keahlian bahasa asing, dan etos kerja profesional untuk meraih masa depan gemilang.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary-light/40 text-xs text-slate-200 border border-primary-light">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Terdaftar & Berizin Resmi LPK</span>
            </div>
          </div>

          {/* Kolom 2: Program Pelatihan */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Program Unggulan
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/program" className="hover:text-secondary transition-colors">
                  Bahasa Jepang & Tokutei Ginou
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-secondary transition-colors">
                  Bahasa Korea & EPS-TOPIK
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-secondary transition-colors">
                  Teknik Pengelasan (Welding 3G/4G)
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-secondary transition-colors">
                  Caregiver Internasional (Kaigo)
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-secondary transition-colors">
                  Simulasi Ujian Bahasa & Sertifikasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Tautan Cepat */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tautan Navigasi
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/profil" className="hover:text-secondary transition-colors">
                  Tentang Perusahaan
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="hover:text-secondary transition-colors">
                  Alur & Pendaftaran Peserta
                </Link>
              </li>
              <li>
                <Link href="/informasi" className="hover:text-secondary transition-colors">
                  Berita & Pengumuman Resmi
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-secondary transition-colors">
                  Hubungi Layanan Konsultasi
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-secondary transition-colors">
                  Portal Masuk Siswa & Staff
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Alamat Kantor */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontak Layanan
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>Jl. Kesejahteraan Raya No. 88, Pusat Pelatihan Kerja, Indonesia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span>Email: ratechs.id / kontak@ratechs.id</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>Senin - Jumat: 08.00 - 17.00 WIB<br />Sabtu: 08.00 - 13.00 WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Baris Bawah Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} PT. Sejahtera Abadi Bersama. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <span>Privasi & Keamanan Data</span>
            <span>Syarat & Ketentuan Pelatihan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
