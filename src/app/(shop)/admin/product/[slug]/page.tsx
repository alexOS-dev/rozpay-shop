import { redirect } from 'next/navigation';

import {
  getAllBrands,
  getAllColors,
  getAllProductConditions,
  getCategories,
  getProductBySlug,
} from '@/actions';

import ProductForm from './ui/ProductForm';
import { CreateColorDialog } from './ui/CreateColorDialog';
import { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [product, categories, brands, colors, productConditions] =
    await Promise.all([
      getProductBySlug(slug),
      getCategories(),
      getAllBrands(),
      getAllColors(),
      getAllProductConditions(),
    ]);

  // Redirect to products page if product is not found
  if (!product && slug !== 'new') {
    redirect('/admin/products');
  }

  return (
    <>
      <ProductForm
        product={product ?? {}}
        categories={categories}
        brands={brands.brands ?? []}
        colors={colors.colors ?? []}
        conditions={productConditions.productsConditions ?? []}
      />

      <CreateColorDialog />
    </>
  );
}
