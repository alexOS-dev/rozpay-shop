'use server';

import prisma from '@/lib/prisma';

export const getAllBrands = async () => {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return {
      ok: true,
      brands,
    };
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    return {
      ok: false,
      message: 'Ocurrió un error al obtener las marcas',
    };
  }
};
