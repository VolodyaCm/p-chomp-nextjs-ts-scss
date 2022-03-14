import type { NextPage } from 'next';
import withLayout from '@layout/.';
import Header from '@containers/HomePageHeader';
import Htag from '@components/Htag';
import styles from './Home.module.scss';
import Button from '@components/Button';
import Image from 'next/image';
import BrowseOurMenuContainer from '@containers/BrowseOurMenu';
import ProductType from '@prtypes/Product';

interface HomePageProps {
  products: { next: string; data: ProductType[] };
}

const Home: NextPage<HomePageProps> = ({ products }) => {
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
      <section className={`container container-mr ${styles['s-how-it-works']}`}>
        <Htag asTitle className={styles.h1}>
          How it works
        </Htag>
        <article className={styles['step']}>
          <Image
            src="/static/f7.png"
            width={454}
            height={364}
            alt="Adapt your menu items"
          />
          <h1 className="text-center">Adapt your menu items</h1>
          <p className="text-regular text-center">
            Easily adapt your menu using the webflow CMS and allow customers to
            browse your items.
          </p>
        </article>
        <article className={styles['step']}>
          <Image
            src="/static/f8.png"
            width={454}
            height={364}
            alt="Adapt your menu items"
          />
          <h1 className="text-center">Accept online orders & takeout</h1>
          <p className="text-regular text-center">
            Let your customers order and pay via the powerful ecommerce system,
            or simple let them call your store.
          </p>
        </article>
        <article className={styles['step']}>
          <Image
            src="/static/f9.png"
            width={454}
            height={364}
            alt="Adapt your menu items"
          />
          <h1 className="text-center">Manage delivery or takeout</h1>
          <p className="text-regular text-center">
            Manage your own logistics and take orders simply through the
            ecommerce system.
          </p>
        </article>
      </section>
      <BrowseOurMenuContainer products={products.data} />
      <section className={`container container-mr ${styles['s-order-online']}`}>
        <Image
          src="/static/f24.png"
          alt="Simple Checkout"
          width={353}
          height={358}
          layout="responsive"
        />
        <Htag asTitle primary>
          Order online with our simple checkout.
        </Htag>
        <p className="text-regular text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500.
        </p>
        <Button primary filled className={styles['main-btn']}>
          See our FAQ
        </Button>
      </section>
      <section className="container container-mr">
        <Htag asTitle primary>
          Call our store and takeaway when it suits you best.
        </Htag>
        <p className="text-regular text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500.
        </p>
        <Button primary filled className={styles['main-btn']}>
          Ph. +61 233 2333
        </Button>
        <Image
          src="/static/f26.png"
          alt="Simple Checkout"
          width={353}
          height={358}
          layout="responsive"
        />
      </section>
    </>
  );
};

export async function getServerSideProps() {
  const data = await fetch('http://localhost:3000/api/products?size=999');
  const products: ProductType[] = await data.json();

  return {
    props: {
      products,
    },
  };
}

export default withLayout(Home);
