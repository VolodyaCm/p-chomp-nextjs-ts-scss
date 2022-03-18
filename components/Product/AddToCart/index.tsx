import { useState, useContext, SyntheticEvent } from 'react';
import { AppContext } from '@store/.';
import { Types as CartTypes } from '@store/reducers/cart';
import Input from '@components/Input';
import Button from '@components/Button';
import ProductType from '@prtypes/Product';

interface ProductAddToCartProps {
  product: ProductType;
}

const ProductAddToCart = ({ product }: ProductAddToCartProps) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppContext);

  const changeCount = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCount(Number(target.value));
  };

  const addToCart = (e: SyntheticEvent) => {
    e.stopPropagation();
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
    <>
      <Input
        style={{ marginRight: '8px' }}
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
        onChange={changeCount}
        value={count}
        type="number"
        min="1"
        pattern="^[0-9]+$"
      />
      <Button primary filled small onClick={addToCart}>
        {loading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </>
  );
};

export default ProductAddToCart;
