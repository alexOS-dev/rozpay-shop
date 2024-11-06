'use client';
import { useRouter } from 'next/navigation';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteProductById } from '@/actions/product/delete-product-by-id';
import { toast } from 'sonner';

export function DeleteButtonDialog({ productId }: { productId: string }) {
  const router = useRouter();

  const onDelete = async () => {
    // console.log('Deleting product with id:', productId);
    const { ok, message } = await deleteProductById(productId);
    if (!ok) {
      toast.error(message);
      return;
    }
    router.push('/admin/products');
    toast.success(message);
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          ¿Estás seguro de eliminar este producto?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer. Esto borrará permanentemente el
          producto de tu inventario.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onDelete}>Eliminar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
