'use client';

import React, { useState } from 'react';
import { MapPin, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function KontakPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest">
          Hubungi Kami
        </span>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Layanan Konsultasi & Informasi LPK
        </h1>
        <p className="text-sm text-slate-600">
          Tim penasihat pelatihan kami siap menjawab pertanyaan seputar program, persyaratan, dan alur pendaftaran.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Kontak & Kantor */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-8">
          <h2 className="text-xl font-bold text-primary">Kantor Pusat LPK</h2>

          <div className="space-y-6 text-xs text-slate-600">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-primary block text-sm">Alamat Lembaga</span>
                <p className="leading-relaxed">
                  Jl. Kesejahteraan Raya No. 88, Pusat Pelatihan Kerja, Indonesia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-primary block text-sm">Email Resmi Lembaga</span>
                <p>ratechs.id (kontak@ratechs.id / info@ratechs.id)</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-primary block text-sm">Jam Operasional Pelayanan</span>
                <p>Senin - Jumat: 08.00 - 17.00 WIB</p>
                <p>Sabtu: 08.00 - 13.00 WIB (Minggu Libur)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulir Pertanyaan */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
          {sent ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-primary">Pesan Anda Berhasil Terkirim!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Staf representatif LPK Sejahtera Abadi akan segera menghubungi Anda kembali melalui Email resmi.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-bold text-primary">Kirimkan Pertanyaan atau Konsultasi</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@ratechs.id"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-slate-700 mb-1">Program yang Diminati</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary">
                  <option>Pelatihan Bahasa Jepang & Tokutei Ginou</option>
                  <option>Pelatihan Bahasa Korea & EPS-TOPIK</option>
                  <option>Teknik Pengelasan (Welding 3G/4G)</option>
                  <option>Caregiver & Kaigo</option>
                  <option>Pertanyaan Umum Lainnya</option>
                </select>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-slate-700 mb-1">Pesan atau Pertanyaan Anda *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pertanyaan Anda mengenai jadwal, syarat, atau alur pendaftaran..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-md transition-all"
              >
                <span>Kirim Pesan</span>
                <Send className="w-4 h-4 text-secondary" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
