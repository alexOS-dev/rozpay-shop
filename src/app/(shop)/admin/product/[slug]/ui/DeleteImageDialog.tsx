'use client';

import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { deleteProductImage } from '@/actions';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';

interface Props {
  imageId: number;
  imageUrl: string;
}

export function DeleteImageDialog({ imageId, imageUrl }: Props) {
  const handleDelete = async () => {
    const { ok, error } = await deleteProductImage(imageId, imageUrl);
    if (!ok) {
      toast.error('Error al eliminar la imagen', {
        description: error ?? 'No se pudo eliminar la imagen',
      });
      return;
    }
    toast.success('Imagen eliminada', {
      description: 'La imagen ha sido eliminada exitosamente',
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='sm' className='w-full gap-2'>
          <Trash2 className='h-5 w-5' />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar imagen</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que quieres eliminar esta imagen? Esta acción no se
            puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={handleDelete}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
