'use server';

import prisma from '@/lib/prisma';

export const getAllProductConditions = async () => {
  try {
    const productsConditions = await prisma.productCondition.findMany();

    if (!productsConditions)
      return {
        ok: false,
        message: 'No se pudieron cargar las condiciones del producto',
      };

    return {
      ok: true,
      productsConditions: productsConditions,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'No se pudieron cargar las condiciones del producto',
    };
  }
};
