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
  color: string;
}

export const TooltipProductColor = ({
  children,
  side = 'bottom',
  color,
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
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
