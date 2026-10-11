import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/theme';
import { StudyLineIcon, PracticeLineIcon, PrepareLineIcon } from '../components/LineIcons';

export const LearningInMotionScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Forward camera push: 0.92 -> 1.08 over 240 frames
  const dolly = interpolate(frame, [0, 240], [0.92, 1.08], {
    extrapolateRight: 'clamp',
  });

  // Current active step: 80 frames each (0-80: BELAJAR, 80-160: BERLATIH, 160-240: BERSIAP)
  const currentStep = Math.min(2, Math.floor(frame / 80));

  // Progressive connecting light beam
  const beamProgress = interpolate(frame, [0, 220], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const steps = [
    {
      num: '01',
      title: 'BELAJAR',
      sub: 'Teori Vokasi & Penguasaan Bahasa Asing',
      Icon: StudyLineIcon,
      color: '#22D3EE',
    },
    {
      num: '02',
      title: 'BERLATIH',
      sub: '70% Praktik Bengkel & Simulasi UBT',
      Icon: PracticeLineIcon,
      color: '#38BDF8',
    },
    {
      num: '03',
      title: 'BERSIAP',
      sub: 'Disiplin Mental, Etos Kerja & Sertifikasi',
      Icon: PrepareLineIcon,
      color: '#D5B779',
    },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.midnightBlack,
        background: `radial-gradient(circle at 50% 50%, ${THEME.colors.atmosphericBlue} 0%, ${THEME.colors.midnightBlack} 75%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: THEME.typography.fontFamily,
        padding: '0 100px',
      }}
    >
      <div
        style={{
          transform: `scale(${dolly})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: THEME.colors.electricCyan,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          PROGRESSION FRAMEWORK
        </span>

        <h2
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: THEME.colors.highContrastWhite,
            margin: '0 0 60px 0',
            letterSpacing: '-0.02em',
          }}
        >
          LEARNING IN MOTION
        </h2>

        {/* 3 Step Moving Progression */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 40, maxWidth: 1300 }}>
          {/* Connecting Line */}
          <div
            style={{
              position: 'absolute',
              top: 75,
              left: '12%',
              right: '12%',
              height: 3,
              backgroundColor: THEME.colors.mutedLine,
              zIndex: 0,
            }}
          >
            <div
              style={{
                width: `${beamProgress}%`,
                height: 3,
                backgroundColor: THEME.colors.activeLine,
                boxShadow: '0 0 16px rgba(34, 211, 238, 0.9)',
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
                  width: 360,
                  backgroundColor: isCurrent ? 'rgba(16, 43, 73, 0.85)' : isPassed ? 'rgba(11, 27, 47, 0.6)' : 'rgba(5, 15, 26, 0.45)',
                  border: `2px solid ${isCurrent ? st.color : isPassed ? 'rgba(34, 211, 238, 0.35)' : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: 24,
                  padding: '40px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: isCurrent ? '0 15px 40px -10px rgba(34, 211, 238, 0.4)' : 'none',
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
                    backgroundColor: isCurrent ? st.color : isPassed ? 'rgba(34, 211, 238, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isCurrent ? '#040A12' : '#F8FAFC',
                    fontWeight: 900,
                    fontSize: 18,
                    marginBottom: 20,
                    boxShadow: isCurrent ? `0 0 18px ${st.color}` : 'none',
                  }}
                >
                  {st.num}
                </div>

                {/* Vector Line Icon */}
                <div style={{ marginBottom: 20, opacity: isPassed ? 1 : 0.35 }}>
                  <StepIcon color={isCurrent ? st.color : isPassed ? THEME.colors.electricCyan : '#64748B'} size={48} />
                </div>

                {/* Step Title */}
                <h3
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: isCurrent ? THEME.colors.highContrastWhite : isPassed ? '#E2E8F0' : '#64748B',
                    margin: '0 0 12px 0',
                    letterSpacing: '0.03em',
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
                  {st.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
