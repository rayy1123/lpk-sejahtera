import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { BRAND } from '../config/brand';

export const LogoIdentity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 110 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.88, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Clean directional light sweep
  const sweepProgress = interpolate(frame, [30, 95], [-240, 240 * 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
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
      }}
    >
      {/* Central Clean Logo Composition */}
      <div
        style={{
          position: 'relative',
          width: 200,
          height: 200,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Soft Volumetric Cyan Aura Behind Logo */}
        <div
          style={{
            position: 'absolute',
            inset: -40,
            background: `radial-gradient(circle, rgba(34, 211, 238, 0.35) 0%, rgba(25, 184, 176, 0.1) 60%, transparent 80%)`,
            borderRadius: '50%',
            filter: 'blur(20px)',
          }}
        />

        {/* Clean Logo Substrate */}
        <div
          style={{
            position: 'relative',
            width: 190,
            height: 190,
            backgroundColor: '#FFFFFF',
            borderRadius: 32,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpeg"
            alt="Logo PT. Sejahtera Abadi Bersama"
            style={{ width: '82%', height: '82%', objectFit: 'contain' }}
          />

          {/* Precision Light Sweep */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '60%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
              transform: `translateX(${sweepProgress}px) skewX(-20deg)`,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Brand Name Reveal */}
      <div
        style={{
          marginTop: 36,
          textAlign: 'center',
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textSpring, [0, 1], [20, 0])}px)`,
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
            marginBottom: 8,
          }}
        >
          Lembaga Pelatihan Kerja Resmi
        </span>
        <h2
          style={{
            fontSize: 54,
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
