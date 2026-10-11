export const TIMELINE = {
  fps: 60,
  durationInSeconds: 28,
  durationInFrames: 1680, // Exactly 28s * 60fps = 1680 frames
  width: 1920,
  height: 1080,
  scenes: {
    // SCENE 01 — OPENING STATEMENT (00:00–00:04 | Frames 0–239)
    scene1Opening: { start: 0, duration: 240 },

    // SCENE 02 — LOGO AND BRAND IDENTITY (00:04–00:07 | Frames 240–419)
    scene2Logo: { start: 240, duration: 180 },

    // SCENE 03 — BRAND PROMISE (00:07–00:10 | Frames 420–599)
    scene3Promise: { start: 420, duration: 180 },

    // SCENE 04 — FOUR CAREER PATHWAYS (00:10–00:19 | Frames 600–1139)
    // 9 seconds / 540 frames total: sequential connected line activation
    scene4Pathways: {
      start: 600,
      duration: 540,
      subnodes: {
        japan: { start: 0, duration: 135 },    // 01 - JEPANG (Tokutei Ginou, JFT A2/N4)
        korea: { start: 135, duration: 135 },  // 02 - KOREA (EPS-TOPIK, G-to-G)
        welding: { start: 270, duration: 135 },// 03 - WELDING (SMAW/GMAW 3G/4G)
        caregiver: { start: 405, duration: 135}// 04 - CAREGIVER (KAIGO)
      }
    },

    // SCENE 05 — THE PREPARATION JOURNEY (00:19–00:23 | Frames 1140–1379)
    // 4 seconds / 240 frames: BELAJAR → BERLATIH → MEMPERSIAPKAN DIRI
    scene5Journey: { start: 1140, duration: 240 },

    // SCENE 06 — BRAND FINALE (00:23–00:28 | Frames 1380–1679)
    // 5 seconds / 300 frames: PERSIAPKAN LANGKAHMU, BUKA PELUANG MASA DEPAN, CTA ratechs.id
    scene6Finale: { start: 1380, duration: 300 },
  },
};
