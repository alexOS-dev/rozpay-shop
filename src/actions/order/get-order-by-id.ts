'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado',
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            address: true,
            address2: true,
            postalCode: true,
            city: true,
            phone: true,
            orderId: true,
            province: {
              select: {
                name: true,
              },
            },
          },
        },
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            color: true,

            product: {
              select: {
                title: true,
                slug: true,
                category: {
                  select: {
                    name: true,
                  },
                },

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${id} no existe`;

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw `${id} no es de ese usuario`;
      }
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: `No se pudo obtener la orden ${id}`,
    };
  }
};
