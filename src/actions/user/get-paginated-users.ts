'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe de ser un usuario administrador',
    };
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      ok: true,
      users: users,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error al obtener los usuarios',
    };
  }
};
