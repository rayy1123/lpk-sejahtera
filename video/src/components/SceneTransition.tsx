import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface SceneTransitionProps {
  type?: 'fade' | 'lightFlash' | 'wipe';
  durationInFrames?: number;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  type = 'lightFlash',
  durationInFrames = 20,
}) => {
  const frame = useCurrentFrame();

  if (frame > durationInFrames) return null;

  if (type === 'lightFlash') {
    const opacity = interpolate(
      frame,
      [0, durationInFrames * 0.3, durationInFrames],
      [0.8, 0.4, 0],
      { extrapolateRight: 'clamp' }
    );

    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
          opacity,
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />
    );
  }

  return null;
};
