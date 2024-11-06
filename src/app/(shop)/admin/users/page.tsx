export const revalidate = 0;

import { redirect } from 'next/navigation';

import { getPaginatedUsers } from '@/actions';

import { columns } from './ui/table/columns';
import { UsersTable } from './ui/table/users-table';

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <div className='py-4'>
      <UsersTable columns={columns} data={users} />
    </div>
  );
}
