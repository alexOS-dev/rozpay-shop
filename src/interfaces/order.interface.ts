import { Color } from './product.interface';

export interface Order {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  transactionId: string | null;
  OrderAddress: {
    firstName: string;
    lastName: string;
    address: string;
    address2: string | null;
    postalCode: string;
    city: string;
  } | null;
}

export interface UserOrder {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  transactionId: string | null;
  OrderAddress: {
    firstName: string;
    lastName: string;
    address: string;
    address2: string | null;
    postalCode: string;
    city: string;
  } | null;
  OrderItem: {
    quantity: number;
    color: Color;
    product: {
      title: string;
    };
  }[];
}
