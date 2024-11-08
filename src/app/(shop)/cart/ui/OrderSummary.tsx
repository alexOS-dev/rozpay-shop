'use client';

import { useEffect, useMemo, useState } from 'react';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Detectar si el componente está montado para evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const productsInCart = useCartStore((state) => state.cart);

  // Memoizar el cálculo del resumen
  const summary = useMemo(() => {
    return useCartStore.getState().getSummaryInformation();
  }, [productsInCart]);

  const { itemsInCart, subTotal, tax, total } = summary;

  // Mostrar un loader o algún placeholder hasta que se monte el componente
  if (!isMounted) {
    return <div>Cargando...</div>; // Puedes agregar un Skeleton aquí si prefieres
  }

  return (
    <div className='grid gap-4'>
      <div className='flex items-center justify-between'>
        <span>No. Productos</span>
        <span>
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <span>Subtotal</span>
        <span>{currencyFormat(subTotal)}</span>
      </div>
      <div className='flex items-center justify-between'>
        <span>Impuestos (15%)</span>
        <span className='text-green-500'>{currencyFormat(tax)}</span>
      </div>
      <div className='flex items-center justify-between font-medium'>
        <span>Total</span>
        <span>{currencyFormat(total)}</span>
      </div>
    </div>
  );
};
