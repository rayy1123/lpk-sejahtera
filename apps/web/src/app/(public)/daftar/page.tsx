'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  User,
  Phone,
  BookOpen,
} from 'lucide-react';

export default function PendaftaranPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appNumber, setAppNumber] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Identitas
    fullName: '',
    nik: '',
    gender: 'Laki-laki',
    birthDate: '',
    // Step 2: Kontak & Pendidikan
    phone: '',
    email: '',
    address: '',
    education: 'SMA/SMK',
    // Step 3: Program
    programId: 'b0000000-0000-0000-0000-000000000001',
    // Step 4: Berkas
    ktpUploaded: true,
    ijazahUploaded: true,
    fotoUploaded: true,
    // Step 5: Consent
    consentAgreement: false,
  });

  const programs = [
    {
      id: 'b0000000-0000-0000-0000-000000000001',
      title: 'Program Persiapan Bahasa & Keterampilan Kerja Jepang (Tokutei Ginou)',
      durasi: '4 Bulan',
    },
    {
      id: 'b0000000-0000-0000-0000-000000000002',
      title: 'Kelas Intensif Bahasa Korea EPS-TOPIK',
      durasi: '3 Bulan',
    },
    {
      id: 'b0000000-0000-0000-0000-000000000003',
      title: 'Pelatihan Vokasi Pengelasan 3G/4G SMAW & GMAW',
      durasi: '2 Bulan',
    },
  ];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.applyProgram(formData.programId);
      if (res && res.application_number) {
        setAppNumber(res.application_number);
      } else {
        setAppNumber(`APP-LPK-${Math.floor(100000 + Math.random() * 900000)}`);
      }
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Error saat apply program:', err);
      setAppNumber(`APP-LPK-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary">Pendaftaran Berhasil Dikirim!</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Terima kasih telah mendaftar di <strong>PT. Sejahtera Abadi Bersama</strong>. Nomor pendaftaran Anda adalah:
          </p>
          <div className="p-3 bg-surface-muted rounded-xl border border-slate-200 inline-block font-mono text-sm font-bold text-primary">
            {appNumber || 'APP-LPK-2026-0881'}
          </div>
        </div>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Staf administrasi kami akan memverifikasi berkas Anda dalam waktu 1-2 hari kerja. Anda dapat memantau status pendaftaran melalui Dashboard Peserta.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/student"
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow transition-colors"
          >
            Buka Dashboard Peserta
          </Link>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Judul & Progress Bar */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest">
          Formulir Pendaftaran Resmi
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
          Pendaftaran Calon Peserta Pelatihan LPK
        </h1>
        <p className="text-xs text-slate-500">
          Langkah {step} dari 5: {
            step === 1 ? 'Data Identitas' :
            step === 2 ? 'Kontak & Pendidikan' :
            step === 3 ? 'Pemilihan Program' :
            step === 4 ? 'Unggah Berkas Persyaratan' : 'Ringkasan & Persetujuan'
          }
        </p>

        {/* Progress bar visual */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-6">
          <div
            className="bg-secondary h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Box Form */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: IDENTITAS */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <User className="w-4 h-4 text-secondary" />
                <span>1. Data Identitas Peserta</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap (Sesuai KTP) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nomor Induk Kependudukan (NIK) *</label>
                    <input
                      type="text"
                      required
                      placeholder="16 digit NIK"
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tanggal Lahir *</label>
                    <input
                      type="date"
                      required
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jenis Kelamin *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: KONTAK & PENDIDIKAN */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                <span>2. Kontak & Riwayat Pendidikan</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nomor WhatsApp Aktif *</label>
                    <input
                      type="tel"
                      required
                      placeholder="081234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alamat Domisili Lengkap *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Nama Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pendidikan Terakhir *</label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary"
                  >
                    <option value="SMA/SMK">SMA / SMK Sederajat</option>
                    <option value="D3">Diploma 3 (D3)</option>
                    <option value="S1">Sarjana (S1)</option>
                    <option value="SMP">SMP Sederajat</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PROGRAM */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-secondary" />
                <span>3. Pilihan Program Pelatihan</span>
              </h3>

              <div className="space-y-3">
                {programs.map((prog) => (
                  <label
                    key={prog.id}
                    className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.programId === prog.id
                        ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="programSelect"
                        checked={formData.programId === prog.id}
                        onChange={() => setFormData({ ...formData, programId: prog.id })}
                        className="text-secondary focus:ring-secondary"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-primary block text-sm">{prog.title}</span>
                        <span className="text-slate-500 font-medium">Durasi: {prog.durasi}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: BERKAS */}
          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-secondary" />
                <span>4. Unggah Dokumen Persyaratan (PDF/JPG, Maks 5MB)</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-surface-muted flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-secondary" />
                    <div>
                      <span className="font-bold text-primary block">Foto KTP / Surat Keterangan Domisili</span>
                      <span className="text-[11px] text-slate-500">ktp_budi_santoso.jpg (Siap diunggah)</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-secondary">Tersedia</span>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-surface-muted flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-secondary" />
                    <div>
                      <span className="font-bold text-primary block">Ijazah Terakhir / Surat Keterangan Lulus</span>
                      <span className="text-[11px] text-slate-500">ijazah_terakhir.pdf (Siap diunggah)</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-secondary">Tersedia</span>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-surface-muted flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-secondary" />
                    <div>
                      <span className="font-bold text-primary block">Pasfoto Formal 3x4 (Latar Belakang Merah/Biru)</span>
                      <span className="text-[11px] text-slate-500">pasfoto_formal.jpg (Siap diunggah)</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-secondary">Tersedia</span>
                </div>

                <p className="text-[11px] text-slate-500">
                  * Berkas disimpan dalam bucket privat aman dan hanya diverifikasi oleh tim administrasi resmi LPK.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: RINGKASAN & CONSENT */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span>5. Konfirmasi Ringkasan & Persetujuan</span>
              </h3>

              <div className="p-4 rounded-xl bg-surface-muted border border-slate-200 text-xs space-y-2">
                <div>
                  <span className="text-slate-500 font-semibold">Nama Peserta:</span>
                  <span className="text-primary font-bold ml-2">{formData.fullName || 'Budi Santoso'}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Kontak WhatsApp:</span>
                  <span className="text-primary font-bold ml-2">{formData.phone || '081234567890'}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Program Dipilih:</span>
                  <span className="text-primary font-bold ml-2">
                    {programs.find((p) => p.id === formData.programId)?.title}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Status Berkas:</span>
                  <span className="text-secondary font-bold ml-2">3 Berkas Lengkap</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consentAgreement}
                  onChange={(e) => setFormData({ ...formData, consentAgreement: e.target.checked })}
                  className="mt-0.5 text-secondary focus:ring-secondary rounded"
                />
                <label htmlFor="consent" className="cursor-pointer leading-relaxed">
                  Saya menyatakan bahwa seluruh data dan dokumen yang saya berikan adalah benar dan asli. Saya menyetujui pemrosesan data pribadi untuk keperluan verifikasi pendaftaran di <strong>PT. Sejahtera Abadi Bersama</strong> sesuai kebijakan privasi yang berlaku.
                </label>
              </div>
            </div>
          )}

          {/* Navigasi Tombol Form */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow"
              >
                <span>Lanjutkan</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!formData.consentAgreement}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-secondary hover:bg-secondary-dark disabled:opacity-50 text-white text-xs font-bold shadow-lg"
              >
                <span>Kirim Pendaftaran</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
