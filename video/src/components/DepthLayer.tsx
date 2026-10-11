import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface DepthLayerProps {
  children: React.ReactNode;
  depth?: number; // 0 (foreground) to 1 (background)
  rotateZ?: number;
}

export const DepthLayer: React.FC<DepthLayerProps> = ({
  children,
  depth = 0.5,
  rotateZ = 0,
}) => {
  const frame = useCurrentFrame();

  const drift = (frame * 0.4) * (1 - depth);
  const scale = 1 + (1 - depth) * 0.05;

  return (
    <div
      style={{
        position: 'relative',
        transform: `translateY(${drift}px) scale(${scale}) rotate(${rotateZ}deg)`,
        transition: 'transform 0.1s linear',
        zIndex: Math.floor((1 - depth) * 10),
      }}
    >
      {children}
    </div>
  );
};
