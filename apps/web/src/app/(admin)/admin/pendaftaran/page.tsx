'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  FileCheck,
  Eye,
  AlertCircle,
  Clock,
} from 'lucide-react';

interface ApplicationItem {
  id: string;
  appNumber: string;
  name: string;
  phone: string;
  program: string;
  date: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  docs: string[];
}

export default function AdminPendaftaranPage() {
  const [apps, setApps] = useState<ApplicationItem[]>([
    {
      id: 'app-1',
      appNumber: 'APP-LPK-2026-001',
      name: 'Ahmad Fauzi',
      phone: 'ahmad@ratechs.id',
      program: 'Perhotelan & Front Desk',
      date: '10 Oktober 2026',
      status: 'submitted',
      docs: ['KTP', 'Ijazah SMK', 'Pasfoto'],
    },
    {
      id: 'app-2',
      appNumber: 'APP-LPK-2026-002',
      name: 'Siti Rahmawati',
      phone: 'siti@ratechs.id',
      program: 'Pengasuh Lansia / Caregiver',
      date: '09 Oktober 2026',
      status: 'under_review',
      docs: ['KTP', 'Ijazah SMA', 'Pasfoto'],
    },
    {
      id: 'app-3',
      appNumber: 'APP-LPK-2026-003',
      name: 'Rudi Hartono',
      phone: 'rudi@ratechs.id',
      program: 'Housekeeping / Maid',
      date: '08 Oktober 2026',
      status: 'approved',
      docs: ['KTP', 'Ijazah SMK', 'Pasfoto'],
    },
  ]);

  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    async function loadData() {
      try {
        const liveApps = await api.getAdminApplications();
        if (liveApps && liveApps.length > 0) {
          setApps(
            liveApps.map((la: any) => ({
              id: la.id,
              appNumber: la.application_number || 'APP-2026-001',
              name: la.student_name || 'Peserta Terdaftar',
              phone: 'peserta@ratechs.id',
              program: la.program_title || 'Pelatihan Vokasi',
              date: '10 Oktober 2026',
              status: la.status || 'submitted',
              docs: ['KTP', 'Ijazah', 'Pasfoto'],
            }))
          );
        }
      } catch (err) {
        console.warn('Gagal memuat pendaftaran dari API:', err);
      }
    }
    loadData();
  }, []);

  const handleUpdateStatus = async (status: 'approved' | 'rejected') => {
    if (!selectedApp) return;

    try {
      await api.reviewApplication(selectedApp.id, status, adminNotes);
    } catch (e) {
      console.warn('Gagal update status via API:', e);
    }

    setApps(
      apps.map((a) => (a.id === selectedApp.id ? { ...a, status } : a))
    );
    setSelectedApp(null);
    setAdminNotes('');
  };

  const filteredApps = apps.filter((a) => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <span className="text-xs font-bold text-secondary uppercase tracking-wider">
          Verifikasi & Seleksi
        </span>
        <h1 className="text-2xl font-extrabold text-primary">
          Manajemen Pendaftaran Peserta
        </h1>
        <p className="text-xs text-slate-500">
          Tinjau berkas identitas dan tentukan kelayakan peserta untuk alokasi kelas pelatihan.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'Semua Status' },
          { id: 'submitted', label: 'Menunggu Review' },
          { id: 'under_review', label: 'Sedang Diverifikasi' },
          { id: 'approved', label: 'Disetujui' },
          { id: 'rejected', label: 'Ditolak' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === tab.id
                ? 'bg-primary text-white'
                : 'bg-surface-muted text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabel Data Pendaftaran */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3.5 px-5">No. Pendaftaran</th>
                <th className="py-3.5 px-5">Nama Peserta</th>
                <th className="py-3.5 px-5">Program</th>
                <th className="py-3.5 px-5">Tanggal Masuk</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredApps.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-primary">
                    {a.appNumber}
                  </td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-primary block">{a.name}</span>
                    <span className="text-[11px] text-slate-400">{a.phone}</span>
                  </td>
                  <td className="py-4 px-5 max-w-xs truncate text-slate-600">
                    {a.program}
                  </td>
                  <td className="py-4 px-5 text-slate-500">
                    {a.date}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        a.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : a.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {a.status === 'submitted'
                        ? 'Menunggu Review'
                        : a.status === 'under_review'
                        ? 'Dalam Proses'
                        : a.status === 'approved'
                        ? 'Disetujui'
                        : 'Ditolak'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setSelectedApp(a)}
                      className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary-dark text-white text-[11px] font-bold transition-all shadow-xs"
                    >
                      Tinjau & Validasi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog Review Pendaftaran */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                {selectedApp.appNumber}
              </span>
              <h3 className="text-lg font-bold text-primary">
                Peninjauan Berkas: {selectedApp.name}
              </h3>
              <p className="text-xs text-slate-500">{selectedApp.program}</p>
            </div>

            {/* List Berkas */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-700 block">Dokumen Terunggah:</span>
              <div className="p-3 bg-surface-muted rounded-xl border border-slate-200/80 space-y-2">
                {selectedApp.docs.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-secondary" />
                      <span>{doc}</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">Lengkap</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Catatan Admin */}
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-700 block">Catatan Verifikator (Admin Notes):</label>
              <textarea
                rows={3}
                placeholder="Tuliskan catatan hasil verifikasi berkas atau instruksi wawancara..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary text-xs"
              ></textarea>
            </div>

            {/* Tombol Aksi */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus('rejected')}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                Tolak Pendaftaran
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus('approved')}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow"
              >
                Setujui Pendaftaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
