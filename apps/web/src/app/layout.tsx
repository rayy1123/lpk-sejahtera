import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PT. Sejahtera Abadi Bersama — Lembaga Pelatihan Kerja (LPK)',
  description: 'Siapkan Keterampilanmu, Raih Peluang Karier Masa Depan. Lembaga Pelatihan Kerja dan Bahasa resmi berstandar industri domestik dan internasional.',
  icons: {
    icon: '/logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface-muted antialiased">
        {children}
      </body>
    </html>
  );
}
