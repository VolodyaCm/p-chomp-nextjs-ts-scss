import type { NextPage } from 'next';
import withLayout from '@layout/.';
import Header from '@containers/HomePageHeader';
import Htag from '@components/Htag';
import styles from './Home.module.scss';
import Button from '@components/Button';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <section
        className={`container container-mr ${styles['s-fresh-products']}`}
      >
        <Htag asTitle className={styles.h1}>
          The home of
          <br />
          fresh products
        </Htag>
        <p className="text-regular text-center m0">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500.
        </p>
        <Button primary filled className={styles['about-us-btn']}>
          Learn About Us
        </Button>
        <div className={`w100 ${styles['fresh-poroducts-img-container']}`}>
          <Image
            width={523}
            height={614}
            layout="responsive"
            src="/static/f6.png"
            alt="Fresh products"
          />
        </div>
      </section>
    </>
  );
};

export default withLayout(Home);
