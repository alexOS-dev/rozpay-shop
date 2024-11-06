'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AlertCircle, Loader2 } from 'lucide-react';

import { login, registerUser } from '@/actions';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type FormInputs = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  phone: string;
  dni: string;
};

export default function RegisterFormV2() {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password, dni, phone, username } = data;

    // Server action
    const resp = await registerUser(
      name,
      email,
      password,
      dni,
      phone,
      username
    );

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace('/');
  };

  return (
    <div className='flex min-h-screen w-screen items-center justify-center bg-white px-4 py-12 dark:bg-gray-950'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
            Crear una cuenta
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
            Ya tienes una cuenta?
            <Link
              className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
              href='/auth/login'
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <Label className='sr-only' htmlFor='first-name'>
              Nombre
            </Label>
            <Input
              autoComplete='given-name'
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400'
              id='first-name'
              placeholder='Nombre'
              required
              type='text'
              {...register('name', { required: true })}
            />
          </div>
          <div>
            <Label className='sr-only' htmlFor='first-name'>
              Apellido
            </Label>
            <Input
              autoComplete='given-name'
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400'
              id='last-name'
              placeholder='Apellido'
              required
              type='text'
              {...register('lastName', { required: true })}
            />
          </div>
          <div>
            <Label className='sr-only' htmlFor='email'>
              Email address
            </Label>
            <Input
              autoComplete='email'
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400'
              id='email'
              placeholder='Email address'
              required
              type='email'
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>
          <div>
            <Label className='sr-only' htmlFor='email'>
              Username
            </Label>
            <Input
              autoComplete='username'
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400'
              id='username'
              placeholder='Username'
              required
              type='text'
              {...register('username', { required: true })}
            />
          </div>
          <div>
            <Label className='sr-only' htmlFor='email'>
              DNI
            </Label>
            <Input
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400'
              id='dni'
              placeholder='DNI'
              required
              type='text'
              {...register('dni', { required: true })}
            />
          </div>
          <div>
            <Label className='sr-only' htmlFor='email'>
              Telefono
            </Label>
            <Input
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400'
              id='phone'
              placeholder='Phone'
              required
              type='text'
              {...register('phone', { required: true })}
            />
          </div>
          <div>
            <Label className='sr-only' htmlFor='password'>
              Password
            </Label>
            <Input
              autoComplete='new-password'
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400'
              id='password'
              placeholder='Contraseña'
              required
              type='password'
              {...register('password', { required: true, minLength: 6 })}
            />
          </div>
          <div>
            {errorMessage && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <RegisterButton />
          </div>
        </form>
        <Separator />
        <div className='text-center'>
          <Button className='w-full' variant='outline' asChild>
            <Link href='/auth/login'>Iniciar sesión</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className='w-full' disabled>
          <Loader2 className='animate-spin mr-2' size={20} />
          Creando usuario
        </Button>
      ) : (
        <Button className='w-full' type='submit'>
          Crear cuenta
        </Button>
      )}
    </>
  );
}
