'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

import type { BrandWithProductCount } from '@/interfaces';
import { Button } from '../ui/button';
import { Eraser } from 'lucide-react';

interface Props {
  brands: BrandWithProductCount[];
}

export const BrandItem = ({ brands }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBrandChange = (brandSlug: string) => {
    if (brandSlug === currentBrand) return;

    const params = new URLSearchParams(searchParams.toString());
    if (brandSlug === 'all') {
      params.delete('brand');
    } else {
      params.set('brand', brandSlug);
    }

    params.delete('page');

    router.push(`/?${params.toString()}`);
  };

  const currentBrand = searchParams.get('brand') ?? 'all';

  return (
    <div className='flex flex-col gap-2'>
      <Label
        className='text-sm font-bold hover:underline cursor-pointer'
        onClick={() => handleBrandChange('all')}
      >
        Todas las marcas
      </Label>

      <RadioGroup
        className='flex flex-col gap-1'
        value={currentBrand}
        onValueChange={handleBrandChange}
      >
        {brands.map((brand) => (
          <div className='flex items-center space-x-2' key={brand.id}>
            <RadioGroupItem
              value={brand.slug}
              id={brand.slug}
              disabled={brand._count.Product < 1}
            />
            <Label className='flex items-center gap-1 capitalize text-sm'>
              {brand.name}
              <span className='text-muted-foreground text-xs'>
                ({brand._count.Product})
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
