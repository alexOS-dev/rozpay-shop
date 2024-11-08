import Link from 'next/link';

import { Metadata } from 'next';

import { buttonVariants } from '@/components/ui/button';
import { OrderSummary } from './ui/OrderSummary';
import { ProductsInCart } from './ui/ProductsInCart';
import { Separator } from '@/components/ui/separator';
import { SimilarProductsCarousel } from '@/components/product/similar-products-carousel/SimilarProductsCarousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Carrito',
  description: 'Tu carrito de compras',
};

export default function CartPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <p>Cart Page</p>
      <main className='flex-1 py-10 px-6'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='col-span-2 space-y-8'>
            <Card>
              <CardHeader>
                <CardTitle className='text-2xl'>Carrito</CardTitle>
                <CardDescription>
                  Los productos que agregues al carrito aparecerán aquí
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductsInCart />
              </CardContent>
              <Separator className='my-5' />
              <CardFooter className='flex flex-col gap-4'>
                <Link
                  href='/'
                  className={buttonVariants({
                    variant: 'ghost',
                    className: 'w-full underline',
                  })}
                >
                  Ver más productos
                </Link>
                <SimilarProductsCarousel />
              </CardFooter>
            </Card>
          </div>
          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <CardTitle>Resumen de compra</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderSummary />
              </CardContent>
              <CardFooter>
                <Link
                  href='/checkout/address'
                  className={buttonVariants({
                    variant: 'default',
                    className: 'w-full',
                  })}
                >
                  Compra
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
