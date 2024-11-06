import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

interface Props {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  message: string;
}

export const ToolTipWrapper = ({
  children,
  side = 'bottom',
  message,
}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p className='capitalize text-xs'>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
