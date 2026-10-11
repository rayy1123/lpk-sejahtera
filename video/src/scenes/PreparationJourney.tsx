import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/theme';
import { ParticleField } from '../components/ParticleField';

export const PreparationJourney: React.FC = () => {
  const frame = useCurrentFrame();

  // Forward camera push-in: 0.92 -> 1.08 over 360 frames (6 seconds)
  const dolly = interpolate(frame, [0, 360], [0.92, 1.08], {
    extrapolateRight: 'clamp',
  });

  const stages = [
    { num: '01', title: 'Pendaftaran & Konsultasi', sub: 'Pemetaan Minat Bahasa & Vokasi' },
    { num: '02', title: 'Pelatihan Intensif', sub: 'Teori, Laboratorium & Bengkel Kerja' },
    { num: '03', title: 'Uji Kompetensi', sub: 'Simulasi UBT, JFT & Sertifikasi K3' },
    { num: '04', title: 'Kesiapan Karier', sub: 'Etos Kerja Disiplin Standar Global' },
  ];

  const activeIdx = Math.min(3, Math.floor((frame / 360) * 4));

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
        fontFamily: THEME.typography.fontFamily,
      }}
    >
      <ParticleField count={28} />

      <div
        style={{
          transform: `scale(${dolly})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ color: THEME.colors.cyanGlow, fontWeight: 800, fontSize: 24, marginBottom: 12 }}>
          PERJALANAN TERSTRUKTUR & BERKELANJUTAN
        </div>

        <h2 style={{ fontSize: 64, fontWeight: 900, color: THEME.colors.ivoryWhite, margin: '0 0 60px 0' }}>
          THE JOURNEY: DARI KELAS KE INDUSTRI
        </h2>

        {/* 4 Connected Milestones */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, maxWidth: 1400 }}>
          {stages.map((st, idx) => {
            const isReached = idx <= activeIdx;
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                {/* Node Box */}
                <div
                  style={{
                    width: 280,
                    padding: '30px 20px',
                    borderRadius: 24,
                    backgroundColor: isReached ? 'rgba(25, 184, 176, 0.16)' : 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${isReached ? THEME.colors.electricTeal : 'rgba(255, 255, 255, 0.12)'}`,
                    boxShadow: isReached ? '0 0 30px rgba(25, 184, 176, 0.35)' : 'none',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 900,
                      color: isReached ? THEME.colors.cyanGlow : 'rgba(255, 255, 255, 0.4)',
                      marginBottom: 10,
                    }}
                  >
                    {st.num}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.ivoryWhite, marginBottom: 8 }}>
                    {st.title}
                  </div>
                  <div style={{ fontSize: 14, color: THEME.colors.mutedSteel }}>{st.sub}</div>
                </div>

                {/* Connector Arrow */}
                {idx < 3 && (
                  <div
                    style={{
                      width: 30,
                      height: 4,
                      backgroundColor: idx < activeIdx ? THEME.colors.electricTeal : 'rgba(255, 255, 255, 0.15)',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Privacy & Trust Notice */}
        <p style={{ marginTop: 60, color: '#CBD5E1', fontSize: 20, fontWeight: 600 }}>
          🛡️ Dokumen kependudukan terlindungi aman melalui otorisasi hak akses terstandarisasi
        </p>
      </div>
    </div>
  );
};
