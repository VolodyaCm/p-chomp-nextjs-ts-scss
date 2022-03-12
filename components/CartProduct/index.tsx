import { useState, SyntheticEvent, useEffect, useContext } from 'react';
import Button from '@components/Button';
import styles from './CartProduct.module.scss';
import Image from 'next/image';
import Input from '@components/Input';
import CartProductType from '@prtypes/CartProduct';
import { AppContext } from '@store/.';
import { Types as CartTypes } from '@store/reducers/cart';

const CartProduct = ({ product, quantity }: CartProductType) => {
  const [count, setCount] = useState(quantity);
  const { dispatch } = useContext(AppContext);

  useEffect(() => setCount(quantity), [quantity]);

  const changeQuantity = (quantity: number) => {
    dispatch({
      type: CartTypes.ChangeQuantity,
      payload: {
        id: product.id,
        quantity,
      },
    });
  };

  const removeProduct = () => {
    dispatch({
      type: CartTypes.Delete,
      payload: {
        id: product.id,
      },
    });
  };

  const changeCount = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    changeQuantity(Number(target.value));
  };

  return (
    <div className={styles.product}>
      <Image alt="image" src={product.img} width="60px" height="60px" />
      <div>
        <h1>{product.title}</h1>
        <div>$ {product.price.toFixed(2)} USD</div>
        <Button contentOnly error onClick={removeProduct}>
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
