import React from 'react';
import Product from '@components/Product';
import styles from './ProductsList.module.scss';
import ProductType from '@prtypes/Product';

interface ProductsListProps {
  products: ProductType[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className={styles['products-list']}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
