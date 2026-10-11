import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { BRAND } from '../config/brand';

export const ThePromiseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: KETERAMPILAN HARI INI (Frames 0 - 90)
  // Part 2: PELUANG ESOK HARI (Frames 80 - 180)

  const spring1 = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  const spring2 = spring({
    frame: frame - 80,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  // Dynamic connecting vector beam bridging between both statements
  const bridgeProgress = interpolate(frame, [60, 140], [0, 840], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        padding: '0 80px',
      }}
    >
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {/* Part 1: High-Contrast White */}
        <h2
          style={{
            fontSize: 78,
            fontWeight: 900,
            color: THEME.colors.highContrastWhite,
            letterSpacing: '-0.02em',
            margin: 0,
            opacity: interpolate(spring1, [0, 1], [0, 1]),
            transform: `scale(${interpolate(spring1, [0, 1], [0.92, 1])})`,
          }}
        >
          {BRAND.promisePart1}
        </h2>

        {/* Dynamic Light Bridge */}
        <div style={{ width: 840, height: 3, margin: '26px auto', position: 'relative' }}>
          <div
            style={{
              width: bridgeProgress,
              height: 3,
              margin: '0 auto',
              background: `linear-gradient(90deg, transparent, ${THEME.colors.electricCyan}, ${THEME.colors.champagneGold})`,
              boxShadow: '0 0 16px rgba(34, 211, 238, 0.9)',
            }}
          />
        </div>

        {/* Part 2: High-Energy Cyan */}
        <h2
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: THEME.colors.electricCyan,
            letterSpacing: '-0.02em',
            margin: 0,
            opacity: interpolate(spring2, [0, 1], [0, 1]),
            transform: `scale(${interpolate(spring2, [0, 1], [0.92, 1])})`,
          }}
        >
          {BRAND.promisePart2}
        </h2>
      </div>
    </div>
  );
};
