import { useState } from 'react';
import { getProduct, getProduts } from '@fireb/db/product';
import ProductType from '@prtypes/Product';
import withLayout from '@layout/.';
import Header from '@layout/Header';
import styles from './ProductPage.module.scss';
import Image from 'next/image';
import ProductAddToCart from '@components/Product/AddToCart';
import Tabs, { TabType } from '@components/Tabs';
import Htag from '@components/Htag';
import ProductsList from '@components/Product/List';

interface SingleProductPageProps {
  product: ProductType;
  products: ProductType[];
}

enum SECTION_TYPES {
  description = 'Description',
  info = 'Additional Information',
  reviews = 'Reviews(0)',
}

const SingleProductPage = ({ product, products }: SingleProductPageProps) => {
  const [sectionType, setSectionType] = useState<SECTION_TYPES>(
    SECTION_TYPES.description
  );

  const changeTabHandler = (tab: TabType) => {
    setSectionType(tab.title as SECTION_TYPES);
  };

  return (
    <>
      <Header title={product.title} />
      <div className={`container container-mr ${styles.container}`}>
        <div className={styles['content-container']}>
          <div className={styles['main-content']}>
            <Image
              className={styles['product-img']}
              src={product.img}
              width={494}
              height={495}
              alt={product.title}
            />
            <div>
              <h1>{product.title}</h1>
              <p className={`color-primary ${styles.price}`}>
                $ {Number(product.price).toFixed(2)} USD
              </p>
              <div className="plain-line" />
              <p className={`text-regular ${styles.description}`}>
                {product.description}
              </p>
              <ProductAddToCart product={product} />
              <div className="plain-line" />
            </div>
          </div>
          <div className={styles['additional-info']}>
            <Tabs
              small
              onChangeTab={changeTabHandler}
              className={styles.tabs}
              tabs={Object.values(SECTION_TYPES)}
            />
            {sectionType === SECTION_TYPES.description && (
              <div className="text-regular">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  omnis iure eum, velit placeat voluptate maxime dolor
                  asperiores ipsam facilis alias. Doloremque iste fugiat ipsa,
                  illum repellat hic! Minima quasi ipsam debitis, quae tenetur
                  praesentium laboriosam at necessitatibus nemo aspernatur!
                  Molestias quos harum iure ipsa perferendis quod vel
                  exercitationem voluptas, placeat qui nulla laborum enim modi,
                  nesciunt deserunt, ipsum eligendi.
                </p>
              </div>
            )}
            {sectionType === SECTION_TYPES.info && (
              <div className="text-regular">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                blanditiis delectus dicta nam nihil iusto dolore amet eos enim
                eveniet!
              </div>
            )}
            {sectionType === SECTION_TYPES.reviews && (
              <div className="text-regular">No reviews</div>
            )}
          </div>
          <div className={styles['products-list']}>
            <Htag asTitle primary>
              Related Items
            </Htag>
            <ProductsList products={products} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const product: ProductType = (await getProduct(query.id)) as ProductType;
  const products: ProductType[] = (await getProduts({
    limit: 4,
    category: product.category,
  })) as ProductType[];

  return {
    props: {
      product,
      products,
    },
  };
}

export default withLayout(SingleProductPage);
