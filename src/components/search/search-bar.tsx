'use client';

import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useSearchParams } from 'next/navigation';

export const SearchBar = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';

  // console.log(search);
  return (
    <div className='flex items-center gap-2 mb-4'>
      <Input placeholder='Buscar' className='w-full max-w-xs' />{' '}
      <Button variant='ghost' size='icon'>
        <Search className='h-6 w-6' />
      </Button>
      <span>{search}</span>
    </div>
  );
};
