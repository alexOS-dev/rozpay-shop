import { auth } from '@/auth.config';

import { getProvinces, getUserAddress } from '@/actions';

import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import prisma from '@/lib/prisma';

export default async function AddressPage() {
  const provinces = await getProvinces();

  // const session = await auth();

  // if (!session?.user) {
  //   return <h3 className='text-5xl'>500 - No hay sesión de usuario</h3>;
  // }

  // const userAddress = (await getUserAddress(session.user.id)) ?? undefined;

  const guestUser = await prisma.user.findFirst({
    where: {
      name: 'Invitado',
    },
  });

  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Dirección' subtitle='Dirección de entrega' />

        <AddressForm
          provinces={provinces}
          userStoredAddress={undefined}
          userId={guestUser!.id}
        />
      </div>
    </div>
  );
}
