export const revalidate = 60; // 60 segundos
import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';

import {
  AccordionFilter,
  FilterContent,
  ProductGrid,
  ProductsPagination,
  SearchBar,
  Title,
} from '@/components';

interface Props {
  searchParams: {
    page?: string;
    free_shipping?: string;
    offer?: string;
    min?: string;
    max?: string;
    category?: string;
    brand?: string;
    order?: 'asc' | 'desc';
    search?: string;
  };
}

export default async function HomePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const min_price = searchParams.min ? parseFloat(searchParams.min) : undefined;
  const max_price = searchParams.max ? parseFloat(searchParams.max) : undefined;
  const category = searchParams.category;
  const brand = searchParams.brand;
  const order = searchParams.order as 'asc' | 'desc' | undefined;
  const search = searchParams.search;
  const freeShipping = searchParams.free_shipping === 'true';

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page,
      min_price,
      max_price,
      category,
      order,
      brand,
      search,
      free_shipping: freeShipping,
    });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title
        title='Tienda'
        subtitle='Todos los productos'
        className='mb-2 px-4'
      />

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-10 px-4 md:px-0 lg:px-0'>
        {/* Mobile Filters */}
        <div className='lg:hidden'>
          <AccordionFilter>
            <FilterContent />
          </AccordionFilter>
        </div>

        {/* Desktop Filters */}
        <div className='hidden lg:flex lg:flex-col mt-5 col-span-1 gap-5'>
          <FilterContent />
        </div>

        {/* Search Input with Product Grid */}
        <div className='flex flex-col col-span-1 lg:col-span-3'>
          <SearchBar />
          <ProductGrid products={products} />
        </div>
      </div>

      <ProductsPagination totalPages={totalPages} />
    </>
  );
}
