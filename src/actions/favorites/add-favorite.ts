'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const addFavorite = async (productId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado',
    };
  }

  try {
    // Verificar si el producto existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        ProductImage: {
          select: { url: true },
          take: 1, // Tomar solo la primera imagen
        },
      },
    });

    if (!product) {
      return { ok: false, message: 'Producto no encontrado' };
    }

    // Verificar si el favorito ya existe
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    });

    if (existingFavorite) {
      return { ok: false, message: 'Ya está en favoritos' };
    }

    // Si no existe, agregarlo
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        productId,
      },
    });

    // Retornar el título e imagen del producto recién agregado
    return {
      ok: true,
      title: product.title,
      image: product.ProductImage[0]?.url || '', // Si el producto no tiene imagen, devolver cadena vacía
    };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'Error al agregar a favoritos' };
  }
};
