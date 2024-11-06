'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { CircleAlert, Loader2 } from 'lucide-react';

import { authenticate } from '@/actions';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginFormV2() {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/');
    }
  }, [state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar el comportamiento de envío del formulario por defecto
    const formData = new FormData(event.currentTarget); // Obtener los datos del formulario
    dispatch(formData); // Enviar los datos del formulario a la función de autenticación
  };

  return (
    <div className='flex min-h-screen w-screen items-center justify-center bg-white px-4 py-12 dark:bg-gray-950'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
            Iniciar sesión
          </h2>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6' method='POST'>
          <div>
            <Label className='sr-only' htmlFor='email'>
              Email address
            </Label>
            <Input
              autoComplete='email'
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400'
              id='email'
              name='email'
              placeholder='Email address'
              required
              type='email'
            />
          </div>
          <div>
            <Label className='sr-only' htmlFor='password'>
              Password
            </Label>
            <Input
              autoComplete='current-password'
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400'
              id='password'
              name='password'
              placeholder='Password'
              required
              type='password'
            />
          </div>
          <div className='flex items-center justify-around'>
            {/* <div className='flex items-center'>
              <Checkbox id='remember-me' name='remember-me' />
              <Label
                className='ml-2 block text-sm text-gray-900 dark:text-gray-50'
                htmlFor='remember-me'
              >
                Recordarme
              </Label>
            </div> */}
            <div className='text-sm'>
              <Link
                className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
                href='#'
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
          <div>
            {state === 'CredentialsSignin' && (
              <div className='flex flex-row mb-2 items-center'>
                <CircleAlert className='mr-2 text-red-500' size={20} />
                <p className='text-sm text-red-500'>
                  Correo o contraseña incorrectos
                </p>
              </div>
            )}
            <LoginButton />
            {/* <Button className='w-full' type='submit' disabled={pending}>
              Sign in
            </Button> */}
          </div>
        </form>
        <div className='text-center'>
          <Button className='w-full' variant='outline' asChild>
            <Link href='/auth/new-accountV2'>Crear una cuenta</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className='w-full' disabled>
          <Loader2 className='animate-spin mr-2' size={20} />
          Iniciando sesión
        </Button>
      ) : (
        <Button className='w-full' type='submit'>
          Iniciar sesión
        </Button>
      )}
    </>
  );
}
