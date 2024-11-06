'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useCallback } from 'react';

export const ProductOrderSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const onOrderChange = (value: string) => {
    const query = createQueryString(
      'order',
      value === 'relevance' ? null : value
    );
    router.push(`/?${query}`);
  };

  const currentOrder = searchParams.get('order') || 'relevance';

  return (
    <div className='flex flex-col gap-1'>
      <span className='text-xl'>Ordenar</span>
      <Select value={currentOrder} onValueChange={onOrderChange}>
        <SelectTrigger>
          <SelectValue placeholder='Más relevantes' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='relevance'>Más relevantes</SelectItem>
            <SelectSeparator />
            <SelectItem value='asc'>Menor precio</SelectItem>
            <SelectItem value='desc'>Mayor precio</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
