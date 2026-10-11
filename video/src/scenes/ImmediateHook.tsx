import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { BRAND } from '../config/brand';

export const ImmediateHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Instant snap-in! No long fade from black!
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 140 },
  });

  // Camera pull back: starts tight (1.18) -> pulls back to reveal environment (0.98)
  const cameraZoom = interpolate(frame, [0, 120], [1.18, 0.98], {
    extrapolateRight: 'clamp',
  });

  // Fast directional line sweep across the screen
  const lineSweep = interpolate(frame, [10, 80], [-800, 1920 + 800], {
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
        transform: `scale(${cameraZoom})`,
      }}
    >
      {/* High-Velocity Cyan Light Streak */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: 500,
          height: 3,
          backgroundColor: THEME.colors.electricCyan,
          boxShadow: '0 0 25px rgba(34, 211, 238, 1)',
          transform: `translateX(${lineSweep}px) translateY(-50%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Immediate High-Impact Typography Hook */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          opacity: interpolate(entrance, [0, 1], [0.3, 1]),
          transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])})`,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '0.2em',
            color: THEME.colors.electricCyan,
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 16,
          }}
        >
          PROGRAM PERSIAPAN KARIER GLOBAL
        </span>

        <h1
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: THEME.colors.highContrastWhite,
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.15,
            maxWidth: 1400,
          }}
        >
          {BRAND.hookQuestion}
        </h1>
      </div>
    </div>
  );
};
