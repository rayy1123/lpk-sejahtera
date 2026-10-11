import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PT. Sejahtera Abadi Bersama — Lembaga Pelatihan Kerja (LPK)',
  description: 'Mempersiapkan Masa Depan, Membuka Peluang Dunia. Lembaga Pelatihan Kerja resmi berstandar industri domestik dan internasional.',
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
    <html lang="id" className={plusJakartaSans.className}>
      <body className="min-h-screen flex flex-col bg-surface-muted antialiased">
        {children}
      </body>
    </html>
  );
}
