'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { ColumnDef } from '@tanstack/react-table';

import { toast } from 'sonner';

import { currencyFormat, formatDate } from '@/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components';

import type { UserOrder } from '@/interfaces';

export const columns: ColumnDef<UserOrder>[] = [
  {
    accessorKey: 'createdAt',
    meta: 'Fecha de creación',
    header: ({ column }) => (
      <DataTableColumnHeader title='Fecha' column={column} />
    ),
    cell: ({ row }) => (
      <p className='text-sm text-muted-foreground'>
        {formatDate(row.original.createdAt)}
      </p>
    ),
  },
  {
    accessorKey: 'OrderItem',
    meta: 'Productos',
    header: ({ column }) => (
      <DataTableColumnHeader title='Productos' column={column} />
    ),
    cell: ({ row }) => {
      const items = row.original.OrderItem;

      return (
        <div className='flex flex-col items-start'>
          {items.map((item) => (
            <p
              key={item.product.title}
              className='text-base text-muted-foreground'
            >
              {item.quantity} x {item.product.title} - {item.color.name}
            </p>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'total',
    meta: 'Total',
    header: ({ column }) => (
      <DataTableColumnHeader title='Total' column={column} />
    ),
    cell: ({ row }) => (
      <p className='text-base text-muted-foreground'>
        {currencyFormat(row.original.total)}
      </p>
    ),
  },
  {
    accessorKey: 'isPaid',
    meta: 'Estado',
    header: ({ column }) => (
      <DataTableColumnHeader title='Estado' column={column} />
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.isPaid ? 'success' : 'destructive'}>
        {row.original.isPaid ? 'Pagado' : 'Pendiente'}
      </Badge>
    ),
  },
  {
    accessorKey: 'paidAt',
    meta: 'Fecha de pago',
    header: ({ column }) => (
      <DataTableColumnHeader title='Fecha de pago' column={column} />
    ),
    cell: ({ row }) => (
      <p className='text-sm text-muted-foreground'>
        {row.original.paidAt ? formatDate(row.original.paidAt) : '-'}
      </p>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.id);
                toast.success('Payment ID copied to clipboard', {
                  position: 'top-right',
                });
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
