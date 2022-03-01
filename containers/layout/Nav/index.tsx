import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from '@components/Button';
import CartIconSVG from '@icons/Cart';
import BarsIconSVG from '@icons/Bars';
import layoutStyles from '@layout/Layout.module.scss';
import CartCounter from '@components/CartCounter';
import Link from '@components/Link';
import cn from 'classnames';
import styles from './Nav.module.scss';

const Nav = () => {
  const { asPath } = useRouter();
  const [menu, setMenu] = useState(false);

  const changeMenu = () => {
    setMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  useEffect(() => {
    const handleMenuOutsideClick = (e: Event): void => {
      const target = e.target as HTMLElement;
      if (
        target.id === 'target=close-menu' ||
        target.id === 'nav-links-list-container-target'
      )
        closeMenu();
    };
    document.addEventListener('click', handleMenuOutsideClick);

    return () => document.removeEventListener('click', handleMenuOutsideClick);
  }, []);

  return (
    <div className={cn(layoutStyles['section-container'], styles.nav)}>
      <div className="logo">
        <Image width="40px" height="51px" src="/static/1_logo.svg" alt="logo" />
      </div>

      <div className={styles['end-items']}>
        <Button square primary filled>
          <CartIconSVG />
          <CartCounter count={0} />
        </Button>

        <Button
          className={styles['toggle-button']}
          square
          flat
          filled
          toggle={false}
          onClick={changeMenu}
        >
          <BarsIconSVG />
        </Button>

        {menu && (
          <div
            id="target=close-menu"
            onClick={closeMenu}
            className={styles.cover}
          ></div>
        )}

        <div
          id="nav-links-list-container-target"
          className={styles['nav-links-list-container']}
        >
          <nav
            className={cn(styles['nav-links-list'], {
              [styles.hide]: !menu,
              [styles.show]: menu,
            })}
          >
            <Link active={true} href="/home">
              Home
            </Link>
            <Link active={asPath === '/order'} href="/order">
              Order
            </Link>
            <Link active={asPath === '/company'} href="/company">
              Company
            </Link>
            <Link active={asPath === '/faq'} href="/faq">
              FAQ
            </Link>
            <Link active={asPath === '/contact'} href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;
