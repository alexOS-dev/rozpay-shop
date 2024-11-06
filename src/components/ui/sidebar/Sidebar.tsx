'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import {
  LogIn,
  LogOut,
  Menu,
  Receipt,
  Search,
  Shirt,
  ShoppingBag,
  Tag,
  User,
  Users,
} from 'lucide-react';

import { logout } from '@/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '../separator';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../drawer';

export default function Sidebar() {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const NavigationContent = ({ isMobile = false }) => (
    <>
      <div className='relative'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
        <Input
          className='w-full rounded-md bg-gray-100 px-8 py-2 text-sm shadow-none focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-950'
          placeholder='Buscar...'
          type='search'
          readOnly
        />
      </div>
      <nav className='grid gap-2'>
        {!isAuthenticated && (
          <CloseWrapper isMobile={isMobile}>
            <Link
              className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800'
              href='/auth/login'
            >
              <LogIn className='h-7 w-7' />
              Iniciar sesión
            </Link>
          </CloseWrapper>
        )}
        {isAuthenticated && (
          <>
            <CloseWrapper isMobile={isMobile}>
              <Link
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800'
                href='/profilev2'
              >
                <User className='h-7 w-7' />
                Perfil
              </Link>
            </CloseWrapper>
            <CloseWrapper isMobile={isMobile}>
              <Link
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800'
                href='/orders'
              >
                <ShoppingBag className='h-7 w-7' />
                Tus compras
              </Link>
            </CloseWrapper>
          </>
        )}
      </nav>
      {isAdmin && (
        <div className='border-t border-gray-200 pt-2 dark:border-gray-700'>
          <nav className='grid gap-2'>
            <CloseWrapper isMobile={isMobile}>
              <Link
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800'
                href='/admin/products'
              >
                <Shirt className='h-7 w-7' />
                Gestionar productos
              </Link>
            </CloseWrapper>
            <CloseWrapper isMobile={isMobile}>
              <Link
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800'
                href='/admin/brands'
              >
                <Tag className='h-7 w-7' />
                Marcas
              </Link>
            </CloseWrapper>
            <CloseWrapper isMobile={isMobile}>
              <Link
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800'
                href='/admin/orders'
              >
                <Receipt className='h-7 w-7' />
                Ventas
              </Link>
            </CloseWrapper>
            <CloseWrapper isMobile={isMobile}>
              <Link
                className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800'
                href='/admin/users'
              >
                <Users className='h-7 w-7' />
                Gestionar usuarios
              </Link>
            </CloseWrapper>
          </nav>
        </div>
      )}
      {isAuthenticated && (
        <>
          <Separator />
          <CloseWrapper isMobile={isMobile}>
            <Button
              className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800'
              variant='link'
              onClick={() => logout()}
            >
              <LogOut className='h-7 w-7' />
              Cerrar sesión
            </Button>
          </CloseWrapper>
        </>
      )}
    </>
  );

  const CloseWrapper = ({
    children,
    isMobile,
  }: {
    children: React.ReactNode;
    isMobile?: boolean;
  }) => {
    if (isMobile) {
      return <DrawerClose asChild>{children}</DrawerClose>;
    }
    return <SheetClose asChild>{children}</SheetClose>;
  };

  if (isDesktop) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className='m-2 p-2 transition-all'
            size='icon'
            variant='ghost'
          >
            <Menu className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='right' className='w-[400px] sm:w-[540px]'>
          <SheetHeader>
            <SheetTitle>Navegación</SheetTitle>
            <SheetDescription>
              Explora las opciones disponibles
            </SheetDescription>
          </SheetHeader>
          <div className='flex flex-col gap-4 p-4'>
            <NavigationContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Acceder al menu de navegación</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navegación</DrawerTitle>
          <DrawerDescription>
            Explora las opciones disponibles
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-4 p-4'>
          <NavigationContent isMobile={true} />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline' className='w-full'>
              Cerrar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
