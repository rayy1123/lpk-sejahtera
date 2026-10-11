import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

interface BrandLogoProps {
  size?: number;
  delay?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 220, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const scale = interpolate(entrance, [0, 1], [0.85, 1], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Specular light sweep across logo
  const sweepProgress = interpolate(frame - delay, [45, 110], [-size, size * 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        transform: `scale(${scale})`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Radial Volumetric Aura */}
      <div
        style={{
          position: 'absolute',
          inset: -60,
          background: `radial-gradient(circle, rgba(25, 184, 176, 0.45) 0%, rgba(213, 183, 121, 0.15) 50%, transparent 75%)`,
          borderRadius: '50%',
          filter: 'blur(20px)',
          zIndex: 0,
        }}
      />

      {/* Solid White Card Base to preserve logo colors perfectly */}
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          backgroundColor: '#FFFFFF',
          borderRadius: size * 0.16,
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpeg"
          alt="Logo PT. Sejahtera Abadi Bersama"
          style={{
            width: '84%',
            height: '84%',
            objectFit: 'contain',
          }}
        />

        {/* Specular Light Sweep */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent)',
            transform: `translateX(${sweepProgress}px) skewX(-25deg)`,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
