import React from 'react';
import Htag from '@components/Htag';
import styles from './Header.module.scss';
import Button from '@components/Button';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={`container section-container ${styles.header}`}>
      <Htag asTitle className={styles.h1}>
        Beautiful food & takeaway,{' '}
        <span className={styles.highlight}>delivered</span> to your door.
      </Htag>
      <p className="text-regular text-center m0">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500.
      </p>
      <Button primary filled className={styles['place-order-btn']}>
        Place an Order
      </Button>
      <Image
        width={110}
        height={27}
        src="/static/trustpilot.svg"
        alt="trustpilot"
      />
      <p className={styles['trustpilot-p']}>
        <span className={styles.highlight}>4.8 out of 5 </span>
        based on 2000+ reviews
      </p>
      <div className={`w100 ${styles['header-img-container']}`}>
        <Image
          width={576}
          height={557}
          layout="responsive"
          src="/static/f5.png"
          alt="trustpilot"
        />
      </div>
    </header>
  );
};

export default Header;
