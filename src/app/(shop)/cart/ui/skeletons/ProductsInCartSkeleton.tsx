import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductsInCartSkeleton = () => {
  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-4'>
            <Skeleton className='w-[100px] h-[100px]' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='w-8 h-8' />
              <Skeleton className='w-8 h-8' />
            </div>
          </div>

          <Separator orientation='vertical' className='h-5' />

          <div className='flex flex-col gap-2 w-[350px]'>
            <Skeleton className='w-40 h-5' />
            <Skeleton className='w-20 h-5' />
          </div>
        </div>

        <div className='flex items-center gap-4 pr-4'>
          <Skeleton className='w-12 h-10' />
          <Skeleton className='w-7 h-7' />
          <Skeleton className='w-12 h-10' />
        </div>
      </div>
      {/* <Separator /> */}
    </div>
  );
};
