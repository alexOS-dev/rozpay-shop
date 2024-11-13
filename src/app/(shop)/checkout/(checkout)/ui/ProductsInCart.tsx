'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { ProductImage } from '@/components';
import { Label } from '@/components/ui/label';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.color.id}`} className='flex mb-5'>
          <ProductImage
            alt={product.title}
            height={200}
            width={200}
            src={`${product.image}`}
            className='mr-5 rounded'
          />

          {/* <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: '200px',
              height: '100px',
            }}
            alt={product.title}
            className='mr-5 rounded'
          /> */}

          <div className='flex flex-col gap-1'>
            <Label className='font-bold text-lg'>{product.title}</Label>
            <span>Cantidad: {product.quantity}</span>
            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
