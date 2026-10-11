import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const BrandPromise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typography stagger
  const spring1 = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });
  const spring2 = spring({
    frame: frame - 45,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });

  // Guided light vector drawing through the composition (Frames 50 - 150)
  const vectorProgress = interpolate(frame, [50, 160], [0, 960], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.midnightBlack,
        background: `radial-gradient(circle at 45% 55%, ${THEME.colors.atmosphericBlue} 0%, ${THEME.colors.midnightBlack} 75%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: THEME.typography.fontFamily,
        padding: '0 120px',
      }}
    >
      <div style={{ maxWidth: 1200, width: '100%', textAlign: 'center' }}>
        {/* Line 1 */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: THEME.colors.highContrastWhite,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            opacity: interpolate(spring1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spring1, [0, 1], [30, 0])}px)`,
          }}
        >
          Mempersiapkan Masa Depan,
        </div>

        {/* Guided Vector Line */}
        <div style={{ width: '100%', height: 2, margin: '30px auto', position: 'relative' }}>
          <div
            style={{
              width: vectorProgress,
              height: 2,
              margin: '0 auto',
              background: `linear-gradient(90deg, transparent, ${THEME.colors.electricCyan}, ${THEME.colors.champagneGold})`,
              boxShadow: '0 0 15px rgba(34, 211, 238, 0.75)',
            }}
          />
        </div>

        {/* Line 2 with Cyan-Highlight */}
        <div
          style={{
            fontSize: 66,
            fontWeight: 900,
            color: THEME.colors.electricCyan,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            opacity: interpolate(spring2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spring2, [0, 1], [30, 0])}px)`,
          }}
        >
          Membuka Peluang Dunia.
        </div>

        {/* Secondary Subdued Standard Statement */}
        <p
          style={{
            fontSize: 22,
            color: THEME.colors.subduedWhite,
            fontWeight: 500,
            marginTop: 36,
            opacity: interpolate(spring2, [0, 1], [0, 0.85]),
          }}
        >
          Standar Kompetensi Kerja Terarah • Kurikulum Bahasa Asing & Kejuruan Vokasi
        </p>
      </div>
    </div>
  );
};
