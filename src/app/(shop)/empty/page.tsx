import { buttonVariants } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function EmptyPage() {
  return (
    <div className='flex flex-col items-center justify-center h-[80vh] gap-6'>
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>Tu carrito está vacío</h1>
        <div className='flex items-center justify-center'>
          <ShoppingCart className='h-16 w-16 text-gray-500 dark:text-gray-500 mr-4' />
        </div>
        <p className='text-gray-500 dark:text-gray-400'>
          Parece que aún no has agregado nada a tu carrito.
        </p>
      </div>

      <Link
        // className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
        className={buttonVariants({ variant: 'outline' })}
        href='/'
      >
        <ShoppingCart className='pr-2' />
        Continuar comprando
      </Link>
    </div>
  );
}
