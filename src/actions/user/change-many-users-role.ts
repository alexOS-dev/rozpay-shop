'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

import { revalidatePath } from 'next/cache';

export const changeManyUsersRole = async (
  userIds: string[],
  role: 'admin' | 'user'
) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe de estar autenticado como admin',
    };
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'user';

    const users = await prisma.user.updateMany({
      where: {
        id: {
          in: userIds,
        },
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath('/admin/users');

    return { ok: true, users };
  } catch (error) {
    console.error({ error });
    return {
      ok: false,
      message: 'No se pudo actualizar el rol, error interno.',
    };
  }
};
