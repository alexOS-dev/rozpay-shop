import { Brand, Category, Color, Condition, ProductImage } from '@/interfaces';

export interface ProductBySlug {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  conditionId: string | null;
  categoryId: number | null;
  brandId: string | null;
  colorId: string | null;
  ProductImage: ProductImage[];
  Brand: Brand | null;
  category: Category | null;
  condition: Condition | null;
  Color: Color | null;
  images: string[];
}
