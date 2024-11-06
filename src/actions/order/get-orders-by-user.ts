'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado',
    };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },

    include: {
      OrderAddress: true,
      OrderItem: {
        select: {
          quantity: true,
          color: true,
          product: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });
  return {
    ok: true,
    orders: orders,
  };
};
