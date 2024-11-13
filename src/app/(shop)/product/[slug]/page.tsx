import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

import { getProductBySlug } from '@/actions';

import { AddToCart } from './ui/AddToCart';
import { Label } from '@/components/ui/label';
import { ProductCarousel } from './ui/ProductCarousel';

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className='grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6'>
      <ProductCarousel
        title={product?.title ?? 'Product title'}
        productImage={product?.ProductImage ?? []}
      />
      {/* Product Information */}
      <div className='grid gap-6 md:gap-10'>
        <div className='grid gap-4'>
          <h1 className='font-bold text-3xl lg:text-4xl'>{product?.title}</h1>
          <div className='flex items-center gap-4'>
            <div className='text-4xl font-bold'>${product?.price}</div>
          </div>
          <div className='grid gap-1 dark:text-gray-400'>
            <Label className='text-base' htmlFor='size'>
              Descripción
            </Label>
            <p className='text-sm leading-loose text-gray-500 '>
              {product?.description}
            </p>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
