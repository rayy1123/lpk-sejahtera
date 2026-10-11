import React from 'react';
import { useCurrentFrame } from 'remotion';

interface ParticleFieldProps {
  count?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ count = 28 }) => {
  const frame = useCurrentFrame();

  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      baseX: (i * 187) % 1920,
      baseY: (i * 261) % 1080,
      radius: 8 + (i % 5) * 6,
      speedX: 0.8 + (i % 3) * 0.4,
      speedY: 0.3 + (i % 2) * 0.2,
      opacity: 0.15 + (i % 4) * 0.08,
    }));
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {particles.map((p, i) => {
        const x = (p.baseX + frame * p.speedX) % 1920;
        const y = (p.baseY + Math.sin(frame * 0.03 + i) * 40) % 1080;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.radius * 2,
              height: p.radius * 2,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(34, 211, 238, ${p.opacity}) 0%, transparent 70%)`,
            }}
          />
        );
      })}
    </div>
  );
};
