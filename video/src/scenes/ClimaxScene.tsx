import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/theme';
import { JapanLineIcon, KoreaLineIcon, WeldingLineIcon, CaregiverLineIcon } from '../components/LineIcons';

export const ClimaxScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Rapid 4-beat montage: 45 frames each (0.75s each, total 180 frames / 3s)
  const beatIdx = Math.min(3, Math.floor(frame / 45));
  const localF = frame % 45;

  const montageItems = [
    { title: 'JEPANG', sub: 'TOKUTEI GINOU • JFT A2', Icon: JapanLineIcon, color: '#E11D48' },
    { title: 'KOREA', sub: 'EPS-TOPIK • G-TO-G', Icon: KoreaLineIcon, color: '#2563EB' },
    { title: 'PENGELASAN', sub: 'WELDING • SMAW/GMAW', Icon: WeldingLineIcon, color: '#D97706' },
    { title: 'CAREGIVER', sub: 'KAIGO • LANSIA', Icon: CaregiverLineIcon, color: '#059669' },
  ];

  const current = montageItems[beatIdx];
  const CurrentIcon = current.Icon;

  const sc = interpolate(localF, [0, 45], [0.94, 1.08]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.midnightBlack,
        background: `radial-gradient(circle at 50% 50%, rgba(16, 43, 73, 0.95) 0%, ${THEME.colors.midnightBlack} 75%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: THEME.typography.fontFamily,
      }}
    >
      {/* Dynamic Flashing Luminous Rings */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 700,
          height: 700,
          transform: 'translate(-50%, -50%)',
          border: `2px solid ${current.color}`,
          borderRadius: '50%',
          opacity: 0.35,
          boxShadow: `0 0 50px ${current.color}44`,
        }}
      />

      <div
        style={{
          transform: `scale(${sc})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <CurrentIcon color={current.color} size={90} strokeWidth={2.5} />
        </div>

        <h2
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: THEME.colors.highContrastWhite,
            letterSpacing: '-0.02em',
            margin: '0 0 16px 0',
            lineHeight: 1,
          }}
        >
          {current.title}
        </h2>

        <p
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: THEME.colors.electricCyan,
            margin: 0,
            letterSpacing: '0.08em',
          }}
        >
          {current.sub}
        </p>
      </div>
    </div>
  );
};
