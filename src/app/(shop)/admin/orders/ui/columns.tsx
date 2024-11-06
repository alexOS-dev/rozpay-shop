'use client';

import { useRouter } from 'next/navigation';

import CopyToClipboard from 'react-copy-to-clipboard';
import { Clipboard, MoreHorizontal, ShoppingCart, X } from 'lucide-react';
import { toast } from 'sonner';

import type { ColumnDef, Row } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Order } from '@/interfaces';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Seleccionar todas las filas de la página'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Seleccionar fila'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    meta: 'ID',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <p className='text-sm text-muted-foreground'>{id}</p>;
    },
  },
  {
    id: 'OrderAddress.firstName',
    accessorKey: 'OrderAddress.firstName',
    meta: 'Nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
  },
  {
    accessorKey: 'OrderAddress.lastName',
    meta: 'Apellido',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Apellido' />
    ),
  },
  {
    accessorKey: 'OrderAddress',
    meta: 'Dirección',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dirección' />
    ),
    cell: ({ row }) => {
      type OrderAddressData = {
        firstName: string;
        lastName: string;
        address: string;
        address2: string | null;
        postalCode: string;
        city: string;
      };

      const addressData = row.getValue('OrderAddress') as OrderAddressData;
      return (
        <>
          <div className='font-semibold'>{`${addressData.firstName} ${addressData.lastName}`}</div>
          <div>{addressData.address}</div>
          {addressData.address2 && <div>{addressData.address2}</div>}
          <div>{`${addressData.city}, ${addressData.postalCode}`}</div>
        </>
      );
    },
  },
  {
    accessorKey: 'itemsInOrder',
    meta: 'Cantidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cantidad' />
    ),
    cell: ({ row }) => {
      const items = row.getValue('itemsInOrder') as number;
      return <Label>{items}</Label>;
    },
  },
  {
    accessorKey: 'total',
    meta: 'Monto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('total'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <Label>{formatted}</Label>;
    },
  },

  {
    accessorKey: 'paidAt',
    meta: 'Fecha de pago',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha de pago' />
    ),
    cell: ({ row }) => {
      return (
        <Label>
          {row.getValue('paidAt')
            ? new Date(row.getValue('paidAt')).toLocaleDateString()
            : 'Pago pendiente'}
        </Label>
      );
    },
  },
  {
    accessorKey: 'isPaid',
    meta: 'Estado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ row }) => {
      const paidStatus = row.getValue<boolean>('isPaid');

      return (
        <>
          {paidStatus ? (
            <Badge variant='success'>Pagado</Badge>
          ) : (
            <Badge variant='destructive'>Pendiente</Badge>
          )}
        </>
      );
    },
  },

  {
    id: 'acciones',
    cell: function CellAction({ row }) {
      // In order to use useRouter we need to convert this component to a function
      const payment = row.original;
      const { push } = useRouter();

      return (
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

              <CopyToClipboard
                text={payment.id}
                onCopy={() =>
                  toast.info(`Orden "${payment.id}" copiada al portapapeles`, {
                    description: `La orden a nombre de: "${payment.OrderAddress?.firstName} ${payment.OrderAddress?.lastName}" ha sido copiada al portapapeles.`,
                  })
                }
              >
                <DropdownMenuItem>
                  <Clipboard className='w-4 h-4 mr-2' />
                  Copiar el No. de orden
                </DropdownMenuItem>
              </CopyToClipboard>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => push('/admin/usersv2')}>
                <ShoppingCart className='w-4 h-4 mr-2' />
                Ver orden
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => push(`/orders/${payment.id}`)}>
                <X className='w-4 h-4 mr-2' />
                Cancelar orden
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
