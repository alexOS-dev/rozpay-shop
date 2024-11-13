'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const rozpayCheckPayment = async (orderId: string) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // TODO: Revalidar un path
    // revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: '500 - El pago no se pudo realizar',
    };
  }
};
