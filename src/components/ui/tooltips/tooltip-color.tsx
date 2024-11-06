import { Label } from '../label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

interface Props {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  color: 'rojo' | 'azul' | 'amarillo' | 'verde' | 'negro' | 'blanco';
  quantity: number;
}

export const TooltipColor = ({
  children,
  side = 'bottom',
  color,
  quantity,
}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className='flex flex-col items-center justify-center px-5 py-2 gap-1'
        >
          <Label className='capitalize'>{color}</Label>
          <span className='text-md dark:text-gray-800'>({quantity})</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
