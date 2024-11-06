'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { useCallback, useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

export const PriceFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get('min') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max') || '');

  const createQueryString = useCallback(
    (params: { min?: string; max?: string }) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      return newParams.toString();
    },
    [searchParams]
  );

  const debouncedUpdateURL = useMemo(
    () =>
      debounce((min: string, max: string) => {
        const queryString = createQueryString({ min, max });
        router.push(`${pathname}?${queryString}`);
      }, 500),
    [createQueryString, pathname, router]
  );

  const handlePriceChange = useCallback(
    (type: 'min' | 'max', value: string) => {
      if (type === 'min') {
        setMinPrice(value);
      } else if (type === 'max') {
        setMaxPrice(value);
      }
      debouncedUpdateURL(
        type === 'min' ? value : minPrice,
        type === 'max' ? value : maxPrice
      );
    },
    [minPrice, maxPrice, debouncedUpdateURL]
  );

  useEffect(() => {
    setMinPrice(searchParams.get('min') || '');
    setMaxPrice(searchParams.get('max') || '');
  }, [searchParams]);

  // Limpiar el debounce al desmontar el componente
  useEffect(() => {
    return () => {
      debouncedUpdateURL.cancel();
    };
  }, [debouncedUpdateURL]);

  return (
    <div>
      <Label>Precio</Label>
      <div className='flex items-center justify-between gap-3'>
        <Input
          type='number'
          placeholder='min'
          value={minPrice}
          onChange={(e) => handlePriceChange('min', e.target.value)}
        />
        <Separator orientation='vertical' className='h-5' />
        <Input
          type='number'
          placeholder='max'
          value={maxPrice}
          onChange={(e) => handlePriceChange('max', e.target.value)}
        />
      </div>
    </div>
  );
};
