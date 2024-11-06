import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

interface Props {
  side?: 'top' | 'right' | 'bottom' | 'left';
  stockLevel: 'low' | 'medium' | 'high' | 'out';
  children: React.ReactNode;
}

export const TooltipInStock = ({
  children,
  side = 'top',
  stockLevel,
}: Props) => {
  const stockAlert = (stockLevel: string) => {
    switch (true) {
      case stockLevel === 'out':
        return 'Agotado';
      case stockLevel === 'low':
        return 'Bajo';
      case stockLevel === 'medium':
        return 'Medio';
      default:
        return 'Alto';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>Stock: {stockAlert(stockLevel)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
