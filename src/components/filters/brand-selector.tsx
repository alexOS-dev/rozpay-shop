import { toast } from 'sonner';

import { getBrandsWithProductQuantity } from '@/actions';
import { BrandItem } from './brand-item';
import { Label } from '../ui/label';

export const BrandSelector = async () => {
  const { ok, brands, message } = await getBrandsWithProductQuantity();

  if (!ok) {
    toast.error(message);
  }

  return (
    <div>
      <Label className='text-sm'>Marcas</Label>
      <BrandItem brands={brands ?? []} />
    </div>
  );
};
