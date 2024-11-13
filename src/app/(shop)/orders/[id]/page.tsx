import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getOrderById } from '@/actions/order/get-order-by-id';
import { currencyFormat } from '@/utils';
import { OrderStatus } from '@/components';
import { Separator } from '@/components/ui/separator';
import { RozPayDialog } from './ui/RozPayDialog';
import { CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

// Implementación de metadata para la página de órdenes
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    return {
      title: 'Orden no encontrada',
      description: 'La orden solicitada no existe o ha sido eliminada.',
    };
  }

  return {
    title: `Orden #${id.split('-').at(-1)}`,
    description: `Resumen de la orden #${id.split('-').at(-1)} de ${
      order?.OrderAddress?.firstName
    } ${order?.OrderAddress?.lastName}.`,
    openGraph: {
      title: `Orden #${id.split('-').at(-1)}`,
      description: `Revisa los detalles de la orden #${id.split('-').at(-1)}.`,
      images: order?.OrderItem[0].product.ProductImage[0].url
        ? [`/products/${order.OrderItem[0].product.ProductImage[0].url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Orden #${id.split('-').at(-1)}`,
      description: `Detalles de la orden #${id.split('-').at(-1)}`,
      images: order?.OrderItem[0].product.ProductImage[0].url
        ? [`/products/${order.OrderItem[0].product.ProductImage[0].url}`]
        : [],
    },
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  // Todo: Llamar el server action

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  const address = order?.OrderAddress;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <h1 className='antialiased text-4xl font-semibold my-7 capitalize'>
          Orden #{id.split('-').at(-1)}
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}
            {order?.OrderItem.map((item) => (
              <div
                key={item.product.slug + '-' + item.color.id}
                className='flex mb-5'
              >
                <div className='w-40 h-40 mr-5'>
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={160}
                    height={160}
                    alt={item.product.title}
                    className='rounded object-cover'
                  />
                </div>

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className='font-bold'>
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.postalCode}</p>
              <p>
                {address?.city}, {address?.province.name}
              </p>
              <p>{address?.phone}</p>
            </div>

            {/* Divider */}
            {/* <div className='w-full h-0.5 rounded bg-gray-200 mb-10' /> */}
            <Separator className='mb-10' />

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>
                {order?.itemsInOrder === 1
                  ? '1 artículo'
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className='text-right'>
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className='text-right'>{currencyFormat(order!.tax)}</span>

              <span className='mt-5 text-2xl'>Total:</span>
              <span className='mt-5 text-2xl text-right'>
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className='mt-5 mb-2 w-full flex'>
              {order?.isPaid ? (
                <button className={'p-[3px] relative w-full'}>
                  <div
                    className={
                      'absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 rounded-lg'
                    }
                  />
                  <div className='px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center gap-1'>
                    <p>Pago exitoso</p>
                    <p className='text-md font-medium'>
                      Roz
                      <span className='bg-gradient-to-r from-sky-500 to-cyan-500 group-hover:from-sky-700 group-hover:to-cyan-700 inline-block text-transparent bg-clip-text font-bold hover:bg-gradient-to-r hover:from-rose-700 hover:to-purple-700'>
                        Pay
                      </span>
                    </p>
                    <CheckCircle className='w-4 h-4 text-green-500 group-hover:text-green-700' />
                  </div>
                </button>
              ) : (
                <RozPayDialog
                  productName={order?.OrderItem[0].product.title ?? 'Producto'}
                  productPrice={order?.total ?? 0}
                  productDescription={`${order?.OrderItem[0].product.category.name}: ${order?.OrderItem[0].product.title} | x${order?.itemsInOrder}`}
                  redirectTo={`/orders/${order!.id}`}
                  orderId={order!.id}
                  isPaid={order?.isPaid ?? false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
