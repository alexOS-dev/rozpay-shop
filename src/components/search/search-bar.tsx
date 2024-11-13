'use client';

import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') ?? ''
  );

  // Actualizar el searchTerm cuando cambian los searchParams
  useEffect(() => {
    setSearchTerm(searchParams.get('search') ?? '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // Reset la página al buscar
    if (current.has('page')) {
      current.delete('page');
    }

    // Actualizar o eliminar el término de búsqueda
    if (searchTerm) {
      current.set('search', searchTerm);
    } else {
      current.delete('search');
    }

    // Crear la nueva URL
    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <form onSubmit={handleSearch} className='flex items-center gap-2 mb-4'>
      <Input
        placeholder='Buscar productos...'
        className='w-full max-w-xs'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type='submit' variant='ghost' size='icon'>
        <Search className='h-6 w-6' />
      </Button>
    </form>
  );
};
