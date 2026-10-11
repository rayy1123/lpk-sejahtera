import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { StudyLineIcon, PracticeLineIcon, PrepareLineIcon } from '../components/LineIcons';

export const PreparationJourneyDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sequential 3 steps: 80 frames each (0 - 80, 80 - 160, 160 - 240)
  const currentStep = Math.min(2, Math.floor(frame / 80));

  // Progressive connecting line
  const lineProgress = interpolate(frame, [0, 220], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const steps = [
    {
      num: '01',
      title: 'BELAJAR',
      subtitle: 'Teori & Penguasaan Bahasa Asing',
      Icon: StudyLineIcon,
      accent: '#22D3EE',
    },
    {
      num: '02',
      title: 'BERLATIH',
      subtitle: '70% Praktik Bengkel & Simulasi UBT',
      Icon: PracticeLineIcon,
      accent: '#38BDF8',
    },
    {
      num: '03',
      title: 'MEMPERSIAPKAN DIRI',
      subtitle: 'Disiplin Mental, Etos Kerja & Sertifikasi',
      Icon: PrepareLineIcon,
      accent: '#D5B779',
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
        padding: '0 120px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
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
          PROGRESSION FRAMEWORK
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
          ALUR PERSIAPAN KETERAMPILAN
        </h2>
      </div>

      {/* 3-Step Connected Process Diagram */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1300,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
        }}
      >
        {/* Progressive Connecting Line Behind Steps */}
        <div
          style={{
            position: 'absolute',
            top: 75,
            left: '15%',
            right: '15%',
            height: 2,
            backgroundColor: THEME.colors.mutedLine,
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: `${lineProgress}%`,
              height: 2,
              backgroundColor: THEME.colors.activeLine,
              boxShadow: '0 0 12px rgba(34, 211, 238, 0.9)',
            }}
          />
        </div>

        {steps.map((st, i) => {
          const isPassed = i <= currentStep;
          const isCurrent = i === currentStep;
          const StepIcon = st.Icon;

          return (
            <div
              key={i}
              style={{
                position: 'relative',
                zIndex: 2,
                backgroundColor: isCurrent ? 'rgba(16, 43, 73, 0.85)' : isPassed ? 'rgba(11, 27, 47, 0.6)' : 'rgba(5, 15, 26, 0.45)',
                border: `1.5px solid ${isCurrent ? st.accent : isPassed ? 'rgba(34, 211, 238, 0.35)' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: 24,
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: isCurrent ? `0 15px 40px -10px rgba(34, 211, 238, 0.35)` : 'none',
                transform: isCurrent ? 'scale(1.04)' : 'scale(1)',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Step Orb */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: isCurrent ? st.accent : isPassed ? 'rgba(34, 211, 238, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCurrent ? '#040A12' : '#F8FAFC',
                  fontWeight: 900,
                  fontSize: 18,
                  marginBottom: 20,
                  boxShadow: isCurrent ? `0 0 16px ${st.accent}` : 'none',
                }}
              >
                {st.num}
              </div>

              {/* Icon */}
              <div style={{ marginBottom: 20, opacity: isPassed ? 1 : 0.35 }}>
                <StepIcon color={isCurrent ? st.accent : isPassed ? THEME.colors.electricCyan : '#64748B'} size={44} />
              </div>

              {/* Step Title */}
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: isCurrent ? THEME.colors.highContrastWhite : isPassed ? '#E2E8F0' : '#64748B',
                  margin: '0 0 10px 0',
                  letterSpacing: '0.04em',
                }}
              >
                {st.title}
              </h3>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: isCurrent ? '#CBD5E1' : '#64748B',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {st.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
