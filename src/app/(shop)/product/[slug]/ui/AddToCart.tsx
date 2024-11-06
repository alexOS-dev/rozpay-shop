'use client';

import { useState } from 'react';
import { Circle, ShoppingBasket } from 'lucide-react';

import { useCartStore } from '@/store';

import { Button } from '@/components/ui/button';
import { FavoriteButton } from '@/components';
import { QuantitySelector } from './QuantitySelector';

import type { CartProduct } from '@/interfaces';
import { ProductBySlug } from '../product-by-slug.interface';
import { TooltipProductColor } from '@/components/ui/tooltips';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

interface Props {
  product: ProductBySlug;
}

export const AddToCart = ({ product }: Props) => {
  const router = useRouter();
  const addProductToCart = useCartStore((state) => state.addProductTocart);

  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      color: product.Color!,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    router.push('/checkout');
  };

  // TODO: Check why on AddToCart execution, the fields not reset

  return (
    <div className='grid gap-4 md:gap-10'>
      <div className='flex items-end justify-between w-fit gap-4'>
        <QuantitySelector
          quantity={quantity}
          onQuantityChanged={setQuantity}
          inStock={product.inStock}
        />
        <div className='flex items-center gap-2'>
          <Separator orientation='vertical' className='h-6' />
          <TooltipProductColor color={product.Color?.name ?? 'blanco'}>
            <Button size='icon' variant='ghost'>
              <Circle
                className='h-5 w-5'
                style={{ fill: product.Color?.hex ?? '#fff' }}
              />
            </Button>
          </TooltipProductColor>
          <span className='capitalize text-sm text-gray-700 dark:text-gray-500'>
            Color
          </span>
        </div>
      </div>

      <div className='flex flex-col gap-2 min-[400px]:flex-row'>
        <Button size='lg' onClick={addToCart}>
          <ShoppingBasket className='w-4 h-4 mr-2' />
          Comprar
        </Button>
        <FavoriteButton productId={product.id} />
      </div>
    </div>
  );
};
