'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

import type { BrandWithProductCount } from '@/interfaces';

interface Props {
  brands: BrandWithProductCount[];
}

export const BrandItem = ({ brands }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBrandChange = (brandSlug: string) => {
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
          <Label className='flex items-center gap-1 capitalize'>
            {brand.name}
            <span className='text-muted-foreground text-xs'>
              ({brand._count.Product})
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
