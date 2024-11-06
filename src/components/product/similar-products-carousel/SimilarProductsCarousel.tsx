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
    page: 1,
    take: 10,
  });

  return (
    <Carousel className='w-full'>
      <CarouselContent className='flex items-end'>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className='pl-1 sm:basis-1 md:basis-1/2 lg:basis-1/3'
          >
            <div className='p-1'>
              <CarouselProduct product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
