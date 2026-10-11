import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { BRAND } from '../config/brand';

export const BrandFinaleTech: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Headline "PERSIAPKAN LANGKAHMU. BUKA PELUANG MASA DEPAN." (Frames 0 - 120)
  // Phase 2: Logo, Tagline, CTA ratechs.id (Frames 100 - 300)

  const headSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });

  const logoSpring = spring({
    frame: frame - 90,
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
      {/* PHASE 1: HEADLINE (Frames 0 - 100) */}
      {frame < 110 && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            opacity: interpolate(frame, [0, 20, 85, 105], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(headSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <h2
            style={{
              fontSize: 62,
              fontWeight: 900,
              color: THEME.colors.highContrastWhite,
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0',
            }}
          >
            PERSIAPKAN LANGKAHMU.
          </h2>
          <h3
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: THEME.colors.electricCyan,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            BUKA PELUANG MASA DEPAN.
          </h3>
        </div>
      )}

      {/* PHASE 2: FINAL BRAND SETTLE (Frames 90 - 300) */}
      {frame >= 90 && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: interpolate(logoSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.92, 1])})`,
          }}
        >
          {/* Logo Substrate */}
          <div
            style={{
              width: 140,
              height: 140,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
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
              style={{ width: '82%', height: '82%', objectFit: 'contain' }}
            />
          </div>

          {/* Company Name */}
          <h1
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: THEME.colors.highContrastWhite,
              letterSpacing: '-0.02em',
              margin: '0 0 8px 0',
            }}
          >
            {BRAND.name}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 24,
              fontWeight: 600,
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
              padding: '16px 44px',
              borderRadius: 999,
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: '0.04em',
              boxShadow: '0 0 35px rgba(34, 211, 238, 0.65)',
            }}
          >
            {BRAND.cta} →
          </div>

          {/* Verified Contact Footer (ratechs.id - NO PHONE NUMBER) */}
          <p
            style={{
              marginTop: 24,
              color: THEME.colors.mutedSteel,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            ✉️ Informasi & Pendaftaran Resmi: {BRAND.contactUrl} ({BRAND.contactEmail})
          </p>
        </div>
      )}
    </div>
  );
};
