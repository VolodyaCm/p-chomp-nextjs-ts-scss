import React, { useEffect, useState } from 'react';
import styles from './Admin.module.scss';
import AddProductForm from '@containers/AddProductForm';
import { getProduts, deleteProduct } from '@fireb/db/product';
import ProductType from '@prtypes/Product';
import Image from 'next/image';
import Button from '@components/Button';

const AdminPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    const products = (await getProduts()) as ProductType[];
    setProducts(products);
  };

  const prevPage = async () => {
    const data = (await getProduts({
      prevPage: products[0],
    })) as ProductType[];
    setProducts(data);
  };

  const nextPage = async () => {
    const data = (await getProduts({
      nextPage: products.slice(-1)[0],
    })) as ProductType[];
    setProducts(data);
  };

  const handleDeleteProduct = (id: string) => async () => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleAddProduct = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <AddProductForm onAddProduct={handleAddProduct} />
      <div className={styles['table-container']}>
        <table>
          <thead>
            <tr className={styles['table-head-row']}>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Count</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Image
                    width={45}
                    height={45}
                    src={product.img}
                    alt={product.title}
                  />
                </td>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.count}</td>
                <td>$ {Number(product.price).toFixed(2)} USD</td>
                <td>{product.description}</td>
                <td>
                  <Button
                    onClick={handleDeleteProduct(product.id)}
                    className="color-error"
                    small
                    square
                    outline
                  >
                    Del
                  </Button>
                </td>
              </tr>
            ))}
            {!products.length && (
              <tr>
                <td>No products to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <Button small outline onClick={prevPage}>
          Prev
        </Button>
        <Button small outline onClick={nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;
