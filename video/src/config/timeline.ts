export const TIMELINE = {
  fps: 60,
  durationInSeconds: 28,
  durationInFrames: 1680, // Exactly 28s * 60fps = 1680 frames
  width: 1920,
  height: 1080,
  scenes: {
    // 00:00–00:02 — IMMEDIATE HOOK (Frames 0–120 / 2.0s)
    hook: { start: 0, duration: 120 },

    // 00:02–00:05 — BRAND REVEAL (Frames 120–300 / 3.0s)
    brandReveal: { start: 120, duration: 180 },

    // 00:05–00:08 — THE PROMISE (Frames 300–480 / 3.0s)
    promise: { start: 300, duration: 180 },

    // 00:08–00:18 — FOUR CAREER PATHWAYS (Frames 480–1080 / 10.0s total, 150 frames each)
    pathways: {
      start: 480,
      duration: 600,
      japan: { start: 0, duration: 150 },     // 08.0s - 10.5s (Frames 480 - 630)
      korea: { start: 150, duration: 150 },   // 10.5s - 13.0s (Frames 630 - 780)
      welding: { start: 300, duration: 150 }, // 13.0s - 15.5s (Frames 780 - 930)
      caregiver: { start: 450, duration: 150},// 15.5s - 18.0s (Frames 930 - 1080)
    },

    // 00:18–00:22 — LEARNING IN MOTION (Frames 1080–1320 / 4.0s)
    learningMotion: { start: 1080, duration: 240 },

    // 00:22–00:25 — BUILD THE CLIMAX (Frames 1320–1500 / 3.0s)
    climax: { start: 1320, duration: 180 },

    // 00:25–00:28 — BRAND FINALE (Frames 1500–1680 / 3.0s)
    finale: { start: 1500, duration: 180 },
  },
};
