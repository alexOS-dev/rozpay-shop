'use client';

import Link from 'next/link';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from 'react';

import { Menu, Home, Phone, Tag } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

import { titleFont } from '@/config/fonts';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const categories = [
  {
    title: 'Smartphones',
    items: ['iPhones', 'Android Phones', 'Refurbished Phones'],
    href: '/articulos/smartphone',
  },
  {
    title: 'Tablets',
    items: ['iPads', 'Android Tablets', 'Windows Tablets'],
    href: '/articulos/tablet',
  },
  {
    title: 'Laptops',
    items: ['MacBooks', 'Windows Laptops', 'Chromebooks'],
    href: '/articulos/laptop',
  },
  {
    title: 'Accessories',
    items: ['Phone Cases', 'Screen Protectors', 'Chargers', 'Headphones'],
    href: '/articulos/accesory',
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
        <div className='flex items-center justify-between h-16'>
          <Link href='/' className='text-2xl font-bold text-primary'>
            <span className={`${titleFont.className} antialiased font-bold`}>
              RozPay
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
                  <Link href='/offers' legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <Tag className='w-4 h-4 mr-2' />
                      Ofertas
                    </NavigationMenuLink>
                  </Link>
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
              <Link
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='ghost' size='icon' aria-label='Facebook'>
                  <FaFacebook className='h-4 w-4' fill='blue' />
                </Button>
              </Link>
              <Link
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='ghost' size='icon' aria-label='Twitter'>
                  <FaWhatsapp className='h-4 w-4 text-green-500' />
                </Button>
              </Link>

              <Link
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='ghost' size='icon' aria-label='Instagram'>
                  <FaInstagram
                    className='h-4 w-4'
                    fill='url(#instagram-gradient)'
                  />
                </Button>
              </Link>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='w-full justify-start'>
                    Categorías
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.title}>
                      <Link href='#' className='w-full'>
                        {category.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link
                href='/offers'
                className='block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground'
              >
                <Tag className='inline-block w-4 h-4 mr-2' />
                Ofertas
              </Link>
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
                <Link
                  href='https://facebook.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button variant='ghost' size='icon' aria-label='Facebook'>
                    <FaFacebook className='h-4 w-4' fill='blue' />
                  </Button>
                </Link>
                <Link
                  href='https://twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button variant='ghost' size='icon' aria-label='Twitter'>
                    <FaWhatsapp className='h-4 w-4 text-green-500' />
                  </Button>
                </Link>
                <Link
                  href='https://instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button variant='ghost' size='icon' aria-label='Instagram'>
                    <FaInstagram
                      className='h-4 w-4'
                      fill='url(#instagram-gradient)'
                    />
                  </Button>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
