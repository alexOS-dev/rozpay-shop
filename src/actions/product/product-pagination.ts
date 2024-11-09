'use server';

import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  order?: 'asc' | 'desc';
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 9,
  category,
  brand,
  min_price,
  max_price,
  order = 'desc',
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // Construir el objeto where para el filtro
    const where: any = {};

    if (category && category !== 'all') {
      where.category = {
        name: category,
      };
    }

    if (brand && brand !== 'all') {
      // Primero obtenemos el ID de la marca usando el slug
      const brandData = await prisma.brand.findFirst({
        where: { slug: brand },
        select: { id: true },
      });

      if (brandData) {
        where.brandId = brandData.id;
      }
    }

    if (min_price !== undefined || max_price !== undefined) {
      where.price = {};
      if (min_price !== undefined) {
        where.price.gte = min_price;
      }
      if (max_price !== undefined) {
        where.price.lte = max_price;
      }
    }

    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
        category: true, // Incluimos la categoría en la consulta
        condition: true,
        Color: true,
        Brand: true,
      },
      where: where,
      orderBy: order ? { price: order } : undefined,
    });

    // 2. Obtener el total de páginas
    const totalCount = await prisma.product.count({
      where: where,
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo cargar los productos');
  }
};
