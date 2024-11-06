'use client';

import { useEffect, useState, useTransition } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

import { addFavorite, getFavorites, removeFavorite } from '@/actions';
import { useFavoriteStore } from '@/store';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface Props {
  productId: string;
}

export const FavoriteButton = ({ productId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [favoritesLoaded, setFavoritesLoaded] = useState(false); // Nuevo estado
  const {
    addFavorite: addToStore,
    removeFavorite: removeFromStore,
    isFavorite,
  } = useFavoriteStore();

  const isFav = isFavorite(productId);

  const handleClick = () => {
    startTransition(async () => {
      if (isFav) {
        const { ok } = await removeFavorite(productId);
        if (ok) {
          toast.success('Eliminado de favoritos');
          removeFromStore(productId);
        }
      } else {
        const { ok } = await addFavorite(productId);
        if (ok) {
          toast.success('Agregado a favoritos');
          addToStore(productId);
        }
      }
    });
  };

  return (
    <form action={handleClick}>
      <Button
        type='submit'
        size='lg'
        disabled={isPending}
        variant='outline'
        className='gap-2'
      >
        <Heart
          className={cn(
            { 'text-red-500 fill-red-200 dark:fill-red-400': isFav },
            'w-4 h-4'
          )}
        />
        Favoritos
      </Button>
    </form>
  );
};
