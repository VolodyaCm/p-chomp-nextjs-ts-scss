import { AppContext } from '@store/.';
import { DetailedHTMLProps, HTMLAttributes, useContext } from 'react';
import styles from './CartCounter.module.scss';
type CartCouterProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const CartCouter = ({}: CartCouterProps) => {
  const { state } = useContext(AppContext);
  return (
    <div className={styles.container}>
      <div className={styles['cart-counter']}>{state.cart.items.length}</div>
    </div>
  );
};

export default CartCouter;
