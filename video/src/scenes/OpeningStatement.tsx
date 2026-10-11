import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const OpeningStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word 1: KETERAMPILAN (Starts frame 15)
  const animWord1 = spring({
    frame: frame - 15,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 100 },
  });
  const blurWord1 = interpolate(animWord1, [0, 1], [16, 0], { extrapolateRight: 'clamp' });
  const yWord1 = interpolate(animWord1, [0, 1], [30, 0], { extrapolateRight: 'clamp' });
  const opacityWord1 = interpolate(animWord1, [0, 1], [0, 1], { extrapolateRight: 'clamp' });

  // Thin SVG light line drawing underneath word 1 (Frame 45 - 110)
  const lineProgress = interpolate(frame, [45, 110], [0, 540], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Word 2: UNTUK MASA DEPAN (Starts frame 85)
  const animWord2 = spring({
    frame: frame - 85,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 100 },
  });
  const blurWord2 = interpolate(animWord2, [0, 1], [14, 0], { extrapolateRight: 'clamp' });
  const yWord2 = interpolate(animWord2, [0, 1], [30, 0], { extrapolateRight: 'clamp' });
  const opacityWord2 = interpolate(animWord2, [0, 1], [0, 1], { extrapolateRight: 'clamp' });

  // Camera drift
  const camZoom = interpolate(frame, [0, 240], [0.96, 1.03], { extrapolateRight: 'clamp' });

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
        transform: `scale(${camZoom})`,
      }}
    >
      {/* Subtle Technical Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          opacity: 0.6,
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        {/* Subdued Category Tracker */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: '0.2em',
            color: THEME.colors.cyanAccent,
            marginBottom: 20,
            opacity: opacityWord1,
          }}
        >
          FOUNDATIONAL CAPABILITY
        </div>

        {/* Word 1: KETERAMPILAN */}
        <h1
          style={{
            fontSize: 94,
            fontWeight: 900,
            color: THEME.colors.highContrastWhite,
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.1,
            opacity: opacityWord1,
            transform: `translateY(${yWord1}px)`,
            filter: `blur(${blurWord1}px)`,
          }}
        >
          KETERAMPILAN
        </h1>

        {/* Progressive Fine Cyan Path */}
        <div style={{ width: 540, height: 2, margin: '24px auto', position: 'relative' }}>
          <div
            style={{
              width: lineProgress,
              height: 2,
              backgroundColor: THEME.colors.electricCyan,
              boxShadow: '0 0 12px rgba(34, 211, 238, 0.8)',
              borderRadius: 1,
            }}
          />
        </div>

        {/* Word 2: UNTUK MASA DEPAN */}
        <h2
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: THEME.colors.electricCyan,
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.1,
            opacity: opacityWord2,
            transform: `translateY(${yWord2}px)`,
            filter: `blur(${blurWord2}px)`,
          }}
        >
          UNTUK MASA DEPAN
        </h2>
      </div>
    </div>
  );
};
