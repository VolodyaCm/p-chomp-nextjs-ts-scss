import Image from 'next/image';
import styles from './Product.module.scss';
import ProductType from '@prtypes/Product';
import { useRouter } from 'next/router';
import ProductAddToCart from '@components/Product/AddToCart';

interface ProductComponentProps {
  product: ProductType;
}

const ProductComponent = ({ product }: ProductComponentProps) => {
  const router = useRouter();
  const { img, title: name, price, description } = product;

  const goToProduct = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className={styles.product} onClick={goToProduct}>
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
        <ProductAddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductComponent;
