type ProductCategory = 'burger' | 'side' | 'drink' | 'other';

export default interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
  category: ProductCategory;
  img: string;
}
