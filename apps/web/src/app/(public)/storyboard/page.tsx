import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, ShieldCheck, Film } from 'lucide-react';

export default function StoryboardPage() {
  const scenes = [
    {
      sceneNum: 'SCENE 01',
      time: '00:00 – 00:04',
      frames: 'Frame 0 – 239',
      title: 'Opening Statement',
      headline: 'KETERAMPILAN UNTUK MASA DEPAN',
      desc: 'Layar navy gelap, garis cahaya cyan tipis teriluminasi progresif, tipografi blur masuk menjadi tajam ala peluncuran produk teknologi modern.',
      bg: 'radial-gradient(circle at 50% 50%, #0B1B2F 0%, #03070E 80%)',
      accentColor: '#22D3EE',
    },
    {
      sceneNum: 'SCENE 02',
      time: '00:04 – 00:07',
      frames: 'Frame 240 – 419',
      title: 'Logo & Brand Identity',
      headline: 'PT. SEJAHTERA ABADI BERSAMA',
      desc: 'Simbol resmi LPK Abadi muncul dengan aura volumetrik terkendali dan sapuan cahaya directional sweep. Proporsi logo 100% akurat.',
      bg: 'radial-gradient(circle at 50% 50%, #0B1B2F 0%, #03070E 80%)',
      accentColor: '#22D3EE',
    },
    {
      sceneNum: 'SCENE 03',
      time: '00:07 – 00:10',
      frames: 'Frame 420 – 599',
      title: 'Brand Promise',
      headline: 'Mempersiapkan Masa Depan, Membuka Peluang Dunia.',
      desc: 'Komposisi seimbang dengan garis pemandu vektor cahaya memandu pandangan penonton menuju sistem diagram adegan berikutnya.',
      bg: 'radial-gradient(circle at 45% 55%, #0B1B2F 0%, #03070E 80%)',
      accentColor: '#22D3EE',
    },
    {
      sceneNum: 'SCENE 04',
      time: '00:10 – 00:19',
      frames: 'Frame 600 – 1139',
      title: 'Four Career Pathways System',
      headline: '01. JEPANG • 02. KOREA • 03. WELDING • 04. CAREGIVER',
      desc: 'Sistem diagram garis terhubung SVG. Empat panel proses aktif berurutan dengan ikon garis vektor, detail program, dan pencahayaan kontras.',
      bg: 'radial-gradient(circle at 50% 50%, #0B1B2F 0%, #03070E 80%)',
      accentColor: '#38BDF8',
    },
    {
      sceneNum: 'SCENE 05',
      time: '00:19 – 00:23',
      frames: 'Frame 1140 – 1379',
      title: 'The Preparation Journey',
      headline: 'BELAJAR → BERLATIH → MEMPERSIAPKAN DIRI',
      desc: 'Diagram alur sistem 3 tahap dengan garis terhubung dinamis dan ikon vektor, menegaskan dedikasi persiapan keterampilan vokasi nyata.',
      bg: 'radial-gradient(circle at 50% 50%, #0B1B2F 0%, #03070E 80%)',
      accentColor: '#D5B779',
    },
    {
      sceneNum: 'SCENE 06',
      time: '00:23 – 00:28',
      frames: 'Frame 1380 – 1679',
      title: 'Brand Finale & Climax',
      headline: 'PERSIAPKAN LANGKAHMU. BUKA PELUANG MASA DEPAN.',
      desc: 'Komposisi penutup mantap dengan logo resmi, tagline, tombol CTA berpulsasi lembut, dan kanal informasi resmi ratechs.id (tanpa nomor telepon).',
      bg: 'radial-gradient(circle at 50% 50%, #0B1B2F 0%, #03070E 80%)',
      accentColor: '#22D3EE',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>Minimalist Tech Motion Graphics Storyboard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-primary">
            Storyboard & System Architecture (28 Detik)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            PT. Sejahtera Abadi Bersama • Composition ID: LpkAbadiCommercial • 1920 × 1080 • 60 FPS • 1.680 Frame • ratechs.id
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/promo-video.html"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white text-xs font-bold shadow transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Buka Pemutar Video 60 FPS</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>

      {/* Grid 6 Adegan Storyboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenes.map((s, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Visual Box */}
              <div
                style={{ background: s.bg }}
                className="aspect-video w-full p-6 flex flex-col justify-between text-white relative overflow-hidden"
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs">
                    {s.sceneNum} • {s.time}
                  </span>
                  <span className="font-mono" style={{ color: s.accentColor }}>
                    {s.frames}
                  </span>
                </div>

                <div className="text-center py-4">
                  <span className="text-sm font-extrabold tracking-tight text-white drop-shadow-md block">
                    {s.headline}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>1920 × 1080 • 60 FPS</span>
                  <span>ratechs.id</span>
                </div>
              </div>

              {/* Deskripsi */}
              <div className="p-5 space-y-2">
                <h3 className="text-sm font-bold text-primary flex items-center justify-between">
                  <span>{s.title}</span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{s.time}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Link
                href="/promo-video.html"
                target="_blank"
                className="block w-full py-2 text-center rounded-lg bg-surface-muted hover:bg-slate-100 text-primary text-xs font-bold border border-slate-200 transition-colors"
              >
                Tinjau Adegan di Pemutar →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-6 rounded-2xl bg-primary text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>Spesifikasi Remotion & Motion Pipeline Terverifikasi</span>
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            Framework: Remotion + React TS • Komposisi: LpkAbadiCommercial • Output: MP4 H.264 • Audio: Synthesizer Prosedural • Kontak: ratechs.id
          </p>
        </div>
        <Link
          href="/promo-video.html"
          target="_blank"
          className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white text-xs font-bold transition-all shrink-0"
        >
          Putar & Unduh Video
        </Link>
      </div>
    </div>
  );
}
