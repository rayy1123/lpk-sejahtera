import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-surface-muted flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
          Error 403 • Akses Ditolak
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
          Anda Tidak Memiliki Izin
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          Akun Anda tidak memiliki hak akses administratif atau wewenang yang diperlukan untuk membuka halaman ini.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
        <Link
          href="/login"
          className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-white transition-all"
        >
          Ganti Akun Login
        </Link>
      </div>
    </div>
  );
}
