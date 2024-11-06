'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const getFavorites = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado',
    };
  }

  try {
    // Get favorites
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            ProductImage: {
              select: {
                url: true,
              },
              take: 1,
            },
          },
        },
      },
    });

    return {
      ok: true,
      favorites: favorites.map((favorite) => ({
        id: favorite.id,
        title: favorite.product.title,
        image: favorite.product.ProductImage[0].url,
      })),
    };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'No se pudieron obtener los favoritos' };
  }
};
