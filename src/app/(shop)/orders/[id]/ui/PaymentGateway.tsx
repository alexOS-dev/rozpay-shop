import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CheckCircle } from 'lucide-react';
import { rozpayCheckPayment } from '@/actions/payments/rozpay-check-payment';

export type Props = {
  productName: string;
  productDescription: string;
  productPrice: number;
  redirectTo?: string;
  orderId: string;
};

export const PaymentGateway = ({
  productName,
  productDescription,
  productPrice,
  redirectTo,
  orderId,
}: Props) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [walletProvider, setWalletProvider] = useState('');
  const [showSellerWallet, setShowSellerWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const walletOptions = [
    { value: 'binance', label: 'Binance Wallet' },
    { value: 'metamask', label: 'MetaMask' },
    { value: 'coinbase', label: 'Coinbase Wallet' },
    { value: 'trustwallet', label: 'Trust Wallet' },
    { value: 'ledger', label: 'Ledger' },
    { value: 'other', label: 'Other...' },
  ];

  const handleWalletProviderChange = (value: any) => {
    setWalletProvider(value);
    setShowSellerWallet(value === 'other');
  };

  const handlePaymentChange = (paymentMethod: any) => {
    setPaymentMethod(paymentMethod);
    if (paymentMethod === 'credit-card') {
      handleWalletProviderChange('');
    }
  };

  const handlePaymentClick = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
    await rozpayCheckPayment(orderId);
    setIsLoading(false);
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      window.location.href = redirectTo ?? '/';
    }
  }, [isSuccess, countdown]);

  const isPaymentFormValid =
    paymentMethod === 'credit-card'
      ? true // Assume credit card form is always valid
      : walletProvider !== '';

  return (
    <div className='container mx-auto p-4 bg-gray-50'>
      <Card className='w-full max-w-2xl mx-auto border border-gray-200 shadow-lg rounded-lg'>
        {isSuccess ? (
          <CardContent className='p-6 text-center'>
            <CheckCircle className='text-green-500 mx-auto mb-4' size={64} />
            <h2 className='text-2xl font-bold text-green-600'>
              ¡Pago realizado con éxito!
            </h2>
            <p className='mt-2 text-gray-600'>Redirigiendo en {countdown}...</p>
          </CardContent>
        ) : (
          <CardContent className='p-6'>
            <ProductDetails
              name={productName}
              description={productDescription}
              price={productPrice}
            />
            <Tabs value={paymentMethod} onValueChange={handlePaymentChange}>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='credit-card'>
                  Tarjeta de crédito
                </TabsTrigger>
                <TabsTrigger value='crypto'>Criptomonedas</TabsTrigger>
              </TabsList>

              <TabsContent value='credit-card'>
                <PaymentForm />
              </TabsContent>

              <TabsContent value='crypto'>
                <CryptoForm
                  walletOptions={walletOptions}
                  showSellerWallet={showSellerWallet}
                  onWalletProviderChange={handleWalletProviderChange}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        )}

        {!isSuccess && (
          <CardFooter className='p-6'>
            <Button
              onClick={handlePaymentClick}
              disabled={isLoading || !isPaymentFormValid}
              className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md'
            >
              {isLoading ? 'Procesando...' : 'Pagar con RozPay'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

function ProductDetails({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: number;
}) {
  const descCapitalized =
    description.charAt(0).toUpperCase() + description.slice(1);
  return (
    <div className='mb-6'>
      <h2 className='text-2xl font-bold'>Product Details</h2>
      <p className='mt-2 text-gray-600'>
        <strong>Producto:</strong> {name}
      </p>
      <p className='mt-1 text-gray-600'>
        <strong>Descripción:</strong> {descCapitalized}
      </p>
      <p className='mt-1 text-gray-800 font-semibold'>
        <strong>Precio:</strong> ${price.toFixed(2)}
      </p>
    </div>
  );
}

function PaymentForm() {
  return (
    <form className='space-y-4 mt-4'>
      <InputSection
        label='Número de tarjeta'
        id='card-number'
        placeholder='1234 5678 9012 3456'
      />
      <div className='grid grid-cols-2 gap-4'>
        <InputSection
          label='Fecha de expiración'
          id='expiry'
          placeholder='MM/YY'
        />
        <InputSection label='CVC' id='cvc' placeholder='123' type='password' />
      </div>
      <InputSection label='Nombre' id='name' placeholder='John Doe' />
    </form>
  );
}

function CryptoForm({
  walletOptions,
  showSellerWallet,
  onWalletProviderChange,
}: any) {
  return (
    <form className='space-y-4 mt-4'>
      <SelectInput
        label='Seleccionar criptomoneda'
        options={[
          { value: 'btc', label: 'Bitcoin (BTC)' },
          { value: 'eth', label: 'Ethereum (ETH)' },
          { value: 'usdt', label: 'Tether (USDT)' },
        ]}
      />
      <SelectInput
        label='Seleccionar Wallet'
        options={walletOptions}
        onChange={onWalletProviderChange}
      />
      {showSellerWallet && (
        <div className='grid gap-2 mt-4'>
          <Label>Seller Wallet Address</Label>
          <p className='text-gray-600'>Deposit to this wallet:</p>
          <Input
            value='1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
            readOnly
            className='bg-gray-100'
          />
        </div>
      )}
    </form>
  );
}

function InputSection({ label, id, placeholder, type = 'text' }: any) {
  return (
    <div className='grid gap-2'>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} type={type} />
    </div>
  );
}

function SelectInput({ label, options, onChange }: any) {
  return (
    <div className='grid gap-2'>
      <Label>{label}</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder='Seleccionar' />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
