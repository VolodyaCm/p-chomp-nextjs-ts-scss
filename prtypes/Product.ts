export enum ProductCategoryOptions {
  burger = 'burger',
  side = 'side',
  drink = 'drink',
  other = 'other',
}

export type ProductCategory =
  | ProductCategoryOptions.burger
  | ProductCategoryOptions.side
  | ProductCategoryOptions.drink
  | ProductCategoryOptions.other;

export default interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
  category: ProductCategory;
  img: string;
}
