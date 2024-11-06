'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { Diff, MoreHorizontal, Pencil, TicketX, Trash2 } from 'lucide-react';

import type { ColumnDef, FilterFn, Row } from '@tanstack/react-table';

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { BadgeStock } from '@/components/ui/badge-stock';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EditStockDialog } from './dialogs/EditStockDialog';
import { Label } from '@/components/ui/label';
import { OutOfStockAlertDialog } from './dialogs/OutOfStockAlertDialog';
import { ShareProductDialog } from './dialogs/ShareProductDialog';
import { TooltipInStock, ToolTipWrapper } from '@/components/ui/tooltips';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Product } from '@/interfaces';

const myProductCustomFilter: FilterFn<Product> = (
  row: Row<Product>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(' ');

  const rowValues =
    `${row.original.title} ${row.original.categoryId} ${row.original.price}`.toLowerCase();

  return filterParts.every((part) => rowValues.includes(part));
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'image',
    meta: 'Imagen',

    header: () => (
      <span className='inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs -ml-3 h-8 data-[state=open]:bg-accent'>
        Imagen
      </span>
    ),
    cell: ({ row }) => {
      const images = row.original.images || [];
      const firstImage = images.length > 0 ? images[0] : null;

      const isCloudinaryImage = firstImage
        ? firstImage.includes('cloudinary')
        : false;

      return (
        <Image
          alt='Product Image'
          className='rounded-md object-cover'
          height={64}
          src={
            firstImage
              ? isCloudinaryImage
                ? firstImage
                : `/products/${firstImage}`
              : '/imgs/placeholder.svg'
          }
          style={{
            aspectRatio: '64/64',
            objectFit: 'cover',
          }}
          width={64}
        />
      );
    },
  },
  {
    accessorKey: 'title',
    meta: 'Título',
    filterFn: myProductCustomFilter,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Titulo' />
    ),
  },
  {
    accessorKey: 'Brand.name',
    meta: 'Marca',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Marca' />
    ),
  },
  {
    accessorKey: 'condition.name',
    meta: 'Condición',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Condición' />
    ),
    cell: ({ row }) => {
      const condition = row.original.condition?.name;

      const conditionVariant = (condition: string) => {
        switch (true) {
          case condition === 'nuevo':
            return 'new';
          case condition === 'usado':
            return 'used';
          case condition === 'reacondicionado':
            return 'refurbished';
          case condition === 'outlet':
            return 'outlet';
          default:
            return 'default';
        }
      };

      return (
        <Badge
          variant={conditionVariant(condition ?? '')}
          className='capitalize'
        >
          {condition}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'price',
    meta: 'Precio',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Precio' />
    ),
    cell: ({ row }) => <div className='font-medium'>${row.original.price}</div>,
  },
  {
    accessorKey: 'category',
    meta: 'Categoría',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Categoría' />
    ),
    cell: ({ row }) => {
      const category = row.original.category;
      return <div className='font-medium'>{category?.name}</div>;
    },
  },
  {
    accessorKey: 'inStock',
    meta: 'Stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stock' />
    ),
    cell: ({ row }) => {
      const inStock = row.original.inStock;

      const stockLevel = (inStock: number) => {
        switch (true) {
          case inStock === 0:
            return 'out';
          case inStock <= 10:
            return 'low';
          case inStock <= 30:
            return 'medium';
          default:
            return 'high';
        }
      };
      // avabilable variants: high, medium, low and out
      return (
        <TooltipInStock stockLevel={stockLevel(inStock)}>
          <BadgeStock variant={stockLevel(inStock)}>{inStock}</BadgeStock>
        </TooltipInStock>
      );
    },
  },

  {
    id: 'acciones',
    cell: function ActionsRow({ row }) {
      const [openEditDialog, setOpenEditDialog] = useState(false);
      const [open, setOpen] = useState(false);

      return (
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className='h-8 w-8 p-0'>
                  <span className='sr-only'>Abrir menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link
                      className='flex items-center gap-2'
                      href={`/admin/product/${row.original.slug}`}
                    >
                      <Pencil className='h-3 w-3 ml-2' />
                      <Label>Editar el producto</Label>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <DialogTrigger className='flex items-center gap-2'>
                      <Diff className='h-3 w-3 ml-2' />
                      <Label>Actualizar stock</Label>
                    </DialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertDialogTrigger className='flex items-center gap-2'>
                      <TicketX className='h-3 w-3 ml-2' />
                      <Label>Marcar agotado</Label>
                    </AlertDialogTrigger>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className='flex items-center gap-2'>
                    <Trash2 className='h-3 w-3 ml-2' />
                    {/* This AlertDialogTrigger  */}
                    <AlertDialogTrigger>
                      <Label>Borrar producto</Label>
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuTrigger>

              {/* DeleteButtonDialog only displays when the <AlertDialogTrigger> is clicked */}
              {/* <DeleteButtonDialog productId={row.original.id} /> */}
              {/* This component should be always outside from <DropdownMenuContent> */}
              {/* Useful info about this: https://stackoverflow.com/questions/77185827/shadcn-dialog-inside-of-dropdown-closes-automatically */}
              <EditStockDialog
                product={row.original}
                setOpenEditDialog={setOpenEditDialog}
              />

              <OutOfStockAlertDialog productId={row.original.id} />
            </DropdownMenu>
          </AlertDialog>
        </Dialog>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'share',
    meta: 'Compartir',
    cell: ({ row }) => {
      const productUrl = `http://localhost:3000/product/${row.original.slug}`;

      return (
        <ToolTipWrapper message='Compartir enlace'>
          <ShareProductDialog url={productUrl} name={row.original.title} />
        </ToolTipWrapper>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
];
