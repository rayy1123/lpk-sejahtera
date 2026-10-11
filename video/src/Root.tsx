import React from 'react';
import { Composition } from 'remotion';
import { Commercial } from './Commercial';
import { TIMELINE } from './config/timeline';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="LpkAbadiCommercial"
        component={Commercial}
        durationInFrames={TIMELINE.durationInFrames}
        fps={TIMELINE.fps}
        width={TIMELINE.width}
        height={TIMELINE.height}
      />
    </>
  );
};
