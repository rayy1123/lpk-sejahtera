import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BrandLogo } from '../components/BrandLogo';
import { BRAND } from '../config/brand';
import { THEME } from '../styles/theme';
import { ParticleField } from '../components/ParticleField';

export const BrandFinale: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const pulse = 1 + 0.02 * Math.sin((frame / 60) * Math.PI * 3);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.midnightNavy,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        fontFamily: THEME.typography.fontFamily,
        opacity: entrance,
      }}
    >
      <ParticleField count={26} />

      {/* Brand Logo Returns in Center Top */}
      <BrandLogo size={140} delay={0} />

      <div style={{ marginTop: 20 }}>
        <p style={{ color: THEME.colors.champagneGold, fontSize: 24, fontWeight: 700, margin: '0 0 10px 0' }}>
          “{BRAND.tagline}”
        </p>

        <h1 style={{ fontSize: 72, fontWeight: 900, color: THEME.colors.ivoryWhite, margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
          MASA DEPAN DIMULAI DARI SINI.
        </h1>

        <h2 style={{ fontSize: 28, fontWeight: 800, color: THEME.colors.cyanGlow, margin: '0 0 24px 0' }}>
          {BRAND.name}
        </h2>
      </div>

      {/* Pulsing CTA Button */}
      <div
        style={{
          transform: `scale(${pulse})`,
          backgroundColor: THEME.colors.electricTeal,
          color: THEME.colors.midnightNavy,
          padding: '18px 48px',
          borderRadius: 999,
          fontWeight: 900,
          fontSize: 26,
          boxShadow: '0 0 35px rgba(25, 184, 176, 0.7)',
          cursor: 'pointer',
        }}
      >
        {BRAND.cta} →
      </div>

      {/* Official Contact Footer (ratechs.id - ZERO PHONE NUMBERS) */}
      <p style={{ marginTop: 28, color: THEME.colors.mutedSteel, fontSize: 20, fontWeight: 600 }}>
        ✉️ Informasi & Konsultasi Resmi: {BRAND.contactUrl} ({BRAND.contactEmail})
      </p>
    </div>
  );
};
