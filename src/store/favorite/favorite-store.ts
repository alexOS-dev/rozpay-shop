import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addFavorite, removeFavorite, getFavorites } from '@/actions';

interface FavoriteProduct {
  id: string;
  title: string;
  image: string;
}

interface FavoriteStore {
  favorites: FavoriteProduct[];
  addFavorite: (productId: string) => void; // Cambiar a productId
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  fetchFavorites: () => Promise<void>;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      fetchFavorites: async () => {
        const response = await getFavorites();
        if (response.ok) {
          set({ favorites: response.favorites });
        }
      },
      addFavorite: async (productId: string) => {
        const response = await addFavorite(productId);
        if (response.ok) {
          const newFavorite = {
            id: productId,
            title: response.title ?? 'Producto sin título', // Valor por defecto si el título es undefined
            image: response.image ?? '/placeholder-image.jpg', // Valor por defecto si la imagen es undefined
          };
          set((state) => ({ favorites: [...state.favorites, newFavorite] }));
        } else {
          console.error(response.message);
        }
      },

      removeFavorite: async (productId: string) => {
        const response = await removeFavorite(productId);
        if (response.ok) {
          await get().fetchFavorites(); // Refresca el estado local con los favoritos actualizados
        } else {
          console.error(response.message);
        }
      },
      isFavorite: (productId: string) => {
        return get().favorites.some((favorite) => favorite.id === productId);
      },
    }),
    {
      name: 'favorite-storage',
    }
  )
);
