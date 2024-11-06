'use client';

import Image from 'next/image';
import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { BrandWithProductCount } from '@/interfaces';

interface Props {
  brands: BrandWithProductCount[];
}

export const BrandsTable = ({ brands }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de marcas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands?.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>
                  <Image
                    src='/imgs/placeholder.jpg'
                    alt={`${brand.name} logo`}
                    width={50}
                    height={50}
                    className='w-10 h-10 object-fit rounded-full'
                  />
                </TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand._count.Product}</TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    size='icon'
                    // onClick={() => handleOpenModal(brand)}
                  >
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    // onClick={() => handleDeleteBrand(brand.id)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
