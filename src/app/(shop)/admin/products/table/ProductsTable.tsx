'use client';

import Link from 'next/link';
import { useState } from 'react';

import { DollarSign, PackagePlus } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTablePagination } from '@/components';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProductsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Table States
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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

  return (
    <div>
      <div className='flex items center py-4'>
        <Input
          placeholder='Filtrar productos... (título, género, precio)'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            setCurrentStatus('all');
            table.getColumn('gender')?.setFilterValue(undefined);
            table.getColumn('title')?.setFilterValue(event.target.value);
          }}
          className='max-w-sm'
        />

        <Select
          value={currentStatus}
          onValueChange={(value) => {
            if (value === 'all') {
              table.getColumn('gender')?.setFilterValue(undefined);
              setCurrentStatus('all');
              return;
            }
            setCurrentStatus(value);
            table.getColumn('gender')?.setFilterValue(value);
          }}
        >
          <SelectTrigger className='w-[180px] ml-2'>
            <SelectValue placeholder='Género - Todos' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Género</SelectLabel>
              <SelectItem value='all'>Todos</SelectItem>
              <SelectItem value='men'>Hombre</SelectItem>
              <SelectItem value='women'>Mujer</SelectItem>
              <SelectItem value='kid'>Niños</SelectItem>
              <SelectItem value='unisex'>Unisex</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Link
          href={'/admin/product/new'}
          className={buttonVariants({
            variant: 'outline',
            className: 'flex ml-3',
          })}
        >
          <PackagePlus className='w-4 h-4 mr-2' /> Nuevo producto
        </Link>
        <Button variant='outline' className='flex ml-3'>
          <DollarSign className='w-4 h-4 mr-2' /> Modificar Precios
        </Button>
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

      {/* Tabla */}
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
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className='py-3'>
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
