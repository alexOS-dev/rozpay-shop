'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteProductById = async (productId: string) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
      select: {
        slug: true,
      },
    });

    // Revalidate paths
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${deletedProduct.slug}`);
    revalidatePath('/products');
    revalidatePath(`/product/${deletedProduct.slug}`);
    return {
      ok: true,
      message: 'Producto eliminado',
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'No se pudo eliminar el producto',
    };
  }
};
