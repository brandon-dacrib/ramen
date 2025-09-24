import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FlavorCraft - Premium Ramen Flavor Packets',
    template: '%s | FlavorCraft'
  },
  description: 'Transform your noodles with authentic ramen flavor packets from around the world. We sell concentrated flavor sachets - just add your own noodles for restaurant-quality ramen at home!',
  keywords: [
    'ramen flavor packets',
    'flavor sachets', 
    'seasoning packets',
    'ramen seasoning',
    'instant ramen flavoring',
    'asian seasonings',
    'japanese flavoring',
    'korean ramen packets',
    'thai tom yum seasoning',
    'miso flavor packet',
    'tonkotsu seasoning',
    'premium ramen flavoring'
  ],
  authors: [{ name: 'FlavorCraft Team' }],
  creator: 'FlavorCraft',
  publisher: 'FlavorCraft',
  category: 'Food & Beverage',
  classification: 'E-commerce',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flavorcraft.com',
    siteName: 'FlavorCraft',
    title: 'FlavorCraft - Premium Ramen Flavor Packets',
    description: 'Transform your noodles with authentic ramen flavor packets from around the world. Premium concentrated seasonings for the perfect bowl.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FlavorCraft - Premium Ramen Flavor Packets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlavorCraft - Premium Ramen Flavor Packets',
    description: 'Transform your noodles with authentic ramen flavor packets from around the world.',
    images: ['/twitter-image.jpg'],
    creator: '@flavorcraft',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://flavorcraft.com',
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