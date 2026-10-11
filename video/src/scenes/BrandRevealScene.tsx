import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { BRAND } from '../config/brand';

export const BrandRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Natural camera push: 0.92 -> 1.05
  const camZoom = interpolate(frame, [0, 180], [0.92, 1.05], {
    extrapolateRight: 'clamp',
  });

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 120 },
  });

  const textSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });

  // Light trail sweeping across scene
  const lightTrail = interpolate(frame, [15, 120], [-400, 1920 + 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        transform: `scale(${camZoom})`,
      }}
    >
      {/* Light Sweep Continuing */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 250,
          background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.35), transparent)',
          transform: `translateX(${lightTrail}px) skewX(-25deg)`,
          pointerEvents: 'none',
        }}
      />

      {/* Structured Layered Frame behind Logo */}
      <div
        style={{
          position: 'relative',
          width: 210,
          height: 210,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${interpolate(logoSpring, [0, 1], [0.85, 1])})`,
          opacity: interpolate(logoSpring, [0, 1], [0, 1]),
        }}
      >
        {/* Radial Aura */}
        <div
          style={{
            position: 'absolute',
            inset: -45,
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(213, 183, 121, 0.15) 50%, transparent 80%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
          }}
        />

        {/* Clean Logo Substrate */}
        <div
          style={{
            position: 'relative',
            width: 195,
            height: 195,
            backgroundColor: '#FFFFFF',
            borderRadius: 34,
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.25)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpeg"
            alt="Logo PT. Sejahtera Abadi Bersama"
            style={{ width: '84%', height: '84%', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Brand Identity Typography */}
      <div
        style={{
          marginTop: 34,
          textAlign: 'center',
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        <span
          style={{
            color: THEME.colors.electricCyan,
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 10,
          }}
        >
          LEMBAGA PELATIHAN KERJA RESMI
        </span>
        <h2
          style={{
            fontSize: 58,
            fontWeight: 900,
            color: THEME.colors.highContrastWhite,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {BRAND.name}
        </h2>
      </div>
    </div>
  );
};
