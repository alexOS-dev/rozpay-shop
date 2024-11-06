'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Product } from '@/interfaces';
import { updateStockProduct } from '@/actions';
import { toast } from 'sonner';
import { TicketX } from 'lucide-react';

interface Props {
  product: Product;
  setOpenEditDialog: (open: boolean) => void;
}

const formSchema = z.object({
  stock: z.coerce.number().nonnegative('El stock no puede ser negativo.'),
});

export function EditStockDialog({ product, setOpenEditDialog }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock: product.inStock,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log(data);

    // Check if data.stock is !== product.inStock
    if (data.stock === product.inStock) {
      toast.info('Ingresa un stock diferente al actual.');
      return;
    }

    const { ok, message } = await updateStockProduct(product.id, data.stock);

    if (!ok) {
      toast.error(message);
    } else {
      toast.success('Stock actualizado correctamente.');
      setOpenEditDialog(false);
    }
  };

  return (
    <DialogContent className='sm:max-w-md'>
      <DialogHeader>
        <DialogTitle>{product.title}</DialogTitle>
        <DialogDescription>
          Actualiza la cantidad en stock del producto.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Stock disponible'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <DialogFooter className='sm:justify-start lg:justify-between'>
        <DialogClose asChild>
          <Button type='button' variant='secondary'>
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type='button' onClick={form.handleSubmit(onSubmit)}>
            Actualizar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
