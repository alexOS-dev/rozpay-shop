'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const removeFavorite = async (productId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado',
    };
  }

  try {
    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    });

    return { ok: true };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'No se pudo remover el favorito',
    };
  }
};
