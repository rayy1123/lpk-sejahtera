import React from 'react';
import { Sequence } from 'remotion';
import { TIMELINE } from './config/timeline';
import { OpeningStatement } from './scenes/OpeningStatement';
import { LogoIdentity } from './scenes/LogoIdentity';
import { BrandPromise } from './scenes/BrandPromise';
import { CareerPathwaysSystem } from './scenes/CareerPathwaysSystem';
import { PreparationJourneyDiagram } from './scenes/PreparationJourneyDiagram';
import { BrandFinaleTech } from './scenes/BrandFinaleTech';

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
      {/* SCENE 01 — OPENING STATEMENT (00:00–00:04 | Frames 0–240) */}
      <Sequence from={scenes.scene1Opening.start} durationInFrames={scenes.scene1Opening.duration}>
        <OpeningStatement />
      </Sequence>

      {/* SCENE 02 — LOGO AND BRAND IDENTITY (00:04–00:07 | Frames 240–420) */}
      <Sequence from={scenes.scene2Logo.start} durationInFrames={scenes.scene2Logo.duration}>
        <LogoIdentity />
      </Sequence>

      {/* SCENE 03 — BRAND PROMISE (00:07–00:10 | Frames 420–600) */}
      <Sequence from={scenes.scene3Promise.start} durationInFrames={scenes.scene3Promise.duration}>
        <BrandPromise />
      </Sequence>

      {/* SCENE 04 — FOUR CAREER PATHWAYS SYSTEM (00:10–00:19 | Frames 600–1140) */}
      <Sequence from={scenes.scene4Pathways.start} durationInFrames={scenes.scene4Pathways.duration}>
        <CareerPathwaysSystem />
      </Sequence>

      {/* SCENE 05 — THE PREPARATION JOURNEY (00:19–00:23 | Frames 1140–1380) */}
      <Sequence from={scenes.scene5Journey.start} durationInFrames={scenes.scene5Journey.duration}>
        <PreparationJourneyDiagram />
      </Sequence>

      {/* SCENE 06 — BRAND FINALE & CLIMAX (00:23–00:28 | Frames 1380–1680) */}
      <Sequence from={scenes.scene6Finale.start} durationInFrames={scenes.scene6Finale.duration}>
        <BrandFinaleTech />
      </Sequence>
    </div>
  );
};
