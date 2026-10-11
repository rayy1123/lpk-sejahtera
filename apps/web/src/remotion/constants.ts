export const FILM_CONFIG = {
  fps: 60,
  durationInFrames: 1680, // Exactly 28 seconds @ 60fps = 1680 frames
  width: 1920,
  height: 1080,
  brand: {
    name: "PT. SEJAHTERA ABADI BERSAMA",
    tagline: "Mempersiapkan Masa Depan, Membuka Peluang Dunia.",
    contact: "ratechs.id",
    contactEmail: "info@ratechs.id",
  },
  colors: {
    midnightBlack: "#03070E",
    deepNavy: "#060F1A",
    atmosphericBlue: "#0B1B2F",
    cyanAccent: "#19B8B0",
    electricCyan: "#22D3EE",
    highContrastWhite: "#F8FAFC",
    subduedWhite: "#E2E8F0",
    champagneGold: "#D5B779",
    mutedSteel: "#8FA8BF",
  },
  scenes: {
    scene1Opening: { startFrame: 0, endFrame: 240, durationInFrames: 240 },       // 0s - 4s
    scene2Logo: { startFrame: 240, endFrame: 420, durationInFrames: 180 },          // 4s - 7s
    scene3Promise: { startFrame: 420, endFrame: 600, durationInFrames: 180 },       // 7s - 10s
    scene4Pathways: { startFrame: 600, endFrame: 1140, durationInFrames: 540 },     // 10s - 19s
    scene5Journey: { startFrame: 1140, endFrame: 1380, durationInFrames: 240 },     // 19s - 23s
    scene6Finale: { startFrame: 1380, endFrame: 1680, durationInFrames: 300 },      // 23s - 28s
  },
};
