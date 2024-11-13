'use client';

import Image from 'next/image';
import { SyntheticEvent, useState } from 'react';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className='grid grid-cols-12 gap-4'>
      {/* Thumbnails */}
      <div className='col-span-2 flex flex-col gap-4'>
        {productImage.map((image, index) => (
          <button
            className={`border rounded-lg overflow-hidden transition-all ${
              currentIndex === index
                ? 'border-blue-300 hover:border-blue-400'
                : 'border-gray-200 hover:border-gray-900 dark:border-gray-800 dark:hover:border-gray-50'
            }`}
            key={image.id}
            onClick={() => {
              api?.scrollTo(index);
              setCurrentIndex(index);
            }}
          >
            <Image
              alt={`${title} thumbnail ${index + 1}`}
              className='w-full h-auto object-contain'
              height={120}
              width={100}
              src={`/products/${image.url}`}
            />
          </button>
        ))}
      </div>
      <div className='col-span-10'>
        <Carousel
          setApi={setApi}
          className='w-full aspect-[2/3] rounded-lg overflow-hidden'
        >
          <CarouselContent>
            {productImage.map((image, index) => (
              <CarouselItem
                key={image.id}
                className='flex items-center justify-center'
                data-index={index}
              >
                <div className='relative w-full h-[500px] flex items-center justify-center bg-white'>
                  <Image
                    alt={`${title} imagen`}
                    className='max-w-full max-h-full w-auto h-auto object-contain'
                    src={`/products/${image.url}`}
                    width={800}
                    height={800}
                    priority={image === productImage[0]}
                  />
                </div>
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
