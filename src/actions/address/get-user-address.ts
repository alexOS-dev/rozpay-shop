'use server';

import prisma from '@/lib/prisma';

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId },
      include: { province: { select: { id: true, name: true } } },
    });

    if (!address) return null;

    const { provinceId, address2, ...rest } = address;

    return {
      ...rest,
      address2: address2 ? address2 : '',
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
