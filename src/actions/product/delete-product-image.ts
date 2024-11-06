'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async (
  imageId: number,
  imageUrl: string
): Promise<{ ok: boolean; error?: string }> => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: 'No se pueden borrar imágenes del sistema de archivos local',
    };
  }

  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';

  try {
    // Intentar eliminar la imagen de Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(imageName);
    if (cloudinaryResult.result !== 'ok') {
      return {
        ok: false,
        error: 'No se pudo eliminar la imagen de Cloudinary',
      };
    }

    // Eliminar la imagen de la base de datos
    const deletedImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: {
          select: { slug: true },
        },
      },
    });

    // Revalidar los paths
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);

    return { ok: true };
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
    return {
      ok: false,
      error:
        'No se pudo eliminar la imagen. Por favor, intente de nuevo más tarde.',
    };
  }
};
