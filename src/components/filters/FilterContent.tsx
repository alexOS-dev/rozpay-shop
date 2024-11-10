import { BrandSelector } from './brand-selector';
import { CategorySelector } from './category-selector';
import { ColorToggle } from './color-toggle';
import { FreeShippingSwitch } from './free-shipping-switch';
import { OfferProductsSwitch } from './offer-products-switch';
import { PriceFilter } from './price-filter';
import { ProductOrderSelector } from './product-order-selector';

export const FilterContent = () => {
  return (
    <>
      <ProductOrderSelector />
      <CategorySelector />
      <PriceFilter />
      <OfferProductsSwitch />
      <FreeShippingSwitch />
      <ColorToggle />
      <BrandSelector />
    </>
  );
};
