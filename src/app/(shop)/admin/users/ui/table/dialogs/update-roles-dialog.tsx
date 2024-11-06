'use client';

import { startTransition, useOptimistic, useState } from 'react';
import { toast } from 'sonner';
import { Loader, UserRound, UserRoundCog, UserRoundPlus } from 'lucide-react';

import { changeManyUsersRole } from '@/actions';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

interface Props {
  isRoleChangeable: boolean;
  users: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'salesman';
  }[];
}

export const UpdateRolesDialog = ({ isRoleChangeable, users }: Props) => {
  const router = useRouter();
  // Inicializar correctamente usersOptimistic como un array de usuarios
  const [usersOptimistic, setUsersOptimistic] = useOptimistic(
    users,
    (state, newUsers) => newUsers as Props['users']
  );
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleRoleChange = async (newRole: 'admin' | 'user') => {
    // Guardar el estado anterior
    const prevUsers = [...usersOptimistic];

    startTransition(() => {
      // Aplicar la actualización optimista
      setUsersOptimistic((state: Props['users']) =>
        state.map((user) => ({
          ...user,
          role: newRole,
        }))
      );
    });
    setLoading(true);

    try {
      // Llamar a la función del servidor para actualizar roles
      const response = await changeManyUsersRole(
        users.map((user) => user.id),
        newRole
      );

      if (response.ok) {
        toast.success('Roles cambiados exitosamente.');
        setOpen(false);
        setLoading(false);
      } else {
        // Si hay un error en la respuesta del servidor, revertir al estado anterior
        setUsersOptimistic(prevUsers);
        // toast.error(
        //   response.message || 'Ocurrió un error al cambiar los roles.'
        // );
        setLoading(false);
        throw new Error(
          response.message || 'Ocurrió un error al cambiar los roles.'
        );
      }
    } catch (error) {
      // Revertir el estado optimista en caso de error
      setUsersOptimistic(prevUsers);
      setLoading(false);
      toast.error('Ocurrió un error al cambiar los roles.', {
        description: (error as Error).message,
        action: {
          label: 'Recargar',
          onClick: () => router.refresh(),
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='ml-2' disabled={!isRoleChangeable}>
          <UserRoundCog className='w-4 h-4 mr-2' />
          Cambiar roles
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md lg:max-w-fit'>
        <DialogHeader>
          <DialogTitle>Cambiar roles</DialogTitle>
          <DialogDescription>
            Los siguientes usuarios serán actualizados con el rol seleccionado.
          </DialogDescription>
        </DialogHeader>
        <div className='overflow-auto w-full rounded-lg'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50 dark:bg-zinc-800'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider'
                >
                  Nombre
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider'
                >
                  Correo
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider'
                >
                  Rol Actual
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y dark:bg-zinc-900 divide-gray-200'>
              {
                // Mostrar los usuarios con el estado optimista
                // Si usersOptimistic es un array, mostrar los usuarios
                // con el estado optimista
                // Si no, mostrar un spinner de carga
              }
              {Array.isArray(usersOptimistic) &&
                usersOptimistic.map((user) => (
                  <tr key={user.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-white'>
                      {user.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white'>
                      {user.email}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white'>
                      {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </td>
                  </tr>
                ))}
              {loading && (
                <tr>
                  <td
                    colSpan={3}
                    className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white flex items-center'
                  >
                    <Loader className='w-6 h-6 mr-2 animate-spin' />
                    Actualizando roles...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <DialogFooter className='sm:justify-start lg:justify-between'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Cancelar
            </Button>
          </DialogClose>
          <div className='flex items-center gap-2'>
            <Button onClick={() => handleRoleChange('user')}>
              <UserRound className='w-4 h-4 mr-2' />
              Usuario
            </Button>
            <Button onClick={() => handleRoleChange('admin')}>
              <UserRoundPlus className='w-4 h-4 mr-2' />
              Administrador
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
