import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/theme';
import { ParticleField } from '../components/ParticleField';

export const CareerPathways: React.FC = () => {
  const frame = useCurrentFrame();

  // 4 Pathways: 150 frames each (2.5 seconds per pathway, total 600 frames)
  // Sub 1: Japan (0 - 150)
  // Sub 2: Korea (150 - 300)
  // Sub 3: Welding (300 - 450)
  // Sub 4: Caregiver (450 - 600)

  const pathways = [
    {
      start: 0,
      duration: 150,
      title: 'BAHASA JEPANG & TOKUTEI GINOU',
      sub: 'Program Persiapan Kerja: Penguasaan JFT-Basic A2, JLPT N4 & Budaya Industri Hourensou',
      tag: 'JEPANG • VOKASI & BAHASA',
      icon: '🇯🇵',
      color: '#E11D48',
      watermark: '日本',
      detail: 'Bimbingan intensif percakapan kerja (Kaiwa) & simulasi ujian resmi',
    },
    {
      start: 150,
      duration: 150,
      title: 'BAHASA KOREA & EPS-TOPIK G-TO-G',
      sub: 'Program Pemerintah G-to-G: Penempatan Sektor Manufaktur dengan Drilling UBT Komputer',
      tag: 'KOREA SELATAN • G-TO-G',
      icon: '🇰🇷',
      color: '#2563EB',
      watermark: '한국',
      detail: 'Latihan listening, reading, tes keterampilan fisik & wawancara',
    },
    {
      start: 300,
      duration: 150,
      title: 'PELATIHAN PENGELASAN VOKASI',
      sub: 'Teknik Pengelasan 3G/4G SMAW & GMAW: Bersertifikasi K3 & Standar Pengujian Visual',
      tag: 'INDUSTRI MANUFAKTUR • TEKNIK',
      icon: '⚡',
      color: '#D97706',
      watermark: 'WELD',
      detail: '70% Praktik bengkel kerja intensif plat dan pipa bersertifikat',
    },
    {
      start: 450,
      duration: 150,
      title: 'CAREGIVER & KAIGO INTERNASIONAL',
      sub: 'Pendampingan Lansia Profesional: Etika Pelayanan Medis, Body Mechanics & Komunikasi Empati',
      tag: 'KESEHATAN LANSIA • KAIGO',
      icon: '🩺',
      color: '#059669',
      watermark: 'CARE',
      detail: 'Keahlian pendampingan berstandar keselamatan global',
    },
  ];

  const currentIdx = Math.min(3, Math.floor(frame / 150));
  const active = pathways[currentIdx];
  const localFrame = frame % 150;

  const enterOpacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(localFrame, [125, 150], [1, 0], {
    extrapolateLeft: 'clamp',
  });
  const opacity = enterOpacity * exitOpacity;

  // Continuous Camera Drift
  const camZoom = interpolate(localFrame, [0, 150], [0.96, 1.05]);
  const camX = interpolate(localFrame, [0, 150], [-25, 25]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.midnightNavy,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: THEME.typography.fontFamily,
      }}
    >
      <ParticleField count={26} />

      {/* Persistent Scene Category Tag */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          color: THEME.colors.cyanGlow,
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: '0.08em',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        4 JALUR KARIER PROFESIONAL UNGGULAN
      </div>

      {/* Active Pathway Full-Screen Visual */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          opacity,
          transform: `translate(${camX}px, 0px) scale(${camZoom})`,
          zIndex: 10,
          padding: '0 120px',
        }}
      >
        {/* Massive 3D Watermark in Background */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 240,
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.04)',
            zIndex: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {active.watermark}
        </div>

        {/* Flag / Visual Focal Point */}
        <div style={{ fontSize: 96, marginBottom: 10, zIndex: 10 }}>{active.icon}</div>

        {/* Category Badge Pill */}
        <div
          style={{
            backgroundColor: active.color,
            color: '#FFFFFF',
            padding: '8px 24px',
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 16,
            marginBottom: 16,
            letterSpacing: '0.05em',
            zIndex: 10,
          }}
        >
          {active.tag}
        </div>

        {/* Program Title */}
        <h2
          style={{
            fontSize: 66,
            fontWeight: 900,
            color: THEME.colors.ivoryWhite,
            margin: '0 0 16px 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            zIndex: 10,
          }}
        >
          {active.title}
        </h2>

        {/* Subtitle Description */}
        <p
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: '#CBD5E1',
            margin: '0 0 16px 0',
            maxWidth: 1200,
            lineHeight: 1.4,
            zIndex: 10,
          }}
        >
          {active.sub}
        </p>

        {/* Highlight Detail Motif */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: THEME.colors.champagneGold,
            margin: 0,
            zIndex: 10,
          }}
        >
          ✨ {active.detail}
        </p>
      </div>

      {/* Bottom Pathway Stepper Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          display: 'flex',
          gap: 20,
          zIndex: 10,
        }}
      >
        {pathways.map((p, idx) => {
          const isCurrent = idx === currentIdx;
          return (
            <div
              key={idx}
              style={{
                width: 140,
                height: 6,
                borderRadius: 3,
                backgroundColor: isCurrent ? THEME.colors.electricTeal : 'rgba(255, 255, 255, 0.18)',
                transition: 'background-color 0.2s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
