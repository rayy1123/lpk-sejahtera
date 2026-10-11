import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BrandLogo } from '../components/BrandLogo';
import { AnimatedText } from '../components/AnimatedText';
import { LightSweep } from '../components/LightSweep';
import { ParticleField } from '../components/ParticleField';
import { BRAND } from '../config/brand';
import { THEME } from '../styles/theme';

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Camera Dolly in: 0.88 -> 1.04
  const cameraZoom = interpolate(frame, [0, 240], [0.88, 1.04], {
    extrapolateRight: 'clamp',
  });

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
        overflow: 'hidden',
        transform: `scale(${cameraZoom})`,
      }}
    >
      <ParticleField count={24} />
      <LightSweep durationInFrames={200} />

      {/* Center Group */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          zIndex: 10,
        }}
      >
        <BrandLogo size={220} delay={15} />

        <div style={{ marginTop: 10 }}>
          <AnimatedText
            text={BRAND.badge}
            delay={55}
            fontSize={22}
            color={THEME.colors.cyanGlow}
            fontWeight={800}
            letterSpacing="0.08em"
          />
        </div>

        <AnimatedText
          text={BRAND.name}
          delay={75}
          fontSize={64}
          color={THEME.colors.ivoryWhite}
          fontWeight={900}
          letterSpacing="-0.02em"
        />

        <AnimatedText
          text={`“${BRAND.tagline}”`}
          delay={100}
          fontSize={28}
          color={THEME.colors.champagneGold}
          fontWeight={600}
          letterSpacing="0.01em"
        />
      </div>
    </div>
  );
};
