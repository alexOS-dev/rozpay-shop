'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ShoppingCart } from 'lucide-react';

import { titleFont } from '@/config/fonts';
import { useCartStore } from '@/store';

// import { ModeToggle } from './mode-toggle';
import Sidebar from '../sidebar/Sidebar';

export const TopMenu = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* Logo */}
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            BIG
          </span>
          <span> | SHOP</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/articulos/smartphone'
        >
          Celulares
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/articulos/laptop'
        >
          Notebooks
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/articulos/tablet'
        >
          Tablets
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/articulos/accessory'
        >
          Accesorios
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className='flex items-center'>
        {/* <Link href='/search' className='mx-2'>
          <Search className='w-5 h-5' />
        </Link> */}
        {/* <ModeToggle /> */}

        <Link
          href={totalItemsInCart === 0 && loaded ? '/empty' : '/cartv2'}
          className='mx-2'
        >
          <div className='relative'>
            {loaded && totalItemsInCart > 0 && (
              <span className='fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white'>
                {totalItemsInCart}
              </span>
            )}
            <ShoppingCart className='w-5 h-5' />
          </div>
        </Link>

        <Sidebar />
      </div>
    </nav>
  );
};
