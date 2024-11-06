import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingOrdersPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0 pt-10'>
      <div className='flex flex-col w-[1000px] gap-4'>
        <Skeleton className='h-16 w-80' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col items-center gap-4'>
            <Skeleton className='w-full h-12' />
            <Skeleton className='w-full h-24' />
          </div>
          <div className='flex flex-col gap-4'>
            <Skeleton className='w-full h-56' />
            <Separator />
            <Skeleton className='w-full h-56' />
            <Skeleton className='w-full h-12' />
          </div>
        </div>
      </div>
    </div>
  );
}
