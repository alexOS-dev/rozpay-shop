import { auth } from '@/auth.config';

import { redirect } from 'next/navigation';
import Image from 'next/image';

import { User } from 'lucide-react';

import { Title } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  return (
    <div className='h-full pb-5'>
      <Title title='Perfil' />

      <div className='block md:flex'>
        <div className='w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md'>
          <div className='flex justify-between'>
            <Label className='text-xl font-semibold block'>
              Perfil de {session.user.role}
            </Label>
          </div>

          <Label className='text-gray-600'>
            This information is secret so be careful {session.user.image}
          </Label>
          <div className='w-full p-8 mx-2 flex flex-col items-center'>
            {session.user.image && (
              <Image
                className='max-w-xs w-32 items-center border'
                width={128}
                height={128}
                src='/imgs/placeholder.jpg'
                alt='profile image'
              />
            )}
            {!session.user.image && <User className='w-16 h-16' />}
          </div>
          <div className='mx-2 w-full'>
            <Label className='text-md' htmlFor='picture'>
              Editar imagen de perfil
            </Label>
            <Input id='picture' type='file' />
          </div>
        </div>

        <div className='w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md'>
          <div className='rounded shadow p-6'>
            <div className='pb-6'>
              <Label className='font-semibold block pb-1'>
                Nombre completo
              </Label>
              <div className='flex'>
                <Input
                  disabled
                  className='border-1 rounded-r px-4 py-2 w-full'
                  type='text'
                  value={session.user.name}
                />
              </div>
            </div>
            <div className='pb-6'>
              <Label className='font-semibold text-black block pb-1'>
                Email
              </Label>
              <Input
                disabled
                className='border-1 rounded-r px-4 py-2 w-full'
                type='email'
                value={session.user.email}
              />
            </div>
            <div className='pb-4'>
              <Label className='font-semibold text-black block pb-1'>
                Contraseña
              </Label>
              <Input
                disabled
                className='border-1 rounded-r px-4 py-2 w-full'
                type='password'
                value='*********'
              />
              <Label className='text-gray-600 py-4 block opacity-70'>
                Información personal de tu cuenta
              </Label>
              <Button className='-mt-2 text-sm px-5 py-2'>Editar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
