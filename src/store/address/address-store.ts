import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    province: {
      id: string;
      name: string;
    };
    phone: string;
  };

  // Methods
  setAddress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        province: { id: '', name: '' },
        phone: '',
      },

      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: 'address-storage',
    }
  )
);
