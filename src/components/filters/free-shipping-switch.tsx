'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { Truck } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

export const FreeShippingSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const freeShipping = searchParams.get('free_shipping') === 'true';

  const createQueryString = useCallback(
    (name: string, value?: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(name); // Elimina el parámetro si no es necesario
      } else {
        params.set(name, value!); // Actualiza o añade el parámetro
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleFreeShippingChange = (checked: boolean) => {
    if (checked) {
      router.push(`${pathname}?${createQueryString('free_shipping', 'true')}`);
    } else {
      router.push(`${pathname}?${createQueryString('free_shipping', null)}`); // Elimina el parámetro si no está activado
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <Switch
        checked={freeShipping}
        onCheckedChange={handleFreeShippingChange}
        className='data-[state=checked]:bg-green-500'
      />
      <Label className='flex items-center gap-1'>
        <Truck
          className={cn({
            'h-5 w-5 text-emerald-600 dark:text-emerald-300': freeShipping,
            'h-5 w-5 text-gray-500 dark:text-gray-200': !freeShipping,
          })}
        />
        Envío gratuito
      </Label>
    </div>
  );
};
