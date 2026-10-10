'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Program } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { Search, Clock, Users, ArrowRight, BookOpen, Filter } from 'lucide-react';

export default function ProgramKatalogPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function loadPrograms() {
      setLoading(true);
      try {
        const data = await api.getPrograms();
        setPrograms(data || []);
      } catch (err) {
        console.error('Gagal memuat program:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPrograms();
  }, []);

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === 'all' ||
      (selectedCategory === 'jepang' && p.slug.includes('jepang')) ||
      (selectedCategory === 'korea' && p.slug.includes('korea')) ||
      (selectedCategory === 'las' && p.slug.includes('pengelasan'));
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest">
          Katalog Pelatihan
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
          Pilihan Program Pelatihan Kerja & Bahasa
        </h1>
        <p className="text-sm text-slate-600">
          Tingkatkan keterampilan teknis dan bahasa Anda bersama instruktur berpengalaman berstandar kompetensi resmi.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama program atau keterampilan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {[
            { id: 'all', label: 'Semua Bidang' },
            { id: 'jepang', label: 'Bahasa Jepang' },
            { id: 'korea', label: 'Bahasa Korea' },
            { id: 'las', label: 'Teknik Pengelasan' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-muted text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* List Program Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse space-y-4">
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-2/3"></div>
              <div className="h-10 bg-slate-100 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredPrograms.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4 max-w-lg mx-auto">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-primary">Program Belum Tersedia</h3>
          <p className="text-xs text-slate-500">
            Tidak ada program pelatihan yang cocok dengan kata kunci atau filter pencarian Anda. Silakan coba filter lain.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="text-xs font-semibold text-secondary hover:underline"
          >
            Reset Filter Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-md">
                    {prog.category_name || 'Pelatihan Vokasi'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Kuota: {prog.quota}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-primary leading-snug hover:text-secondary transition-colors">
                  <Link href={`/program/${prog.slug}`}>{prog.title}</Link>
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{prog.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Investasi Pelatihan</span>
                  <span className="text-sm font-extrabold text-primary">
                    {formatRupiah(prog.price)}
                  </span>
                </div>
                <Link
                  href={`/program/${prog.slug}`}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary hover:bg-primary-light text-white text-xs font-bold transition-colors"
                >
                  <span>Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
