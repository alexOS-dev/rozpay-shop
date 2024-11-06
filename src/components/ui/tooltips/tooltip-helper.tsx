import { CircleHelp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

interface TooltipHelperProps {
  tooltipText: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const TooltipHelper = ({
  tooltipText,
  side = 'top',
}: TooltipHelperProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger type='button'>
          <CircleHelp className='w-4 h-5 ml-2 text-blue-700 dark:text-blue-400' />
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
