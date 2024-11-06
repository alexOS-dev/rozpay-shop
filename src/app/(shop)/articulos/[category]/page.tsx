export const revalidate = 60; // 60 segundos

import { ProductGrid, Title } from '@/components';
import { Pagination } from '@/components/ui/pagination/_old-Pagination';

import { getPaginatedProductsWithImages } from '@/actions';

import { redirect } from 'next/navigation';
import { getCategoryPaginatedProductsWithImages } from '@/actions/product/product-category-pagination';

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderByPage({ params, searchParams }: Props) {
  const { category } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getCategoryPaginatedProductsWithImages({
      page,
      category: category,
    });

  // if (products.length === 0) {
  //   redirect('/');
  // }

  const labels: Record<string, string> = {
    smartphone: 'celulares',
    tablet: 'tablets',
    accessory: 'accesorios',
    laptop: 'notebooks',
  };

  const labelsSubtitle: Record<string, string> = {
    smartphone: 'Todos los celulares',
    tablet: 'Todos los tablets',
    accessory: 'Todos los accesorios',
    laptop: 'Todos las notebooks',
  };

  return (
    <>
      <Title
        title={labels[category] ?? 'Artículos'}
        subtitle={labelsSubtitle[category] ?? 'Todos los articulos'}
        className='mb-2'
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
