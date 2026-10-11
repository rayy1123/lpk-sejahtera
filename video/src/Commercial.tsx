import React from 'react';
import { Sequence } from 'remotion';
import { TIMELINE } from './config/timeline';
import { ImmediateHook } from './scenes/ImmediateHook';
import { BrandRevealScene } from './scenes/BrandRevealScene';
import { ThePromiseScene } from './scenes/ThePromiseScene';
import { CareerPathwaysFull } from './scenes/CareerPathwaysFull';
import { LearningInMotionScene } from './scenes/LearningInMotionScene';
import { ClimaxScene } from './scenes/ClimaxScene';
import { BrandFinaleCommercial } from './scenes/BrandFinaleCommercial';

export const Commercial: React.FC = () => {
  const { scenes } = TIMELINE;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        backgroundColor: '#03070E',
        overflow: 'hidden',
      }}
    >
      {/* 00:00–00:02 — IMMEDIATE HOOK (Frames 0–120) */}
      <Sequence from={scenes.hook.start} durationInFrames={scenes.hook.duration}>
        <ImmediateHook />
      </Sequence>

      {/* 00:02–00:05 — BRAND REVEAL (Frames 120–300) */}
      <Sequence from={scenes.brandReveal.start} durationInFrames={scenes.brandReveal.duration}>
        <BrandRevealScene />
      </Sequence>

      {/* 00:05–00:08 — THE PROMISE (Frames 300–480) */}
      <Sequence from={scenes.promise.start} durationInFrames={scenes.promise.duration}>
        <ThePromiseScene />
      </Sequence>

      {/* 00:08–00:18 — FOUR CAREER PATHWAYS (Frames 480–1080) */}
      <Sequence from={scenes.pathways.start} durationInFrames={scenes.pathways.duration}>
        <CareerPathwaysFull />
      </Sequence>

      {/* 00:18–00:22 — LEARNING IN MOTION (Frames 1080–1320) */}
      <Sequence from={scenes.learningMotion.start} durationInFrames={scenes.learningMotion.duration}>
        <LearningInMotionScene />
      </Sequence>

      {/* 00:22–00:25 — BUILD THE CLIMAX (Frames 1320–1500) */}
      <Sequence from={scenes.climax.start} durationInFrames={scenes.climax.duration}>
        <ClimaxScene />
      </Sequence>

      {/* 00:25–00:28 — BRAND FINALE (Frames 1500–1680) */}
      <Sequence from={scenes.finale.start} durationInFrames={scenes.finale.duration}>
        <BrandFinaleCommercial />
      </Sequence>
    </div>
  );
};
