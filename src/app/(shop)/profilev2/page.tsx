import { redirect } from 'next/navigation';
import { RefreshCcw, Upload } from 'lucide-react';

import { auth } from '@/auth.config';

import { getUserInitials } from '@/utils';

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function ProfilePageV2() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const usernameInitials = getUserInitials(session?.user.name);

  return (
    <div className='bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden'>
          <div className='p-6 md:p-8 lg:p-10'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <div className='relative'>
                  <Avatar className='h-16 w-16'>
                    <AvatarImage alt='@shadcn' src={session?.user.image} />
                    <AvatarFallback>{usernameInitials}</AvatarFallback>
                  </Avatar>
                  <Button
                    className='absolute bottom-0 right-0'
                    size='sm'
                    variant='link'
                  >
                    <Upload className='h-4 w-4' />
                    <span className='sr-only'>Upload profile picture</span>
                  </Button>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Input
                      className='text-2xl font-bold'
                      defaultValue={session?.user.name || 'User Name'}
                      type='text'
                      // disabled
                    />
                    <Button size='sm' variant='outline'>
                      Editar
                    </Button>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='text-gray-500 dark:text-gray-400'>User</div>
                  </div>
                </div>
              </div>
              <Button variant='outline'>
                <RefreshCcw className='pr-2' />
                <Label>Recargar datos</Label>
              </Button>
            </div>
          </div>
          <div className='border-t border-gray-200 dark:border-gray-700 p-6 md:p-8 lg:p-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8'>
              <div className='space-y-2'>
                <Label>Email</Label>
                <div className='flex items-center space-x-2'>
                  <Input
                    className='text-gray-500 dark:text-gray-400'
                    defaultValue={session?.user.email}
                    type='email'
                  />
                  <Button size='sm' variant='outline'>
                    Actualizar email
                  </Button>
                </div>
              </div>
              <div className='space-y-2'>
                <Label>Cambiar contraseña</Label>
                <div className='flex items-center space-x-2'>
                  <Input
                    className='text-gray-500 dark:text-gray-400'
                    placeholder='Ingresar nueva contraseña'
                    type='password'
                  />
                  <Button size='sm' variant='outline'>
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
