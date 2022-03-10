import { useState, SyntheticEvent } from 'react';
import Button from '@components/Button';
import styles from './CartProduct.module.scss';
import Image from 'next/image';
import Input from '@components/Input';
import CartProductType from '@prtypes/CartProduct';

const CartProduct = ({ product }: CartProductType) => {
  const [count, setCount] = useState(1);

  const changeCount = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCount(Number(target.value));
  };

  return (
    <div className={styles.product}>
      <Image alt="image" src={product.img} width="60px" height="60px" />
      <div>
        <h1>{product.title}</h1>
        <div>$ {product.price.toFixed(2)} USD</div>
        <Button contentOnly error>
          Remove
        </Button>
      </div>
      <Input
        onChange={changeCount}
        value={count}
        type="number"
        min="1"
        pattern="^[0-9]+$"
        small
      />
    </div>
  );
};

export default CartProduct;
