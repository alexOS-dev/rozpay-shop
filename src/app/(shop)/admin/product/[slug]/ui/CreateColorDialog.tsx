'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { HexColorPicker } from 'react-colorful';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createColor } from '@/actions';
import type { CreateColor } from '@/interfaces';
import { Plus } from 'lucide-react';

// Expresión regular para validar un código hexadecimal
const isValidHex = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

const createColorFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre del color es requerido',
    })
    .max(255, {
      message: 'El nombre del color no puede superar los 255 caracteres',
    }),
  hex: z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, {
    message:
      'El color debe ser un valor hexadecimal válido (ej. #FFF o #FFFFFF)',
  }),
});

export function CreateColorDialog() {
  const [color, setColor] = useState('#ffffff'); // Color válido real
  const [inputColor, setInputColor] = useState('#ffffff'); // Valor del input
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createColorFormSchema>>({
    resolver: zodResolver(createColorFormSchema),
    defaultValues: {
      name: '',
      hex: '#ffffff',
    },
  });

  const onSubmit = async (values: z.infer<typeof createColorFormSchema>) => {
    const colorToCreate: CreateColor = {
      name: values.name,
      hex: values.hex,
    };

    // Check if the color didn't change
    if (colorToCreate.hex === '#ffffff') {
      toast.info('El color no ha cambiado', {
        richColors: true,
      });
      return;
    }

    toast.promise(createColor(colorToCreate), {
      loading: 'Guardando...',
      success: (result) => {
        if (result.ok) {
          form.reset();
          setOpen(false);
          setColor('#ffffff');
          return `Color creado con éxito: ${result.color.name}`;
        } else {
          throw new Error(result.message);
        }
      },
      error: (err) => `Error al crear el color: ${err.message}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='gap-2'>
          <Plus className='h-4 w-4' />
          Nuevo color
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Crear un nuevo color</DialogTitle>
              <DialogDescription>
                El color se va a guardar en la base de datos y se va a poder
                aplicar a los productos.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id='colorName'
                      placeholder='Ejemplo: Azul oscuro'
                    />
                  </FormControl>
                  <FormDescription>
                    Nombre del color para tus productos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4 py-4'>
              <FormField
                control={form.control}
                name='hex'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código hexadecimal</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Ejemplo: #fff'
                        type='text'
                        value={color}
                        onChange={(e) => {
                          setColor(e.target.value);
                          form.setValue('hex', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Color para íconos, texto, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <HexColorPicker
                color={color}
                onChange={(newColor) => {
                  setColor(newColor); // Actualizar el color real
                  form.setValue('hex', newColor); // Sincronizar el input con el color picker
                }}
              />
            </div>

            <DialogFooter>
              <Button
                type='button'
                disabled={
                  form.formState.isSubmitted && form.formState.isSubmitting
                }
                onClick={() => onSubmit(form.getValues())}
              >
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
