'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { toast } from 'sonner';

import { useAddressStore, useCartStore } from '@/store';
import { placeOrder } from '@/actions';
import { currencyFormat } from '@/utils';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const PlaceOrder = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // Estado para verificar si está montado
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  // Utilizar memoización para el resumen del carrito
  const summary = useMemo(() => {
    return useCartStore.getState().getSummaryInformation();
  }, [useCartStore((state) => state.cart)]);

  const { itemsInCart, subTotal, tax, total } = summary;
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setIsMounted(true); // Se activa cuando el componente se monta
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      color: product.color,
    }));

    // Server Action
    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      toast.error(resp.message);
      return;
    }

    //* Todo salió bien
    clearCart();
    router.replace('/orders/' + resp.order?.id);
  };

  if (!isMounted) {
    return <p>Cargando...</p>; // Placeholder mientras la página se hidrata
  }

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
      <div className='mb-10'>
        <p className='text-xl'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.province.name}
        </p>
        <p>{address.phone}</p>
      </div>

      <Separator className='mb-10' />

      <h2 className='text-2xl mb-2'>Resumen de orden</h2>

      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className='text-right'>{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>

        <span className='mt-5 text-2xl'>Total:</span>
        <span className='mt-5 text-2xl text-right'>
          {currencyFormat(total)}
        </span>
      </div>

      <div className='mt-5 mb-2 w-full'>
        <p className='mb-5'>
          <span className='text-xs'>
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{' '}
            <a href='#' className='underline'>
              términos y condiciones
            </a>{' '}
            y{' '}
            <a href='#' className='underline'>
              política de privacidad
            </a>
          </span>
        </p>

        <p className='text-red-500'>{errorMessage}</p>

        <Button
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          variant='default'
        >
          Confirmar compra
        </Button>
      </div>
    </div>
  );
};
