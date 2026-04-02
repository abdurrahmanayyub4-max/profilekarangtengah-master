import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/app/user/components/Navbar';
import Footer from '@/app/user/components/Footer';

export const metadata: Metadata = {
  title: 'Padukuhan Karangtengah - Desa yang Asri, Maju, dan Sejahtera',
  description: 'Website resmi Padukuhan Karangtengah',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
