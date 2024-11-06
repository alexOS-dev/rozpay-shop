import type { Brand } from './brand.interface';
import type { Category } from './category.interface';

export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
  conditionId: string;
  condition?: Condition;
  categoryId: number;
  category?: Category;
  brandId: string | null;
  Brand?: Brand | null;
  colorId: string | null;
  Color?: Color | null;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  color: Color;
  image: string;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

export interface Condition {
  id?: string;
  name: string;
  Product?: Product[];
}

export interface Color {
  id?: string;
  name: string;
  hex: string; // Agregar el código hexadecimal del color
}

export interface CreateColor {
  name: string;
  hex: string;
}
