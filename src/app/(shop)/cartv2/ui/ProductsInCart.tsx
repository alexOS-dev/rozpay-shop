'use client';

import { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';

import { useCartStore } from '@/store';

import { Button } from '@/components/ui/button';
import { ProductImage, QuantitySelector } from '@/components';
import { Separator } from '@/components/ui/separator';
import { ProductsInCartSkeleton } from './skeletons/ProductsInCartSkeleton';
import { TooltipProductColor } from '@/components/ui/tooltips';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <ProductsInCartSkeleton />;
  }

  return (
    <div className='space-y-8'>
      {productsInCart.map((product) => (
        <div key={product.id} className='flex items-center justify-start'>
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
            }}
            alt={product.title}
            className='mr-5 rounded object-cover'
          />
          <div className='flex justify-between w-full'>
            <div>
              <div className='flex items-center gap-2'>
                <TooltipProductColor color={product.color.name} side='top'>
                  <Button size='icon' variant='ghost'>
                    <Circle
                      className='h-4 w-4'
                      style={{ fill: product.color.hex ?? '#fff' }}
                    />
                  </Button>
                </TooltipProductColor>

                <Separator orientation='vertical' className='h-5' />
                <h3 className='font-semibold'>{product.title}</h3>
              </div>

              <div className='flex items-center gap-4'>
                <p className='text-muted-foreground'>${product.price}</p>
                <Button
                  variant='link'
                  className='text-muted-foreground'
                  onClick={() => removeProduct(product)}
                >
                  Remover
                </Button>
              </div>
            </div>

            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};
