import { SyntheticEvent, useState } from 'react';
import Image from 'next/image';
import Button from '@components/Button';
import Input from '@components/Input';
import styles from './Product.module.scss';

interface ProductComponentProps {
  img: string;
  name: string;
  price: number;
  description: string;
}

const ProductComponent = ({
  img,
  name,
  price,
  description,
}: ProductComponentProps) => {
  const [count, setCount] = useState(1);

  const changeCount = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCount(Number(target.value));
  };

  return (
    <div className={styles.product}>
      <Image
        src={img}
        height={298}
        width={298}
        alt={name}
        layout="responsive"
      />
      <p className="regular-text">{description}</p>
      <p className="color-primary">$ {price.toFixed(2)} USD</p>
      <Input
        onChange={changeCount}
        value={count}
        type="number"
        min="1"
        pattern="^[0-9]+$"
      />
      <Button primary filled small>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductComponent;
