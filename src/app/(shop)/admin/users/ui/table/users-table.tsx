'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TooltipHelper } from '@/components/ui/tooltips/tooltip-helper';
import { UpdateRolesDialog } from './dialogs/update-roles-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { User } from '@/interfaces';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UsersTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const isRoleChangeable = Object.keys(rowSelection).length > 0;

  // State for the current status filter
  const [currentStatus, setCurrentStatus] = useState('all');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const selectedUsers = table
    .getSelectedRowModel()
    .rows.map((row) => row.original as User);

  return (
    <div>
      <div className='flex items-center py-4 justify-between'>
        <Input
          placeholder='Filtrar usuarios... (nombre, email, rol)'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            setCurrentStatus('all');
            table.getColumn('status')?.setFilterValue(undefined);
            table.getColumn('email')?.setFilterValue(event.target.value);
          }}
          className='max-w-sm'
        />

        <Select
          value={currentStatus}
          onValueChange={(value) => {
            if (value === 'all') {
              table.getColumn('role')?.setFilterValue(undefined);
              setCurrentStatus('all');
              return;
            }
            setCurrentStatus(value);
            table.getColumn('role')?.setFilterValue(value);
          }}
        >
          <SelectTrigger className='w-[180px] ml-2'>
            <SelectValue placeholder='Role - All' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rol</SelectLabel>
              <SelectItem value='all'>Todos</SelectItem>
              <SelectItem value='admin'>Administrador</SelectItem>
              <SelectItem value='user'>Usuario</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <>
          <UpdateRolesDialog
            isRoleChangeable={isRoleChangeable}
            users={selectedUsers}
          />
          {!isRoleChangeable && (
            <TooltipHelper tooltipText='Debe seleccionar al menos un usuario para cambiar su rol' />
          )}
        </>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .filter((column) => column.id !== 'actions')
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.meta as string}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between'>
        {/* Rows selection */}
        <div className='text-sm text-muted-foreground pt-4'>
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>

        {/* Pagination */}
        <div className='flex items-center space-x-2 pt-4'>
          <Label htmlFor='rowsPerPage'>Filas por página</Label>
          <Select
            onValueChange={(value) => {
              table.setPageSize(+value);
            }}
          >
            <SelectTrigger className='w-20'>
              <SelectValue placeholder='10' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filas por página</SelectLabel>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='20'>20</SelectItem>
                <SelectItem value='30'>30</SelectItem>
                <SelectItem value='40'>40</SelectItem>
                <SelectItem value='50'>50</SelectItem>
                <SelectItem value='100'>100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant='outline'
            size='icon'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='w-4 h-4' />
            <span className='sr-only'>Página anterior</span>
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Página siguiente</span>
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
