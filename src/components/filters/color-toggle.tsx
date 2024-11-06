import { Circle } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '../ui/label';
import { TooltipColor } from '../ui/tooltips';

export function ColorToggle() {
  return (
    <div className='flex flex-col justify-center items-start gap-1'>
      <Label>Color principal</Label>
      <ToggleGroup type='single' orientation='vertical'>
        <TooltipColor color='rojo' quantity={4}>
          <ToggleGroupItem value='red' aria-label='Toggle red products color'>
            <Circle className='h-4 w-4 text-red-600 fill-red-400' />
          </ToggleGroupItem>
        </TooltipColor>

        <TooltipColor color='azul' quantity={3}>
          <ToggleGroupItem value='blue' aria-label='Toggle blue products color'>
            <Circle className='h-4 w-4 text-blue-600 fill-blue-400' />
          </ToggleGroupItem>
        </TooltipColor>

        <TooltipColor color='amarillo' quantity={1}>
          <ToggleGroupItem
            value='yellow'
            aria-label='Toggle yellow products color'
          >
            <Circle className='h-4 w-4 text-yellow-600 fill-yellow-400' />
          </ToggleGroupItem>
        </TooltipColor>

        <TooltipColor color='verde' quantity={5}>
          <ToggleGroupItem
            value='green'
            aria-label='Toggle green products color'
          >
            <Circle className='h-4 w-4 text-green-600 fill-green-400' />
          </ToggleGroupItem>
        </TooltipColor>

        <TooltipColor color='negro' quantity={2}>
          <ToggleGroupItem
            value='black'
            aria-label='Toggle black products color'
          >
            <Circle className='h-4 w-4 text-slate-500 fill-black' />
          </ToggleGroupItem>
        </TooltipColor>

        <TooltipColor color='blanco' quantity={10}>
          <ToggleGroupItem
            value='white'
            aria-label='Toggle black products color'
          >
            <Circle className='h-4 w-4 text-slate-400 fill-white' />
          </ToggleGroupItem>
        </TooltipColor>
      </ToggleGroup>
    </div>
  );
}
