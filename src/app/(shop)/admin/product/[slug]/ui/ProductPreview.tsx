'use client';

import Image from 'next/image';
import { useState } from 'react';

import { DeleteImageDialog } from './DeleteImageDialog';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import type { Product, ProductImage as ProductWithImage } from '@/interfaces';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
}

export const ProductPreview = ({ product }: Props) => {
  const [api, setApi] = useState<CarouselApi>();

  const images = product.ProductImage ?? [];
  const isCloudinaryImage = images[0]?.url?.includes('cloudinary');

  return (
    <div>
      {images.length > 0 ? (
        <>
          <Carousel
            className='w-full rounded-lg overflow-hidden'
            setApi={setApi}
          >
            <CarouselContent>
              {images?.map((image) => (
                <CarouselItem key={image.id}>
                  <Image
                    alt={product.title ?? 'Product Image'}
                    className='w-full rounded-lg object-cover'
                    height='600'
                    src={
                      isCloudinaryImage ? image.url : `/products/${image.url}`
                    }
                    style={{
                      aspectRatio: '500/600',
                      objectFit: 'cover',
                    }}
                    width='500'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Thumbnails */}
          <div className='grid grid-cols-4 gap-2 mt-4'>
            {product.ProductImage?.map((image, index) => (
              <div
                key={image.id}
                className='col-span-1 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50 hover:cursor-pointer'
              >
                <button
                  key={image.id}
                  onClick={() => api?.scrollTo(index)}
                  className='col-span-1 border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50 hover:cursor-pointer'
                >
                  <Image
                    alt={product.title ?? 'Preview thumnail'}
                    className='aspect-square object-cover w-full'
                    height={300}
                    src={
                      isCloudinaryImage ? image.url : `/products/${image.url}`
                    }
                    width={300}
                  />
                  <span className='sr-only'>{product.title}</span>
                </button>
                <DeleteImageDialog imageId={image.id} imageUrl={image.url} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <SkeletonProductPreview />
      )}
    </div>
  );
};

function SkeletonProductPreview() {
  return (
    <>
      <Image
        alt='Product Image'
        className='w-full rounded-lg object-cover'
        height='600'
        src='/imgs/placeholder.svg'
        style={{
          aspectRatio: '500/600',
          objectFit: 'cover',
        }}
        width='500'
      />
      <div className='grid grid-cols-4 gap-2 mt-4'>
        <button className='border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50'>
          <Image
            alt='Preview thumbnail'
            className='aspect-square object-cover w-full'
            height='100'
            src='/imgs/placeholder.svg'
            width='100'
          />
          <span className='sr-only'>View Image 1</span>
        </button>

        <button className='border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50'>
          <Image
            alt='Preview thumbnail'
            className='w-full aspect-square object-cover'
            height='100'
            src='/imgs/placeholder.svg'
            width='100'
          />
          <span className='sr-only'>View Image 2</span>
        </button>
      </div>
    </>
  );
}
