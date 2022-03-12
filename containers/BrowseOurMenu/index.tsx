import React, { useState } from 'react';
import Htag from '@components/Htag';
import Tabs, { TabType } from '@components/Tabs';
import Product from '@components/Product';
import styles from './BrowseOurMenu.module.scss';
import ProductType from '@prtypes/Product';

interface BrowseOurMenuContainerProps {
  products: ProductType[];
}

const BrowseOurMenuContainer = ({ products }: BrowseOurMenuContainerProps) => {
  const [category, setCategory] = useState<'burger' | 'side' | 'drink'>(
    'burger'
  );

  const changeTabHandler = (tab: TabType) => {
    if (tab.title === 'Burgers') setCategory('burger');
    if (tab.title === 'Sides') setCategory('side');
    if (tab.title === 'Drinks') setCategory('drink');
  };

  let filteredProducts = products;

  if (category)
    filteredProducts = products.filter((p) => p.category === category);

  return (
    <section className={`container container-mr ${styles['s-our-menu']}`}>
      <Htag asTitle className={styles.h1}>
        Browse our menu
      </Htag>
      <p className="text-regular text-center">
        Use our menu to place an order online, or{' '}
        <span className="color-primary">phone</span> our store to place a pickup
        order. Fast and fresh food.
      </p>
      <Tabs
        onChangeTab={changeTabHandler}
        className={styles.tabs}
        tabs={['Burgers', 'Sides', 'Drinks']}
      />
      <div className={styles['products-list']}>
        {filteredProducts.map(({ id, img, title, price, description }) => (
          <Product
            key={id}
            img={img}
            name={title}
            price={price}
            description={description}
          />
        ))}
      </div>
    </section>
  );
};

export default BrowseOurMenuContainer;
