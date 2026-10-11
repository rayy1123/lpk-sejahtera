# Remotion Video Pipeline — PT. Sejahtera Abadi Bersama LPK

Video komersial motion graphics sinematik 28 detik (1.680 frame @ 60 FPS) berbasis **Remotion** dan **React TypeScript**.

## 1. Spesifikasi Teknis
- **Composition ID:** `LpkAbadiCommercial`
- **Resolusi:** 1920 × 1080 (16:9 Widescreen)
- **Frame Rate:** 60 FPS
- **Durasi:** Tepat 28 detik (1.680 frame)
- **Warna Identitas:** Midnight Navy (`#030811`), Deep Navy (`#06111E`), Electric Teal (`#19B8B0`), Cyan Glow (`#22D3EE`), Champagne Gold (`#D5B779`), Ivory White (`#F8FAFC`).
- **Kontak Terverifikasi:** `ratechs.id` (`info@ratechs.id`). Tanpa nomor telepon.

## 2. Struktur Timeline (5 Adegan Sinematik)
- **00–04 detik (Frame 0–239):** Scene 1 — Brand Reveal (Aperture reveal, logo resmi `logo.jpeg`, nama perusahaan, tagline).
- **04–08 detik (Frame 240–479):** Scene 2 — Kinetic Typography (MASA DEPAN -> POTENSI -> PELUANG DUNIA dalam gerakan masif satu layar penuh).
- **08–18 detik (Frame 480–1079):** Scene 3 — Career Pathways (10s total / 2.5s per jurusan):
  - A. Jepang & Tokutei Ginou (JFT A2 / N4, Hourensou)
  - B. Korea & EPS-TOPIK G-to-G (Manufaktur & UBT)
  - C. Pelatihan Pengelasan Vokasi (SMAW/GMAW 3G/4G)
  - D. Caregiver & Kaigo Internasional (Etika Medis Lansia)
- **18–24 detik (Frame 1080–1439):** Scene 4 — Preparation Journey (Montase gerak maju 4 tahap persiapan).
- **24–28 detik (Frame 1440–1679):** Scene 5 — Brand Finale & Climax (Logo, MASA DEPAN DIMULAI DARI SINI, CTA DAFTAR SEKARANG, ratechs.id).

## 3. Cara Menjalankan & Rendering
Masuk ke direktori `video/`:
```bash
cd video
npm install
```

### Preview Interaktif:
```bash
npm run preview
# Membuka Remotion Studio di http://localhost:3000
```

### Render Video MP4 H.264:
```bash
npm run render
# Menghasilkan file output/commercial-28s.mp4
```

### Render Diagnostic Stills (Frame 0, 240, 480, 1080, 1679):
```bash
npm run render:stills
# Menghasilkan output/frame-*.png
```

## 4. Integrasi Website
File video hasil render otomatis tersambung ke pemutar di:
`apps/web/public/promo-video.html` dan `http://localhost:3001/promo-video.html`.
