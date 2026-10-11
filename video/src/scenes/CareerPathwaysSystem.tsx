import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { JapanLineIcon, KoreaLineIcon, WeldingLineIcon, CaregiverLineIcon } from '../components/LineIcons';

export const CareerPathwaysSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Active Node index based on 135 frames per step
  const activeIdx = Math.min(3, Math.floor(frame / 135));

  // Connecting SVG Line Draw Progress across the nodes
  const totalLineProgress = interpolate(frame, [0, 500], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const nodes = [
    {
      step: '01',
      country: 'JEPANG',
      program: 'TOKUTEI GINOU',
      details: 'JFT A2 / N4 • Budaya Hourensou',
      Icon: JapanLineIcon,
      accent: '#22D3EE',
    },
    {
      step: '02',
      country: 'KOREA',
      program: 'EPS-TOPIK',
      details: 'PROGRAM G-TO-G • UBT Komputer',
      Icon: KoreaLineIcon,
      accent: '#38BDF8',
    },
    {
      step: '03',
      country: 'WELDING',
      program: 'SMAW / GMAW',
      details: '3G / 4G • Standar K3 Bengkel',
      Icon: WeldingLineIcon,
      accent: '#FBBF24',
    },
    {
      step: '04',
      country: 'CAREGIVER',
      program: 'KAIGO',
      details: 'Pendampingan Lansia Profesional',
      Icon: CaregiverLineIcon,
      accent: '#34D399',
    },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.midnightBlack,
        background: `radial-gradient(circle at 50% 50%, ${THEME.colors.atmosphericBlue} 0%, ${THEME.colors.midnightBlack} 80%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: THEME.typography.fontFamily,
        padding: '0 80px',
      }}
    >
      {/* Scene Header */}
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: '0.2em',
            color: THEME.colors.electricCyan,
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 8,
          }}
        >
          CONNECTED CAREER SYSTEM
        </span>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: THEME.colors.highContrastWhite,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          EMPAT JALUR PELATIHAN PROFESIONAL
        </h2>
      </div>

      {/* Connected 4-Node Sequential System */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1600,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 28,
          zIndex: 10,
        }}
      >
        {/* Animated Connecting SVG Light Line behind nodes */}
        <div
          style={{
            position: 'absolute',
            top: 75,
            left: '10%',
            right: '10%',
            height: 2,
            backgroundColor: THEME.colors.mutedLine,
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: `${totalLineProgress}%`,
              height: 2,
              backgroundColor: THEME.colors.activeLine,
              boxShadow: '0 0 10px rgba(34, 211, 238, 0.9)',
              borderRadius: 1,
            }}
          />
        </div>

        {nodes.map((node, i) => {
          const isActive = i <= activeIdx;
          const isCurrent = i === activeIdx;
          const NodeIcon = node.Icon;

          return (
            <div
              key={i}
              style={{
                position: 'relative',
                zIndex: 2,
                backgroundColor: isCurrent ? 'rgba(16, 43, 73, 0.85)' : isActive ? 'rgba(11, 27, 47, 0.6)' : 'rgba(5, 15, 26, 0.45)',
                border: `1.5px solid ${isCurrent ? node.accent : isActive ? 'rgba(34, 211, 238, 0.35)' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: 20,
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: isCurrent ? `0 15px 40px -10px rgba(34, 211, 238, 0.35)` : 'none',
                transform: isCurrent ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Step Marker Circle */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: isCurrent ? node.accent : isActive ? 'rgba(34, 211, 238, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCurrent ? '#040A12' : '#F8FAFC',
                  fontWeight: 900,
                  fontSize: 16,
                  marginBottom: 20,
                  boxShadow: isCurrent ? `0 0 16px ${node.accent}` : 'none',
                }}
              >
                {node.step}
              </div>

              {/* Vector Line Icon */}
              <div style={{ marginBottom: 20, opacity: isActive ? 1 : 0.35 }}>
                <NodeIcon color={isCurrent ? node.accent : isActive ? THEME.colors.electricCyan : '#64748B'} size={48} />
              </div>

              {/* Country / Pathway Label */}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: isCurrent ? node.accent : isActive ? THEME.colors.cyanAccent : '#64748B',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                {node.country}
              </span>

              {/* Program Name */}
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: isCurrent ? THEME.colors.highContrastWhite : isActive ? '#E2E8F0' : '#64748B',
                  margin: '0 0 10px 0',
                  lineHeight: 1.2,
                }}
              >
                {node.program}
              </h3>

              {/* Details Tag */}
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: isCurrent ? '#CBD5E1' : '#64748B',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {node.details}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
