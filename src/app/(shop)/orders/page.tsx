export const revalidate = 0;

import { redirect } from 'next/navigation';

import { getOrdersByUser } from '@/actions';

import { Title } from '@/components';
import { OrdersTable } from './ui/OrdersTable';
import { columns } from './ui/columns';

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  // if (!ok) {
  //   redirect('/auth/login');
  // }

  return (
    <>
      <Title title='Orders' />

      <div className='mb-10'>
        <OrdersTable data={orders} columns={columns} />
        <pre>{JSON.stringify(orders, null, 2)}</pre>;
      </div>
    </>
  );
}
