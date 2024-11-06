import { BrandWithProductCount } from '@/interfaces';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
  brands: BrandWithProductCount[];
}

export const BrandItem = ({ brands }: Props) => {
  return (
    <RadioGroup className='flex flex-col gap-1'>
      {brands.map((brand) => (
        <div className='flex items-center space-x-2' key={brand.id}>
          <RadioGroupItem value={brand.slug} />
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
