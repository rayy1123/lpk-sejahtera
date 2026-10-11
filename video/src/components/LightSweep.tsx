import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface LightSweepProps {
  durationInFrames: number;
  angle?: number;
  color?: string;
  intensity?: number;
}

export const LightSweep: React.FC<LightSweepProps> = ({
  durationInFrames,
  angle = -35,
  color = 'rgba(34, 211, 238, 0.25)',
  intensity = 0.5,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, durationInFrames], [-1920, 1920 * 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 5,
        opacity: intensity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -500,
          left: 0,
          width: 400,
          height: 2500,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          transform: `translateX(${progress}px) rotate(${angle}deg)`,
        }}
      />
    </div>
  );
};
