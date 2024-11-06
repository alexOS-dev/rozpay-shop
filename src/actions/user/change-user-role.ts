'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Prisma, Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe de estar autenticado como admin',
    };
  }

  try {
    // Aceptar también el rol 'salesman'
    const validRoles = ['admin', 'user', 'salesman'];
    if (!validRoles.includes(role)) {
      return {
        ok: false,
        message: 'Rol no válido',
      };
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role as Role,
      },
    });

    revalidatePath('/admin/users');

    return {
      ok: true,
    };
  } catch (error) {
    console.error({ error });

    let errorMessage = 'No se pudo actualizar el role, revisar logs';
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Verificar que el meta y cause existen y son de tipo string
      if (error.meta && typeof error.meta.cause === 'string') {
        errorMessage = error.meta.cause;
      }
    }
    return {
      ok: false,
      message: errorMessage,
    };
  }
};
