import { ShoppingCart } from 'lucide-react';
import { PersonIcon } from '@radix-ui/react-icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductImage } from '../../product-image/ProductImage';
import type { Category, Color } from '@/interfaces';

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
  categoryId: number;
  brandId: string | null; // Permitir que sea null
  ProductImage: ProductImage[];
  images: string[];
}

export const CarouselProduct = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
      <div className='relative cursor-pointer'>
        <ProductImage
          src={product.ProductImage[0].url}
          alt={product.title}
          width={500}
          height={500}
          className='aspect-square object-fill'
        />

        <Badge
          variant='default'
          className='absolute top-4 right-4 rounded-full px-3 py-1'
        >
          <PersonIcon className='w-4 h-4 mr-1' />
          {product.category.name}
        </Badge>
      </div>
      <div className='space-y-2 p-6'>
        <p className='text-xs font-bold hover:underline hover:cursor-pointer truncate-title'>
          {product.title}
        </p>
        <div className='flex sm:flex-col md:flex-col lg:flex-row items-center justify-between gap-2'>
          <p className='text-2xl font-bold'>
            {product.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
          <Button size='sm'>
            <ShoppingCart className='w-4 h-4 mr-2' />
            Agregar
          </Button>
        </div>
        {product.brandId && (
          <p className='text-sm text-gray-500'>Marca: {product.brandId}</p>
        )}
      </div>
    </Card>
  );
};
