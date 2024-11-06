'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const CategorySelector = () => {
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

  const onCategoryChange = (value: string) => {
    const query = createQueryString('category', value === 'all' ? null : value);
    router.push(`/?${query}`);
  };

  const currentCategory = searchParams.get('category') || 'all';

  return (
    <div className='flex flex-col gap-1'>
      <span className='text-xl'>Categorías</span>
      <Select value={currentCategory} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder='Todos' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Seleccione un tipo</SelectLabel>
            <SelectItem value='all'>Todos</SelectItem>
            <SelectItem value='smartphone'>Celulares</SelectItem>
            <SelectItem value='laptop'>Notebooks</SelectItem>
            <SelectItem value='tablet'>Tablets</SelectItem>
            <SelectItem value='accessory'>Accesorios</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
