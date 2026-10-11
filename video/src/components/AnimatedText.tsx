import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number | string;
  letterSpacing?: string;
  lineHeight?: number | string;
  textAlign?: 'left' | 'center' | 'right';
  transformType?: 'slideUp' | 'slideRight' | 'scaleUp' | 'tracking';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 64,
  color = '#F8FAFC',
  fontWeight = 900,
  letterSpacing = '-0.02em',
  lineHeight = 1.1,
  textAlign = 'center',
  transformType = 'slideUp',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const anim = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  const opacity = interpolate(anim, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });

  let transform = '';
  if (transformType === 'slideUp') {
    const y = interpolate(anim, [0, 1], [40, 0], { extrapolateRight: 'clamp' });
    transform = `translateY(${y}px)`;
  } else if (transformType === 'slideRight') {
    const x = interpolate(anim, [0, 1], [-60, 0], { extrapolateRight: 'clamp' });
    transform = `translateX(${x}px)`;
  } else if (transformType === 'scaleUp') {
    const sc = interpolate(anim, [0, 1], [0.85, 1], { extrapolateRight: 'clamp' });
    transform = `scale(${sc})`;
  } else if (transformType === 'tracking') {
    transform = `scale(${interpolate(anim, [0, 1], [0.95, 1], { extrapolateRight: 'clamp' })})`;
  }

  return (
    <div
      style={{
        opacity,
        transform,
        fontSize,
        color,
        fontWeight,
        letterSpacing,
        lineHeight,
        textAlign,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {text}
    </div>
  );
};
