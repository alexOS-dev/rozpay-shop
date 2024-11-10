'use client';

import { FilterIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { buttonVariants } from '../ui/button';
import { Label } from '../ui/label';

interface AccordionFilterProps {
  children: React.ReactNode;
}

export const AccordionFilter = ({ children }: AccordionFilterProps) => {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger
          className={buttonVariants({
            variant: 'outline',
            size: 'lg',
            className: 'w-full gap-2',
          })}
        >
          <Label className='flex gap-2'>
            <FilterIcon className='h-4 w-4' />
            Filtros
          </Label>
        </AccordionTrigger>
        <AccordionContent className='flex flex-col mt-5 gap-5'>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
