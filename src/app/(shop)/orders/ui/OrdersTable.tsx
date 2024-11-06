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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function OrdersTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const isDeleteVisible = Object.keys(rowSelection).length > 0;

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

  return (
    <div>
      <div className='flex items-center py-4 justify-start'>
        <Input
          placeholder='Filter anything... (client name, email, status)'
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
              table.getColumn('status')?.setFilterValue(undefined);
              setCurrentStatus('all');
              return;
            }
            setCurrentStatus(value);
            table.getColumn('status')?.setFilterValue(value);
          }}
        >
          <SelectTrigger className='w-[180px] ml-2'>
            <SelectValue placeholder='Estado - Todos' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estado</SelectLabel>
              <SelectItem value='all'>Todos</SelectItem>
              <SelectItem value='success'>Completado</SelectItem>
              <SelectItem value='failed'>Fallido</SelectItem>
              <SelectItem value='pending'>Pendiente</SelectItem>
              <SelectItem value='processing'>En Proceso</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between'>
        {/* Rows selection */}
        <div className='text-sm text-muted-foreground pt-4'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {/* Pagination */}
        <div className='flex items-center space-x-2 pt-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='w-4 h-4 mr-1' />
            Anterior
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
            <ChevronRight className='w-4 h-4 ml-1' />
          </Button>
        </div>
      </div>

      <Select
        onValueChange={(value) => {
          table.setPageSize(+value);
        }}
      >
        <SelectTrigger className='w-40 mt-2'>
          <SelectValue placeholder='10 - Rows' />
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
    </div>
  );
}
