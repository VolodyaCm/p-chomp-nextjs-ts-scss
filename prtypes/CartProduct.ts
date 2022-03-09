import ProductType from '@prtypes/Product';

export default interface CartProductType {
  product: ProductType;
  quantity: number;
}
