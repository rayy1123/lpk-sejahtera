import React from 'react';
import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-muted flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-secondary/10 text-secondary flex items-center justify-center shadow-inner">
        <FileQuestion className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest">
          Error 404 • Halaman Tidak Ditemukan
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
          Halaman yang Anda Cari Tidak Ada
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          Tautan mungkin rusak, program telah berakhir, atau halaman telah dipindahkan ke alamat lain.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-secondary" />
          <span>Kembali ke Beranda LPK</span>
        </Link>
      </div>
    </div>
  );
}
