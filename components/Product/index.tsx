import { SyntheticEvent, useState, useContext } from 'react';
import Image from 'next/image';
import Button from '@components/Button';
import Input from '@components/Input';
import styles from './Product.module.scss';
import { AppContext } from '@store/.';
import ProductType from '@prtypes/Product';
import { Types as CartTypes } from '@store/reducers/cart';

interface ProductComponentProps {
  product: ProductType;
}

const ProductComponent = ({ product }: ProductComponentProps) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppContext);
  const { img, title: name, price, description } = product;

  const changeCount = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCount(Number(target.value));
  };

  const addToCart = () => {
    setLoading(true);
    dispatch({
      type: CartTypes.Add,
      payload: {
        cartProduct: {
          product,
          quantity: count,
        },
      },
    });
    setTimeout(() => setLoading(false), 400);
  };

  return (
    <div className={styles.product}>
      <div className={styles['product-image-container']}>
        <Image
          className={styles['product-image']}
          src={img}
          height={298}
          width={298}
          alt={name}
          layout="responsive"
        />
      </div>
      <div>
        <h1 className={styles.title}>{name}</h1>
        <p className="color-primary">$ {price.toFixed(2)} USD</p>
        <p className="regular-text">{description}</p>
        <Input
          onChange={changeCount}
          value={count}
          type="number"
          min="1"
          pattern="^[0-9]+$"
        />
        <Button primary filled small onClick={addToCart}>
          {loading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductComponent;
