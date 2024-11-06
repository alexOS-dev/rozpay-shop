'use server';

import prisma from '@/lib/prisma';

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 1,
          select: {
            url: true,
          },
        },
        Brand: {
          select: {
            name: true,
            slug: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        Color: {
          select: {
            name: true,
            hex: true,
          },
        },
        condition: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error('No se pudo cargar los productos');
  }
};
