export interface Brand {
  id?: string;
  name: string;
  slug: string;
}

export interface BrandWithProductCount extends Brand {
  _count: {
    Product: number;
  };
}
