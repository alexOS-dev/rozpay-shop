'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const AddBrandDialog = () => {
  const [currentBrand, setCurrentBrand] = useState({
    id: '',
    name: '',
    logo: '',
  });

  const handleSaveBrand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // log brand
    console.log(currentBrand);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> Nueva marca
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentBrand.id ? 'Editar marca' : 'Nueva marca'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSaveBrand} className='space-y-4'>
          <div>
            <Label htmlFor='brandName'>Nombre de la marca</Label>
            <Input
              id='brandName'
              value={currentBrand.name}
              onChange={(e) =>
                setCurrentBrand({ ...currentBrand, name: e.target.value })
              }
              placeholder='Ingrese el nombre de la marca'
            />
          </div>
          <div>
            <Label htmlFor='brandLogo'>Logo URL</Label>
            <Input
              id='brandLogo'
              value={currentBrand.logo}
              onChange={(e) =>
                setCurrentBrand({ ...currentBrand, logo: e.target.value })
              }
              placeholder='Ingrese la URL del logo'
            />
          </div>
          <div>
            <Label htmlFor='productCount'>Product Count</Label>
            <Input
              id='productCount'
              type='number'
              placeholder='Ingrese la cantidad de productos'
            />
          </div>
          <div className='flex justify-end space-x-2'>
            <Button type='button' variant='outline'>
              Cancelar
            </Button>
            <Button type='submit'>Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
