import type { Metadata } from 'next';
import { inter } from '@/config/fonts';

import './globals.css';
import { Providers } from '@/components';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: {
    template: '%s - RozPay | Shop',
    default: 'Inicio - RozPay | Shop',
  },
  description: 'Una tienda virtual de productos',
  icons: {
    icon: '/favicon.ico',
  },
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
