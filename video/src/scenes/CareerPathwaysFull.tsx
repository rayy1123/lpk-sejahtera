import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/theme';
import { JapanLineIcon, KoreaLineIcon, WeldingLineIcon, CaregiverLineIcon } from '../components/LineIcons';

export const CareerPathwaysFull: React.FC = () => {
  const frame = useCurrentFrame();

  const pathways = [
    {
      start: 0,
      duration: 150,
      title: 'BAHASA JEPANG & TOKUTEI GINOU',
      sub: 'Penguasaan JFT-Basic A2, JLPT N4 & Budaya Kerja Industri Hourensou',
      tag: 'JEPANG • VOKASI & BAHASA',
      Icon: JapanLineIcon,
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
      Icon: KoreaLineIcon,
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
      Icon: WeldingLineIcon,
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
      Icon: CaregiverLineIcon,
      color: '#059669',
      watermark: 'CARE',
      detail: 'Keahlian pendampingan berstandar keselamatan global',
    },
  ];

  const currentIdx = Math.min(3, Math.floor(frame / 150));
  const active = pathways[currentIdx];
  const localFrame = frame % 150;

  // Seamless full-screen takeover with easing entrance & exit
  const enterOpacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const exitOpacity = interpolate(localFrame, [125, 150], [1, 0], { extrapolateLeft: 'clamp' });
  const opacity = enterOpacity * exitOpacity;

  // Dynamic Camera Drift & Dolly
  const camZoom = interpolate(localFrame, [0, 150], [0.94, 1.05]);
  const camX = interpolate(localFrame, [0, 150], [-25, 25]);

  const ActiveIcon = active.Icon;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.midnightBlack,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: THEME.typography.fontFamily,
      }}
    >
      {/* Dynamic Background Atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(16, 43, 73, 0.9) 0%, ${THEME.colors.midnightBlack} 75%)`,
        }}
      />

      {/* Persistent Category Top Tag */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          color: THEME.colors.electricCyan,
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          zIndex: 10,
        }}
      >
        PROGRAM PELATIHAN PROFESIONAL RESMI
      </div>

      {/* Program Full-Screen Scene Takeover */}
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
        {/* Massive 3D Background Shadow Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 280,
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.04)',
            zIndex: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {active.watermark}
        </div>

        {/* Large Meaningful Vector Line Icon */}
        <div
          style={{
            marginBottom: 20,
            zIndex: 10,
            padding: 24,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: `2px solid ${active.color}`,
            boxShadow: `0 0 35px ${active.color}44`,
          }}
        >
          <ActiveIcon color={active.color} size={84} strokeWidth={2.5} />
        </div>

        {/* Program Tag Badge */}
        <div
          style={{
            backgroundColor: active.color,
            color: '#FFFFFF',
            padding: '8px 26px',
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 16,
            marginBottom: 16,
            letterSpacing: '0.06em',
            zIndex: 10,
          }}
        >
          {active.tag}
        </div>

        {/* Giant Program Title */}
        <h2
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: THEME.colors.highContrastWhite,
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

      {/* Bottom Track Stepper */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
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
                backgroundColor: isCurrent ? THEME.colors.electricCyan : 'rgba(255, 255, 255, 0.18)',
                transition: 'background-color 0.2s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
