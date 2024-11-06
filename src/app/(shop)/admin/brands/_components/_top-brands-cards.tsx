'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { BrandWithProductCount } from '@/interfaces';

interface Props {
  brands: BrandWithProductCount[];
  totalProducts: number;
}

export const TopBrandsCards = ({ brands, totalProducts }: Props) => {
  const totalBrands = brands.length;
  const averageProductsPerBrand = Math.round(totalProducts / totalBrands);

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Marcas Totales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalBrands}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Productos Totales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalProducts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Productos Promedio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{averageProductsPerBrand}</div>
        </CardContent>
      </Card>
    </div>
  );
};
