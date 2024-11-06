export const revalidate = 0;

import { getAllProducts } from '@/actions';
import { columns, ProductsTable } from './table';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  // const page = searchParams.page ? parseInt(searchParams.page) : 1;

  // const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });
  // console.log(totalPages);

  const { products } = await getAllProducts();

  return (
    <div className='pb-5'>
      <ProductsTable columns={columns} data={products} />
    </div>
  );
}
