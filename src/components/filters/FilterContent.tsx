import { BrandSelector } from './brand-selector';
import { CategorySelector } from './category-selector';
import { FreeShippingSwitch } from './free-shipping-switch';
import { PriceFilter } from './price-filter';
import { ProductOrderSelector } from './product-order-selector';

export const FilterContent = () => {
  return (
    <>
      <ProductOrderSelector />
      <CategorySelector />
      <PriceFilter />
      <FreeShippingSwitch />
      <BrandSelector />
    </>
  );
};
