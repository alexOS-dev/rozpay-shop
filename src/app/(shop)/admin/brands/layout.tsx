import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marcas - BIG | SHOP',
  description: 'Gestión de marcas',
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
