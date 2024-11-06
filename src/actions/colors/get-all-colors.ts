'use server';

import prisma from '@/lib/prisma';

export const getAllColors = async () => {
  try {
    const colors = await prisma.color.findMany();

    return { ok: true, colors: colors };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'No se pudo cargar los colores' };
  }
};
