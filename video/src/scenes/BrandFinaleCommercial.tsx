import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { BRAND } from '../config/brand';

export const BrandFinaleCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });

  const pulse = 1 + 0.02 * Math.sin((frame / 60) * Math.PI * 3);

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
        textAlign: 'center',
        overflow: 'hidden',
        fontFamily: THEME.typography.fontFamily,
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: interpolate(logoSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logoSpring, [0, 1], [0.9, 1])})`,
        }}
      >
        {/* Official Logo Substrate */}
        <div
          style={{
            width: 140,
            height: 140,
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: 20,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpeg"
            alt="Logo PT. Sejahtera Abadi Bersama"
            style={{ width: '84%', height: '84%', objectFit: 'contain' }}
          />
        </div>

        {/* Company Name */}
        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: THEME.colors.highContrastWhite,
            letterSpacing: '-0.02em',
            margin: '0 0 10px 0',
          }}
        >
          {BRAND.name}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: THEME.colors.champagneGold,
            margin: '0 0 28px 0',
          }}
        >
          “{BRAND.tagline}”
        </p>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${pulse})`,
            backgroundColor: THEME.colors.electricCyan,
            color: '#03070E',
            padding: '16px 46px',
            borderRadius: 999,
            fontWeight: 900,
            fontSize: 24,
            letterSpacing: '0.04em',
            boxShadow: '0 0 35px rgba(34, 211, 238, 0.7)',
            cursor: 'pointer',
          }}
        >
          {BRAND.cta} →
        </div>

        {/* Verified Contact Footer (ratechs.id - ZERO PHONE NUMBERS) */}
        <p
          style={{
            marginTop: 26,
            color: THEME.colors.mutedSteel,
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          ✉️ Informasi & Pendaftaran Resmi: {BRAND.contactUrl} ({BRAND.contactEmail})
        </p>
      </div>
    </div>
  );
};
