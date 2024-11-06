'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';

import type { Color, CreateColor } from '@/interfaces';

// Define el esquema de validación para el color
const hexColorSchema = z.object({
  name: z.string().min(2).max(255).toLowerCase(),
  hex: z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, {
    message:
      'El color debe ser un valor hexadecimal válido (ej. #FFF o #FFFFFF)',
  }),
});

// Define el tipo de retorno de la función
type CreateColorResult =
  | { ok: true; color: Color }
  | { ok: false; message: string };

export const createColor = async (
  color: CreateColor
): Promise<CreateColorResult> => {
  try {
    hexColorSchema.parse(color);

    const newColor = await prisma.color.create({
      data: color,
    });

    // Sleep function to simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { ok: true, color: newColor };
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: error.errors.map((e) => e.message).join(', '),
      };
    }
    return { ok: false, message: 'No se pudo crear el color' };
  }
};
