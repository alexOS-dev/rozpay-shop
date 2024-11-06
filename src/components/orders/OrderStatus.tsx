import { cn } from '@/lib/utils';
import { CreditCard } from 'lucide-react';

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
        {
          'bg-rose-600': !isPaid,
          'bg-green-700': isPaid,
        }
      )}
    >
      <CreditCard size={30} />
      {/* <span className="mx-2">Pendiente de pago</span> */}
      <span className='mx-2'>{isPaid ? 'Pagada' : 'Pago pendiente'}</span>
    </div>
  );
};
