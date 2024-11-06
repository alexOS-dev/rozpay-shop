import type { Metadata } from 'next';
import { inter } from '@/config/fonts';

import './globals.css';
import { Providers } from '@/components';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: {
    template: '%s - BIG | Shop',
    default: 'Inicio - BIG | Shop',
  },
  description: 'Una tienda virtual de productos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
