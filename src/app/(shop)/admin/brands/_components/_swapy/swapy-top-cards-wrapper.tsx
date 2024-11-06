'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

const SwapyTopCards = dynamic(() => import('./swapy-top-cards'), {
  ssr: false,
});

const DEFAULT = {
  '1': 'total-brands',
  '2': 'total-products',
  '3': 'average-products-per-brand',
};

interface Props {
  totalProducts: number;
  totalBrands: number;
  averageProductsPerBrand: number;
}

export default function SwapyTopCardsWrapper({
  totalProducts,
  totalBrands,
  averageProductsPerBrand,
}: Props) {
  const [key, setKey] = useState(0);

  const resetSwapy = () => {
    localStorage.setItem('slotItem', JSON.stringify(DEFAULT));
    setKey((prevKey) => prevKey + 1); // Cambiar la clave forzará el desmontaje y montaje
  };

  return (
    <div className='w-full h-full flex flex-col items-end mb-6'>
      <Button
        onClick={resetSwapy}
        className='rounded-full relative bottom-2 sm:right-8'
        size='icon'
        variant='outline'
      >
        <ReloadIcon className='w-4 h-4' />
        <span className='sr-only'>Reiniciar orden de tarjetas</span>
      </Button>
      {/* El componente SwapyTopCards se desmontará y montará cada vez que la clave cambie */}
      <SwapyTopCards
        key={key}
        totalProducts={totalProducts}
        totalBrands={totalBrands}
        averageProductsPerBrand={averageProductsPerBrand}
      />
    </div>
  );
}
