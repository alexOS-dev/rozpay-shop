import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Productos - BIG | Shop',
  description: 'Gestión de productos',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
