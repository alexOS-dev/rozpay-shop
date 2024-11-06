'use server';

import prisma from '@/lib/prisma';

interface Props {
  productId: string;
  brandId: string;
}

export const updateProductBrand = async ({ productId, brandId }: Props) => {
  try {
    // check if the productId exists
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return { ok: false, message: 'No se encontró el producto.' };
    }

    // check if the brandId exists
    const brand = await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
    });

    if (!brand) {
      return { ok: false, message: 'No se encontró la marca.' };
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        brandId,
      },
    });

    return { ok: true, product: updatedProduct };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'Error al actualizar la marca del producto.' };
  }
};
