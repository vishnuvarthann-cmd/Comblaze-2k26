import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WpDev — High-Performance Scrollytelling Mechanical Keyboard',
  description: 'A luxury, editorial hardware landing page featuring scroll-linked exploded keyboard image sequence scrollytelling.',
  keywords: ['mechanical keyboard', 'wpdev', 'scrollytelling', 'framer motion', 'nextjs', 'canvas'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#ECECEC] text-black/90 antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
