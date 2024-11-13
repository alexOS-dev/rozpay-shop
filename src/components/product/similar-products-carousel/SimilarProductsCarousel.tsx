import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CarouselProduct } from './ui/carousel-product';
import { getPaginatedProductsWithImages } from '@/actions';

export const SimilarProductsCarousel = async () => {
  const { products } = await getPaginatedProductsWithImages({
    page: Math.floor(Math.random() * 9) + 1,
    take: 5,
  });

  return (
    <Carousel className='w-full'>
      <CarouselContent className='flex items-center justify-between'>
        {products.map((product) => (
          <CarouselItem key={product.id} className='basis-1/4 p-4'>
            <CarouselProduct product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='absolute left-0 z-10' />
      <CarouselNext className='absolute right-0 z-10' />
    </Carousel>
  );
};
