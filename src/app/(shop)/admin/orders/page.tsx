import { redirect } from 'next/navigation';

import { getPaginatedOrders } from '@/actions';

import { Title } from '@/components';
import { columns } from './ui/columns';
import { OrdersTable } from './ui/OrdersTable';

export default async function PaymentsPage() {
  const { ok, orders = [] } = await getPaginatedOrders();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <div className='container mx-auto py-10'>
      <Title title='Listado de ordenes' />
      <OrdersTable columns={columns} data={orders} />
    </div>
  );
}
