'use client';

import Image from 'next/image';
import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { ProductImage } from '@/interfaces';

interface Props {
  title: string;
  productImage: ProductImage[];
}

export const ProductCarousel = ({ title, productImage }: Props) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-2 flex flex-col gap-4'>
        {/* Thumbnails */}
        {productImage.map((image, index) => (
          <button
            className='border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50'
            key={image.id}
            onClick={() => api?.scrollTo(index)}
          >
            <Image
              alt={`${title} image preview`}
              className='aspect-[5/6] object-cover'
              height={220}
              src={`/products/${image.url}`}
              width={200}
            />
            <span className='sr-only'>{`${title} thumbnail`}</span>
          </button>
        ))}
      </div>
      <div className='col-span-10'>
        <Carousel
          setApi={setApi}
          className='w-full aspect-[2/3] rounded-lg overflow-hidden'
        >
          <CarouselContent>
            {productImage.map((image) => (
              <CarouselItem key={image.id}>
                <Image
                  alt={`${title} image`}
                  className='object-cover cursor-grab active:cursor-grabbing'
                  height={1400}
                  src={`/products/${image.url}`}
                  style={{
                    aspectRatio: '1100/1400',
                    objectFit: 'cover',
                  }}
                  width={1100}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
