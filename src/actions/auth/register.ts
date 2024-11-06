'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { nanoid } from '@/utils';

export const registerUser = async (
  name: string,
  email: string,
  userName: string,
  password: string,
  dni: string,
  phone: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        id: nanoid(),
        name: name,
        lastName: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
        dni: dni,
        userName: userName,
        phone: phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: 'Usuario creado',
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: 'No se pudo crear el usuario',
    };
  }
};
