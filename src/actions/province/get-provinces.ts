'use server';

import prisma from '@/lib/prisma';

export const getProvinces = async () => {
  try {
    const provinces = await prisma.province.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return provinces;
  } catch (error) {
    console.error(error);
    return [];
  }
};
