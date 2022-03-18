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
import Cart from '@containers/Cart';

const Nav = () => {
  const { asPath } = useRouter();
  const [menu, setMenu] = useState(false);
  const [cartState, setCartState] = useState(false);

  const changeMenu = () => {
    setMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const changeCartState = () => {
    setCartState((prev) => !prev);
  };

  const closeCart = () => {
    setCartState(false);
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
    <>
      <Cart onClose={closeCart} visible={cartState} />
      <div className={cn(layoutStyles['section-container'])}>
        <div className={styles.nav}>
          <div className="logo">
            <Image
              width="40px"
              height="51px"
              src="/static/1_logo.svg"
              alt="logo"
            />
          </div>

          <div className={styles['end-items']}>
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
                <Link active={true} href="/">
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

            <Button
              square
              primary
              filled
              className={styles['cart-button']}
              onClick={changeCartState}
            >
              <CartIconSVG />
              <CartCounter />
            </Button>

            <Button
              className={styles['menu-button']}
              square
              flat
              filled
              toggle={false}
              onClick={changeMenu}
            >
              <BarsIconSVG />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
