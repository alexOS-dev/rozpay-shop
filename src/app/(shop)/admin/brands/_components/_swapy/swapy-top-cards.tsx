'use client';

import { useEffect } from 'react';
import { createSwapy } from 'swapy';
import { GripVertical } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const DEFAULT = {
  '1': 'total-brands',
  '2': 'total-products',
  '3': 'average-products-per-brand',
};

function TotalBrandsCard({ totalBrands }: { totalBrands: number }) {
  return (
    <div
      className='w-full h-full flex items-center relative'
      data-swapy-item='total-brands'
    >
      <Card className='w-full h-full flex'>
        {/* Barra lateral izquierda con el ícono centrado */}
        <div
          className='w-5 bg-slate-100 flex justify-center items-center cursor-grab active:cursor-grabbing rounded-l-xl'
          data-swapy-handle
        >
          <GripVertical className='w-5 h-5 text-slate-600' />
        </div>
        {/* Contenido principal de la card */}
        <div className='flex-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Marcas Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalBrands}</div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

function TotalProductsCard({ totalProducts }: { totalProducts: number }) {
  return (
    <div
      className='w-full h-full flex items-center justify-center relative'
      data-swapy-item='total-products'
    >
      <Card className='w-full h-full flex'>
        <div
          className='w-5 bg-slate-100 flex justify-center items-center cursor-grab active:cursor-grabbing rounded-l-xl'
          data-swapy-handle
        >
          <GripVertical className='w-5 h-5 text-slate-600' />
        </div>

        <div className='flex-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Productos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalProducts}</div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

function AverageProductsCard({
  averageProductsPerBrand,
}: {
  averageProductsPerBrand: number;
}) {
  return (
    <div
      className='w-full h-full flex items-center justify-center relative'
      data-swapy-item='average-products-per-brand'
    >
      <Card className='w-full h-full flex'>
        <div
          className='w-5 bg-slate-100 flex justify-center items-center cursor-grab active:cursor-grabbing rounded-l-xl'
          data-swapy-handle
        >
          <GripVertical className='w-5 h-5 text-slate-600' />
        </div>

        <div className='flex-1'>
          <CardHeader className='flex flex-col items-start justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Promedio</CardTitle>
            <CardDescription className='text-xs'>
              Promedio de productos por marca
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{averageProductsPerBrand}</div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

function getItemById(
  itemId:
    | 'total-products'
    | 'total-brands'
    | 'average-products-per-brand'
    | null,
  totalBrands: number,
  totalProducts: number,
  averageProductsPerBrand: number
) {
  switch (itemId) {
    case 'total-brands':
      return <TotalBrandsCard totalBrands={totalBrands} />;
    case 'total-products':
      return <TotalProductsCard totalProducts={totalProducts} />;
    case 'average-products-per-brand':
      return (
        <AverageProductsCard
          averageProductsPerBrand={averageProductsPerBrand}
        />
      );
  }
}

interface Props {
  totalProducts: number;
  totalBrands: number;
  averageProductsPerBrand: number;
}
export default function SwapyTopCards({
  totalProducts,
  totalBrands,
  averageProductsPerBrand,
}: Props) {
  const slotItems: Record<
    string,
    'total-products' | 'total-brands' | 'average-products-per-brand' | null
  > = localStorage.getItem('slotItem')
    ? JSON.parse(localStorage.getItem('slotItem')!)
    : DEFAULT;

  useEffect(() => {
    const container = document.querySelector('#container')!;
    const swapy = createSwapy(container);
    swapy.onSwap(({ data }) => {
      localStorage.setItem('slotItem', JSON.stringify(data.object));
    });
  }, []);

  return (
    <div className='w-full h-full flex flex-col'>
      <div
        id='container'
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-9 w-full h-full'
      >
        <div
          className='bg-gray-100 dark:bg-slate-900 rounded-xl flex items-center justify-center h-32'
          data-swapy-slot='1'
        >
          {getItemById(
            slotItems['1'],
            totalBrands,
            totalProducts,
            averageProductsPerBrand
          )}
        </div>

        <div
          className='bg-gray-100 dark:bg-slate-900 rounded-xl flex items-center justify-center h-32'
          data-swapy-slot='2'
        >
          {getItemById(
            slotItems['2'],
            totalBrands,
            totalProducts,
            averageProductsPerBrand
          )}
        </div>

        <div
          className='bg-gray-100 dark:bg-slate-900 rounded-xl flex items-center justify-center h-32'
          data-swapy-slot='3'
        >
          {getItemById(
            slotItems['3'],
            totalBrands,
            totalProducts,
            averageProductsPerBrand
          )}
        </div>
      </div>
    </div>
  );
}
