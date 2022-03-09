import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './CartCounter.module.scss';
interface CartCouterProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  count: number;
}

const CartCouter = ({ count }: CartCouterProps) => {
  return (
    <div className={styles.container}>
      <div className={styles['cart-counter']}>{count}</div>
    </div>
  );
};

export default CartCouter;
