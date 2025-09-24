import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'RamenShop - Premium Ramen Noodle Packets',
  description: 'Discover the finest selection of ramen noodle packets from around the world. Authentic flavors, premium quality, fast delivery.',
  keywords: 'ramen, noodles, instant noodles, asian food, ramen packets',
  authors: [{ name: 'RamenShop Team' }],
  openGraph: {
    title: 'RamenShop - Premium Ramen Noodle Packets',
    description: 'Discover the finest selection of ramen noodle packets from around the world.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#22c55e',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </body>
    </html>
  );
}