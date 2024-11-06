'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAddressStore } from '@/store';
import { deleteUserAddress, setUserAddress } from '@/actions';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { Address, Province } from '@/interfaces';

interface Props {
  provinces: Province[];
  userStoredAddress?: Partial<Address>;
}

const formSchema = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  address: z.string().min(3).max(40),
  address2: z.string().min(2).max(40).optional(),
  postalCode: z.string().min(3).max(20),
  city: z.string().min(3).max(50),
  province: z.object({ id: z.string(), name: z.string() }),
  phone: z.string().min(3).max(20),
  rememberAddress: z.boolean().default(false),
});

export const AddressForm = ({ provinces, userStoredAddress }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userStoredAddress?.firstName || 'Juan',
      lastName: userStoredAddress?.lastName || 'Perez',
      address: userStoredAddress?.address || '25 de Mayo',
      address2: userStoredAddress?.address2 || '99',
      postalCode: userStoredAddress?.postalCode || '3103',
      city: userStoredAddress?.city || 'Libertador San Martín',
      province: userStoredAddress?.province || { id: 'ER', name: 'Entre Ríos' },
      phone: userStoredAddress?.phone || '1 2345678',
      rememberAddress: true,
    },
  });

  const { data: session } = useSession({
    required: true,
  });

  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);
  useEffect(() => {
    if (address.firstName) {
      form.reset(address);
    }
  }, [address, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { rememberAddress, ...restAddress } = values;

    setAddress(restAddress);

    if (rememberAddress) {
      await setUserAddress(restAddress, session!.user.id);
    } else if (userStoredAddress) {
      // Solo eliminar si había una dirección almacenada previamente
      await deleteUserAddress(session!.user.id);
    }

    router.push('/checkout');
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'
        >
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre(s)</FormLabel>
                <FormControl>
                  <Input placeholder='Nombre' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido(s)</FormLabel>
                <FormControl>
                  <Input placeholder='Apellido' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder='Dirección' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address2'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder='Dirección' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='province'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provincia</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const selectedProvince = provinces.find(
                      (p) => p.id === value
                    );
                    field.onChange({
                      id: value,
                      name: selectedProvince ? selectedProvince.name : '',
                    });
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona tu provincia' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.id} value={province.id}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input placeholder='Ciudad' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='postalCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código postal</FormLabel>
                <FormControl>
                  <Input placeholder='Código postal' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder='Teléfono' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='rememberAddress'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Recordar dirección</FormLabel>
                  <FormDescription>
                    Si activas esta opción, recordaremos tu dirección para
                    futuras compras.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type='submit'>Siguiente</Button>
        </form>
      </Form>
    </div>
  );
};
