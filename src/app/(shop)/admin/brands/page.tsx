import { getBrandsWithProductQuantity } from '@/actions';

import { AddBrandDialog } from './_components/add-brand-dialog';
import { BrandsTable } from './_components/brands-table';
import { ChartsBrands } from './_components/charts-brands';
import SwapyTopCardsWrapper from './_components/_swapy/swapy-top-cards-wrapper';

export default async function BrandManagement() {
  const { ok, brands, totalProducts, message } =
    await getBrandsWithProductQuantity();

  const totalBrands = brands?.length ?? 0;
  const averageProductsPerBrand = Math.round(totalProducts! / totalBrands!);

  if (!ok) {
    return (
      <div className='container mx-auto p-4'>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 flex flex-col justify-center'>
      <header className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Brand Management Dashboard</h1>
        <AddBrandDialog />
      </header>

      <SwapyTopCardsWrapper
        totalProducts={totalProducts ?? 0}
        totalBrands={totalBrands}
        averageProductsPerBrand={averageProductsPerBrand}
      />

      <ChartsBrands brands={brands ?? []} />

      <BrandsTable brands={brands ?? []} />
    </div>
  );
}
