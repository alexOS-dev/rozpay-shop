'use server';

import type { Address } from '@/interfaces';
import prisma from '@/lib/prisma';
import { nanoid } from '@/utils';

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo grabar la dirección',
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      id: storedAddress?.id ?? nanoid(),
      userId: userId,
      address: address.address,
      address2: address.address2,
      provinceId: address.province.id,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : 'No se pudo grabar la dirección',
    };
  }
};
