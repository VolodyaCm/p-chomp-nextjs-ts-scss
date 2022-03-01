import React, {
  ReactNode,
  DetailedHTMLProps,
  HTMLAttributes,
  FunctionComponent,
} from 'react';
import Footer from '@layout/Footer';
import Alerts from '@layout/Alerts';
import Nav from '@layout/Nav';
import styles from './Layout.module.scss';

interface LayoutProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Alerts />
      <Nav />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  const withLayoutComponent = (props: T): JSX.Element => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
  return withLayoutComponent;
};

export default withLayout;
