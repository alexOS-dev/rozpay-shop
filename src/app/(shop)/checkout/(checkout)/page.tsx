import Link from 'next/link';

import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verificar orden',
  description: 'Verificar orden de compra',
};

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar orden' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Ajustar elementos</span>
            <Link href='/cart' className='underline mb-5'>
              Editar carrito
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout - Resumen de orden */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
