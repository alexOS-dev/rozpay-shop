import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Home,
  Cpu,
  Smartphone,
  Laptop,
  Headphones,
  Tablet,
} from 'lucide-react';

export function PageNotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 text-black flex flex-col items-center justify-center p-4'>
      <div className='w-full max-w-2xl text-center'>
        <div className='mb-8'>
          <div className='text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>
            404
          </div>
        </div>

        <h1 className='text-4xl font-bold mb-4'>Oops! Página no encontrada</h1>
        <p className='text-xl mb-8'>
          La página que buscas no se encuentra disponible.
        </p>

        <div className='mb-8'>
          <div className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>Categorías populares</h2>
            <div className='flex flex-wrap justify-center gap-4'>
              {[
                {
                  name: 'Smartphones',
                  icon: Smartphone,
                  url: 'articulos/smartphone',
                },
                { name: 'Tablets', icon: Tablet, url: '/articulos/tablet' },
                { name: 'Laptops', icon: Laptop, url: '/articulos/laptop' },
                {
                  name: 'Accesorios',
                  icon: Headphones,
                  url: '/articulos/accessory',
                },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.url}
                  className='flex items-center bg-slate-300 hover:bg-slate-200 rounded-full px-4 py-2 transition-colors duration-200'
                >
                  <category.icon className='w-5 h-5 mr-2' />
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href='/'>
            <Button className='bg-purple-600 hover:bg-purple-700 text-lg px-6 py-3 antialiased'>
              <Home className='w-5 h-5 mr-2' />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
