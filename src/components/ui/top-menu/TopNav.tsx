'use client';

import Link from 'next/link';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from 'react';

import { Menu, Home, Phone, List } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

import { titleFont } from '@/config/fonts';
import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '@/components/ui/button';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from '../drawer';

const categories = [
  {
    title: 'Celulares',
    items: ['iPhones', 'Celulares Android'],
    href: '/articulos/smartphone',
  },
  {
    title: 'Tablets',
    items: ['iPads', 'Android Tablets'],
    href: '/articulos/tablet',
  },
  {
    title: 'Laptops',
    items: ['MacBooks', 'Windows Laptops', 'Chromebooks'],
    href: '/articulos/laptop',
  },
  {
    title: 'Accesorios',
    items: ['Fundas', 'Protectores de pantalla', 'Cargadores', 'Auriculares'],
    href: '/articulos/accessory',
  },
];

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export default function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className='bg-background border-b'>
      <svg width='0' height='0'>
        <linearGradient
          id='instagram-gradient'
          x1='100%'
          y1='100%'
          x2='0%'
          y2='0%'
        >
          <stop stopColor='#833ab4' offset='0%' />
          <stop stopColor='#fcb045' offset='100%' />
        </linearGradient>
      </svg>
      <div className='container mx-auto px-4'>
        <div className='flex gap-2 items-center justify-center h-16'>
          <Link href='/' className='text-2xl font-bold text-primary'>
            <span className={`${titleFont.className} antialiased font-bold`}>
              Caggy
            </span>
            <span> | Shop</span>
          </Link>
          <nav className='hidden md:flex items-center space-x-4'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href='/' legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <Home className='w-4 h-4 mr-2' />
                      Inicio
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                      {categories.map((category) => (
                        <ListItem
                          key={category.title}
                          title={category.title}
                          href={category.href}
                        >
                          {category.items.join(', ')}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href='/contact' legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <Phone className='w-4 h-4 mr-2' />
                      Contacto
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className='flex items-center space-x-2'>
              <Button variant='ghost' size='icon' aria-label='Facebook'>
                <FaFacebook className='h-4 w-4' fill='blue' />
              </Button>

              <Button variant='ghost' size='icon' aria-label='Twitter'>
                <FaWhatsapp className='h-4 w-4 text-green-500' />
              </Button>

              <Button variant='ghost' size='icon' aria-label='Instagram'>
                <FaInstagram
                  className='h-4 w-4'
                  fill='url(#instagram-gradient)'
                />
              </Button>
            </div>
          </nav>
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Open mobile menu'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className='h-6 w-6' />
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className='md:hidden'>
          <ul className='px-2 pt-2 pb-4 space-y-1'>
            <li>
              <Link
                href='/'
                className='block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground'
              >
                <Home className='inline-block w-4 h-4 mr-2' />
                Inicio
              </Link>
            </li>
            <li>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant='ghost'
                    className='flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground'
                  >
                    <List className='h-4 w-4 inline-block' />
                    Categorías
                  </Button>
                </DrawerTrigger>
                <DrawerContent className='h-[250px] w-full px-2'>
                  <div className='flex flex-col items-center'>
                    <DrawerHeader className='text-lg'>Categorías</DrawerHeader>
                    <DrawerDescription>
                      <p>Elige una categoría para ver sus productos.</p>
                    </DrawerDescription>
                  </div>
                  <div className='grid grid-cols-2 gap-4 mt-4'>
                    {categories.map((category) => (
                      <Link
                        key={category.title}
                        href={category.href}
                        className={buttonVariants({
                          variant: 'outline',
                          className:
                            'bg-gray-50 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200',
                        })}
                      >
                        <span className='text-xl font-semibold'>
                          {category.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>
            </li>
            <li>
              <Link
                href='/contact'
                className='block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground'
              >
                <Phone className='inline-block w-4 h-4 mr-2' />
                Contacto
              </Link>
            </li>
            <li className='px-3 py-2'>
              <div className='flex items-center space-x-2'>
                <Button variant='ghost' size='icon' aria-label='Facebook'>
                  <FaFacebook className='h-4 w-4' fill='blue' />
                </Button>

                <Button variant='ghost' size='icon' aria-label='WhatsApp'>
                  <FaWhatsapp className='h-4 w-4 text-green-500' />
                </Button>

                <Button variant='ghost' size='icon' aria-label='Instagram'>
                  <FaInstagram
                    className='h-4 w-4'
                    fill='url(#instagram-gradient)'
                  />
                </Button>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
