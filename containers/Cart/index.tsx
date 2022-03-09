import { useEffect, useState, SyntheticEvent, useContext } from 'react';
import styles from './Cart.module.scss';
import CloseIconSVG from '@icons/Close';
import cn from 'classnames';
import Button from '@components/Button';
import Htag from '@components/Htag';
import CartProduct from '@components/CartProduct';
import { AppContext } from '@store/.';
import CartProductType from '@prtypes/CartProduct';

interface CartProps {
  visible?: boolean;
  onClose: () => void;
}

const Cart = ({ visible = true, onClose }: CartProps) => {
  const {
    state: { cart },
  } = useContext(AppContext);
  const [showCart, setShowCart] = useState(false);

  const getTotal = () =>
    `$ ${cart.items
      .reduce((sum, { product: { price } }) => sum + price, 0)
      .toFixed(2)} USD`;

  const close = () => {
    setShowCart(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  useEffect(() => {
    if (visible) setShowCart(true);
  }, [visible]);

  return (
    <div
      id="cart-container"
      onClick={(e: SyntheticEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.id === 'cart-container') {
          close();
        }
      }}
      className={cn(styles.container, {
        [styles.show2]: showCart,
        [styles.show]: visible,
      })}
    >
      <div
        className={cn(styles.cart, {
          [styles.show]: showCart,
        })}
      >
        <div className={`${styles.section} ${styles.nav}`}>
          <Htag size={4}>Your Order</Htag>
          <Button contentOnly onClick={close}>
            <CloseIconSVG />
          </Button>
        </div>
        <div className={`${styles.section} ${styles['products-list']}`}>
          {cart.items.map((product: CartProductType) => (
            <CartProduct key={product.product.title} {...product} />
          ))}
        </div>
        <div className={`${styles.section} ${styles.submit}`}>
          <div className={`w100 flex flex-between ${styles.subtotal}`}>
            <span className="text-regular">Subtotal:</span>{' '}
            <strong>{getTotal()}</strong>
          </div>
          <Button primary filled full className="w100">
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
