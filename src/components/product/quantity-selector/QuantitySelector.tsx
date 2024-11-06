'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CircleMinus, CirclePlus, Minus, Plus } from 'lucide-react';

interface Props {
  quantity: number;

  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className='flex items-center gap-4'>
      <Button variant='outline' onClick={() => onValueChanged(-1)}>
        <Minus size={16} />
      </Button>

      <Label className='font-semibold'>{quantity}</Label>

      <Button variant='outline' onClick={() => onValueChanged(+1)}>
        <Plus size={16} />
      </Button>
    </div>
  );
};
