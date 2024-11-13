import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marcas - Caggy | Shop',
  description: 'Gestión de marcas',
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
