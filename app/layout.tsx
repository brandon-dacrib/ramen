import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'FlavorCraft - Premium Ramen Flavor Packets',
  description: 'Transform your noodles with authentic ramen flavor packets from around the world. We sell concentrated flavor sachets - just add your own noodles!',
  keywords: 'ramen flavor packets, flavor sachets, seasoning packets, ramen seasoning, instant ramen flavoring, asian seasonings',
  authors: [{ name: 'FlavorCraft Team' }],
  openGraph: {
    title: 'FlavorCraft - Premium Ramen Flavor Packets',
    description: 'Transform your noodles with authentic ramen flavor packets from around the world. Premium concentrated seasonings for the perfect bowl.',
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