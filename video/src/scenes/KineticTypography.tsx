import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { ParticleField } from '../components/ParticleField';

export const KineticTypography: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beat 1: MASA DEPAN (Frames 0 - 80 / 04.0s - 05.3s)
  // Beat 2: POTENSI (Frames 80 - 160 / 05.3s - 06.6s)
  // Beat 3: PELUANG DUNIA (Frames 160 - 240 / 06.6s - 08.0s)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.midnightNavy,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: THEME.typography.fontFamily,
      }}
    >
      <ParticleField count={30} />

      {/* BEAT 1: MASA DEPAN */}
      {frame < 80 && (
        <div style={{ position: 'relative', textAlign: 'center' }}>
          {/* Parallax Background Ghost Word */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translateX(${interpolate(frame, [0, 80], [-80, 80])}px)`,
              fontSize: 280,
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '2px rgba(25, 184, 176, 0.08)',
              letterSpacing: '0.05em',
              zIndex: 1,
              whiteSpace: 'nowrap',
            }}
          >
            FUTURE
          </div>

          {/* Foreground Kinetic Word */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              fontSize: 140,
              fontWeight: 900,
              color: THEME.colors.ivoryWhite,
              letterSpacing: '-0.03em',
              transform: `scale(${interpolate(frame, [0, 80], [0.92, 1.08])})`,
            }}
          >
            MASA DEPAN.
          </div>
          <p
            style={{
              position: 'relative',
              zIndex: 10,
              color: THEME.colors.cyanGlow,
              fontSize: 26,
              fontWeight: 700,
              marginTop: 20,
              letterSpacing: '0.04em',
            }}
          >
            LANGKAH AWAL KARIER INTERNASIONAL
          </p>
        </div>
      )}

      {/* BEAT 2: POTENSI */}
      {frame >= 80 && frame < 160 && (
        <div style={{ position: 'relative', textAlign: 'center' }}>
          {/* Diagonal Motion Cut */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%)`,
              fontSize: 240,
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '2px rgba(213, 183, 121, 0.1)',
              zIndex: 1,
              whiteSpace: 'nowrap',
            }}
          >
            POTENTIAL
          </div>

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              fontSize: 130,
              fontWeight: 900,
              color: THEME.colors.cyanGlow,
              letterSpacing: '-0.02em',
              transform: `translateX(${interpolate(frame, [80, 105], [100, 0], { extrapolateRight: 'clamp' })}px)`,
            }}
          >
            PENUHI POTENSI.
          </div>
          <p
            style={{
              position: 'relative',
              zIndex: 10,
              color: THEME.colors.champagneGold,
              fontSize: 26,
              fontWeight: 700,
              marginTop: 20,
              letterSpacing: '0.04em',
            }}
          >
            DISIPLIN VOKASI & KETERAMPILAN TERUJI
          </p>
        </div>
      )}

      {/* BEAT 3: PELUANG DUNIA */}
      {frame >= 160 && (
        <div style={{ position: 'relative', textAlign: 'center' }}>
          {/* Radial Geometry Ring */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 580,
              height: 580,
              transform: 'translate(-50%, -50%)',
              border: '2px solid rgba(34, 211, 238, 0.18)',
              borderRadius: '50%',
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              fontSize: 120,
              fontWeight: 900,
              color: THEME.colors.ivoryWhite,
              letterSpacing: '-0.02em',
              transform: `scale(${interpolate(frame, [160, 240], [0.88, 1.05])})`,
            }}
          >
            BUKA PELUANG DUNIA.
          </div>
          <p
            style={{
              position: 'relative',
              zIndex: 10,
              color: THEME.colors.electricTeal,
              fontSize: 26,
              fontWeight: 700,
              marginTop: 20,
              letterSpacing: '0.04em',
            }}
          >
            PELATIHAN VOKASI RESMI BERKUALITAS TINGGI
          </p>
        </div>
      )}
    </div>
  );
};
