'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { Product } from '@/interfaces';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  const isCloudinaryImage = displayImage
    ? displayImage.includes('cloudinary')
    : false;

  return (
    <div className='rounded-md overflow-hidden fade-in h-full'>
      <div className='flex flex-col h-full'>
        {/* Fixed height container for the image */}
        <div className='relative w-full aspect-square'>
          <Link href={`/product/${product.slug}`} className='block h-full'>
            <div className='relative h-full w-full'>
              <Image
                src={
                  isCloudinaryImage ? displayImage : `/products/${displayImage}`
                }
                alt={product.title}
                className={cn(
                  'object-contain hover:scale-105 transition-all duration-300 ease-in-out'
                )}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                onMouseEnter={() =>
                  setDisplayImage(product.images[1] ?? product.images[0])
                }
                onMouseLeave={() => setDisplayImage(product.images[0])}
              />
            </div>
          </Link>
        </div>

        {/* Product info section */}
        <div className='p-4 flex flex-col flex-grow'>
          <Link
            className='hover:text-blue-600'
            href={`/product/${product.slug}`}
          >
            {product.title}
          </Link>
          <span className='font-bold'>${product.price}</span>
        </div>
      </div>
    </div>
  );
};
