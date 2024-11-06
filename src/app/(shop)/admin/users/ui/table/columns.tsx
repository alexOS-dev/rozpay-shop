'use client';

import { toast } from 'sonner';

import type { ColumnDef, FilterFn, Row } from '@tanstack/react-table';

import { changeUserRole } from '@/actions';

import { DataTableColumnHeader } from '@/components';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { User } from '@/interfaces';

const usersCustomFilter: FilterFn<User> = (
  row: Row<User>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(' ');

  const rowValues =
    `${row.original.email} ${row.original.name} ${row.original.role}`.toLowerCase();

  return filterParts.every((part) => rowValues.includes(part));
};

export const columns: ColumnDef<User>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: 'Nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
  },
  {
    accessorKey: 'email',
    meta: 'Correo electrónico',
    filterFn: usersCustomFilter,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Correo electrónico' />
    ),
  },
  {
    accessorKey: 'role',
    meta: 'Rol',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rol' />
    ),
    cell: ({ row }) => {
      return (
        <Select
          value={row.getValue('role')}
          onValueChange={async (value) => {
            const { ok, message } = await changeUserRole(
              row.getValue('id'),
              value
            );

            if (!ok) {
              toast.error('Error al actualizar el rol.', {
                description: `Error: ${message}`,
              });
              console.warn(message);
              return;
            }
            toast.info('Rol actualizado correctamente.', {
              duration: 2500,
              position: 'top-right',
              richColors: true,
            });
          }}
        >
          <SelectTrigger className='max-w-36'>
            <SelectValue
              className='text-sm text-gray-900'
              aria-label='Seleccionar rol'
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='admin'>Administrador</SelectItem>
            <SelectItem value='salesman'>Vendedor</SelectItem>
            <SelectItem value='user'>Usuario</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
];
