'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateStockProduct = async (productId: string, stock: number) => {
  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { inStock: stock },
    });

    revalidatePath('/admin/products');
    return { ok: true };
  } catch (error) {
    console.error({ error });
    return { ok: false, message: 'Error al actualizar el stock del producto.' };
  }
};
