export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  province: {
    id: string;
    name: string;
  };
  phone: string;
}
