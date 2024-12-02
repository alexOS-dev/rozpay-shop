import { toast } from 'sonner';

import { getBrandsWithProductQuantity } from '@/actions';
import { BrandItem } from './brand-item';

export const BrandSelector = async () => {
  const { ok, brands, message } = await getBrandsWithProductQuantity();

  if (!ok) {
    toast.error(message);
  }

  return <BrandItem brands={brands ?? []} />;
};
