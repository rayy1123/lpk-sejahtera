'use client';

import React from 'react';
import { FILM_CONFIG } from './constants';

interface BrandFilmProps {
  frame?: number;
}

export const BrandFilm: React.FC<BrandFilmProps> = ({ frame = 0 }) => {
  const t = frame / FILM_CONFIG.fps;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: FILM_CONFIG.colors.midnightBlack,
        position: 'relative',
        overflow: 'hidden',
        color: FILM_CONFIG.colors.highContrastWhite,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      {/* Background Atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${FILM_CONFIG.colors.atmosphericBlue} 0%, ${FILM_CONFIG.colors.midnightBlack} 80%)`,
          opacity: 0.9,
        }}
      />

      {/* SCENE 01: OPENING STATEMENT (0s - 4s) */}
      {t < 4.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            opacity: Math.min(1, t / 1.2),
          }}
        >
          <span style={{ color: FILM_CONFIG.colors.electricCyan, fontWeight: 800, fontSize: 16, letterSpacing: '0.2em', marginBottom: 20 }}>
            FOUNDATIONAL CAPABILITY
          </span>
          <h1 style={{ fontSize: 94, fontWeight: 900, color: FILM_CONFIG.colors.highContrastWhite, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            KETERAMPILAN
          </h1>
          <div style={{ width: 480, height: 2, backgroundColor: FILM_CONFIG.colors.electricCyan, margin: '24px auto', boxShadow: '0 0 12px rgba(34, 211, 238, 0.8)' }} />
          <h2 style={{ fontSize: 84, fontWeight: 900, color: FILM_CONFIG.colors.electricCyan, margin: 0, letterSpacing: '-0.02em' }}>
            UNTUK MASA DEPAN
          </h2>
        </div>
      )}

      {/* SCENE 02: LOGO & BRAND IDENTITY (4s - 7s) */}
      {t >= 4.0 && t < 7.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            opacity: Math.min(1, (t - 4.0) / 0.8),
          }}
        >
          <div
            style={{
              width: 190,
              height: 190,
              backgroundColor: '#FFFFFF',
              borderRadius: 32,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginBottom: 30,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="Logo PT. Sejahtera Abadi Bersama"
              style={{ width: '82%', height: '82%', objectFit: 'contain' }}
            />
          </div>
          <span style={{ color: FILM_CONFIG.colors.electricCyan, fontWeight: 800, fontSize: 15, letterSpacing: '0.15em', marginBottom: 8 }}>
            LEMBAGA PELATIHAN KERJA RESMI
          </span>
          <h2 style={{ fontSize: 54, fontWeight: 900, color: FILM_CONFIG.colors.highContrastWhite, margin: 0 }}>
            {FILM_CONFIG.brand.name}
          </h2>
        </div>
      )}

      {/* SCENE 03: BRAND PROMISE (7s - 10s) */}
      {t >= 7.0 && t < 10.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 120px',
            opacity: Math.min(1, (t - 7.0) / 0.8),
          }}
        >
          <div style={{ fontSize: 58, fontWeight: 800, color: FILM_CONFIG.colors.highContrastWhite, lineHeight: 1.2 }}>
            Mempersiapkan Masa Depan,
          </div>
          <div style={{ width: 680, height: 2, background: `linear-gradient(90deg, transparent, ${FILM_CONFIG.colors.electricCyan}, ${FILM_CONFIG.colors.champagneGold})`, margin: '28px auto' }} />
          <div style={{ fontSize: 66, fontWeight: 900, color: FILM_CONFIG.colors.electricCyan, lineHeight: 1.2 }}>
            Membuka Peluang Dunia.
          </div>
          <p style={{ fontSize: 22, color: FILM_CONFIG.colors.subduedWhite, marginTop: 32, fontWeight: 500 }}>
            Standar Kompetensi Kerja Terarah • Kurikulum Bahasa Asing & Kejuruan Vokasi
          </p>
        </div>
      )}

      {/* SCENE 04: FOUR CAREER PATHWAYS SYSTEM (10s - 19s) */}
      {t >= 10.0 && t < 19.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 80px',
          }}
        >
          <span style={{ color: FILM_CONFIG.colors.electricCyan, fontWeight: 800, fontSize: 14, letterSpacing: '0.2em', marginBottom: 12 }}>
            CONNECTED CAREER SYSTEM
          </span>
          <h2 style={{ fontSize: 48, fontWeight: 900, margin: '0 0 50px 0' }}>
            EMPAT JALUR PELATIHAN PROFESIONAL
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, width: '100%', maxWidth: 1600 }}>
            {[
              { step: '01', country: 'JEPANG', prog: 'TOKUTEI GINOU', det: 'JFT A2 / N4 • Hourensou', icon: '🇯🇵', color: '#22D3EE' },
              { step: '02', country: 'KOREA', prog: 'EPS-TOPIK', det: 'G-TO-G • UBT Komputer', icon: '🇰🇷', color: '#38BDF8' },
              { step: '03', country: 'WELDING', prog: 'SMAW / GMAW', det: '3G / 4G • Standar K3', icon: '⚡', color: '#FBBF24' },
              { step: '04', country: 'CAREGIVER', prog: 'KAIGO', det: 'Pendampingan Lansia', icon: '🩺', color: '#34D399' }
            ].map((node, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(16, 43, 73, 0.7)',
                  border: `1.5px solid ${node.color}`,
                  borderRadius: 20,
                  padding: '32px 24px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 900, color: node.color, marginBottom: 14 }}>{node.step}</div>
                <div style={{ fontSize: 44, marginBottom: 10 }}>{node.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: node.color, letterSpacing: '0.1em' }}>{node.country}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#F8FAFC', margin: '6px 0 8px 0' }}>{node.prog}</div>
                <div style={{ fontSize: 13, color: '#CBD5E1' }}>{node.det}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCENE 05: THE PREPARATION JOURNEY (19s - 23s) */}
      {t >= 19.0 && t < 23.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 120px',
          }}
        >
          <span style={{ color: FILM_CONFIG.colors.electricCyan, fontWeight: 800, fontSize: 14, letterSpacing: '0.2em', marginBottom: 10 }}>
            PROGRESSION FRAMEWORK
          </span>
          <h2 style={{ fontSize: 48, fontWeight: 900, margin: '0 0 60px 0' }}>
            ALUR PERSIAPAN KETERAMPILAN
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, width: '100%', maxWidth: 1300 }}>
            {[
              { num: '01', title: 'BELAJAR', sub: 'Teori & Penguasaan Bahasa Asing', icon: '📖', color: '#22D3EE' },
              { num: '02', title: 'BERLATIH', sub: '70% Praktik Bengkel & Simulasi UBT', icon: '⚙️', color: '#38BDF8' },
              { num: '03', title: 'MEMPERSIAPKAN DIRI', sub: 'Disiplin Mental, Etos Kerja & Sertifikasi', icon: '🛡️', color: '#D5B779' }
            ].map((st, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(16, 43, 73, 0.75)',
                  border: `1.5px solid ${st.color}`,
                  borderRadius: 24,
                  padding: '36px 28px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 900, color: st.color, marginBottom: 12 }}>{st.num}</div>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{st.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>{st.title}</div>
                <div style={{ fontSize: 15, color: '#CBD5E1' }}>{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCENE 06: BRAND FINALE (23s - 28s) */}
      {t >= 23.0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: '#FFFFFF',
              borderRadius: 22,
              padding: 8,
              boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)',
              marginBottom: 16,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <h2 style={{ fontSize: 48, fontWeight: 900, color: FILM_CONFIG.colors.highContrastWhite, margin: '0 0 8px 0' }}>
            {FILM_CONFIG.brand.name}
          </h2>

          <p style={{ color: FILM_CONFIG.colors.champagneGold, fontWeight: 700, fontSize: 22, margin: '0 0 24px 0' }}>
            “{FILM_CONFIG.brand.tagline}”
          </p>

          <div
            style={{
              padding: '16px 42px',
              backgroundColor: FILM_CONFIG.colors.electricCyan,
              color: '#03070E',
              borderRadius: 999,
              fontWeight: 900,
              fontSize: 22,
              boxShadow: '0 0 35px rgba(34, 211, 238, 0.65)',
            }}
          >
            DAFTAR SEKARANG →
          </div>

          <p style={{ marginTop: 24, color: FILM_CONFIG.colors.mutedSteel, fontSize: 18, fontWeight: 600 }}>
            ✉️ Informasi & Pendaftaran Resmi: {FILM_CONFIG.brand.contact} ({FILM_CONFIG.brand.contactEmail})
          </p>
        </div>
      )}
    </div>
  );
};
