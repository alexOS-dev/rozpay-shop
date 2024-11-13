'use client';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Lock, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { PaymentGateway } from './PaymentGateway';
import { cn } from '@/lib/utils';

interface Props {
  productName: string;
  productDescription: string;
  productPrice: number;
  redirectTo?: string;
  orderId: string;
  isPaid: boolean;
}

export function RozPayDialog({
  productName,
  productDescription,
  productPrice,
  redirectTo,
  orderId,
  isPaid,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button disabled={isPaid} className={cn('p-[3px] relative w-full')}>
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-r from-cyan-500 to-sky-700 rounded-lg',
              !isPaid && 'animate-pulse'
            )}
          />
          <div className='px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center gap-1'>
            <div className='flex items-center gap-1'>
              <Wallet className='w-4 h-4 text-sky-200 group-hover:text-sky-800' />
              <p className='text-md font-medium group-hover:text-black'>Roz</p>
            </div>
            <span className='bg-gradient-to-r from-cyan-500 to-sky-500 inline-block text-transparent bg-clip-text font-bold hover:bg-gradient-to-r group-hover:from-cyan-700 group-hover:to-sky-700'>
              Pay
            </span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-2xl mx-auto shadow-lg rounded-lg p-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <DialogHeader className='bg-gradient-to-r from-[#0478ad]  to-[#081633] text-white p-6'>
            <DialogTitle className='text-3xl font-bold'>RozPay</DialogTitle>
            <DialogDescription className='text-white flex items-center gap-2'>
              <span>Concreta tu pago de forma segura</span>
              <Lock className='w-4 h-4 text-white hover:text-gray-200' />
            </DialogDescription>
          </DialogHeader>
          <PaymentGateway
            productName={productName}
            productDescription={productDescription}
            productPrice={productPrice}
            redirectTo={redirectTo}
            orderId={orderId}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
