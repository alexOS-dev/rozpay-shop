import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductImage } from '../../product-image/ProductImage';
import type { Category } from '@/interfaces';
import Link from 'next/link';

interface ProductImage {
  url: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  category: Category;
  Brand: { id: string; name: string } | null;
  categoryId: number;
  brandId: string | null; // Permitir que sea null
  ProductImage: ProductImage[];
  images: string[];
}

export const CarouselProduct = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className='overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
        <div className='relative cursor-pointer aspect-square'>
          <ProductImage
            src={product.ProductImage[0].url}
            alt={product.title}
            width={300}
            height={300}
            className='object-contain'
          />
        </div>
        <div className='space-y-2 p-4'>
          <p className='text-base font-medium hover:underline hover:cursor-pointer truncate'>
            {product.title}
          </p>
          <div className='flex items-center justify-between gap-1'>
            <p className='text-lg font-bold'>
              {product.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </div>
          {product.brandId && (
            <p className='text-sm text-gray-500 truncate capitalize'>
              {product.Brand?.name}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
};
