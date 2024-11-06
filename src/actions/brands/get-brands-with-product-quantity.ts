'use server';

import prisma from '@/lib/prisma';

export const getBrandsWithProductQuantity = async () => {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: {
            Product: true, // Este debe ser el nombre correcto de la relación entre `brand` y `product`
          },
        },
      },
    });

    const totalProducts = await prisma.product.count();

    return {
      ok: true,
      brands,
      totalProducts,
    };
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    return {
      ok: false,
      message: 'Ocurrió un error al obtener las marcas',
    };
  }
};
