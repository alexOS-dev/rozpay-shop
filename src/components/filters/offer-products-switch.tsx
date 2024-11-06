'use client';

import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { BadgePercent } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const OfferProductsSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Si no hay el parámetro 'offer', el estado inicial será falso
  const [offerProducts, setOfferProducts] = useState(
    searchParams.get('offer') === 'true'
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === 'false') {
        params.delete(name); // Eliminamos el parámetro si es 'false'
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleOfferChange = () => {
    const newOfferValue = !offerProducts; // Calcula el nuevo valor del switch
    setOfferProducts(newOfferValue); // Actualiza el estado

    // Si el switch está activado, agregamos 'offer=true' a la URL
    if (newOfferValue) {
      router.push(`${pathname}?${createQueryString('offer', 'true')}`);
    } else {
      router.push(`${pathname}?${createQueryString('offer', 'false')}`);
    }
  };

  useEffect(() => {
    // Sincroniza el estado del switch cuando cambie el URL
    setOfferProducts(searchParams.get('offer') === 'true');
  }, [searchParams]);

  return (
    <div className='flex items-center space-x-2'>
      <Switch
        checked={offerProducts}
        onCheckedChange={handleOfferChange}
        className='data-[state=checked]:bg-rose-500'
      />
      <Label className='flex items-center gap-1'>
        <BadgePercent
          className={cn({
            'h-5 w-5 text-rose-500 dark:text-rose-400': offerProducts,
            'h-5 w-5 text-gray-500 dark:text-gray-200': !offerProducts,
          })}
        />
        Oferta
      </Label>
    </div>
  );
};
