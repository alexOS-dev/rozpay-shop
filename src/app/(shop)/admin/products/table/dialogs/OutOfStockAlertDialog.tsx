'use client';
import { TicketX } from 'lucide-react';
import { toast } from 'sonner';

import { updateStockProduct } from '@/actions';

import { buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const OutOfStockAlertDialog = ({ productId }: { productId: string }) => {
  const handleOutOfStock = async () => {
    const { ok, message } = await updateStockProduct(productId, 0);

    if (ok) {
      toast.success('Producto marcado como agotado.');
    } else {
      toast.error('Ocurrió un error al marcar el producto como agotado.', {
        description: message,
      });
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Estás seguro de marcar este producto como agotado?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esto significa que el producto no estará disponible para la compra.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          className={buttonVariants({ variant: 'destructive' })}
          onClick={handleOutOfStock}
        >
          <TicketX className='h-3 w-3 mr-2' />
          <Label>Marcar agotado</Label>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
