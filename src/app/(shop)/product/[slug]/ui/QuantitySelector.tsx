import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
  inStock: number;
}

export const QuantitySelector = ({
  quantity,
  onQuantityChanged,
  inStock,
}: Props) => {
  const getStockMessage = (stock: number) => {
    if (stock === 0) {
      return 'Agotado';
    } else if (stock === 1) {
      return '¡Última disponible!';
    } else if (stock >= 10 && stock < 50) {
      const decenas = Math.floor(stock / 10) * 10;
      return `(+${decenas} disponibles)`;
    } else if (stock >= 50) {
      return '(+50 disponibles)';
    }
    return `(${stock} disponibles)`; // Default case for single digit stocks other than 1
  };

  return (
    <div className='grid gap-2'>
      <Label className='text-base' htmlFor='quantity'>
        Cantidad
      </Label>
      <div className='flex items-center gap-2'>
        <Select
          defaultValue={quantity.toString()}
          onValueChange={(value) => {
            onQuantityChanged(parseInt(value));
          }}
          disabled={inStock === 0}
        >
          <SelectTrigger className='w-24'>
            <SelectValue placeholder='Cantidad' />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: Math.min(inStock, 5) }, (_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Stock disponible */}
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {getStockMessage(inStock)}
        </span>
      </div>
    </div>
  );
};
