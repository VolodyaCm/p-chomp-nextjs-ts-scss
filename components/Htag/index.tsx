import React, { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styles from './Htag.module.scss';
import cn from 'classnames';

interface HtagProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  size?: 1 | 2 | 3 | 4;
  asTitle?: boolean;
  children: ReactNode;
}

const Htag = ({
  size = 1,
  children,
  className,
  asTitle = false,
  ...props
}: HtagProps) => {
  const getStyles = (tagName: 'h1' | 'h2' | 'h3' | 'h4') => {
    return cn(
      styles.htag,
      styles[tagName],
      { [styles.title]: asTitle },
      className
    );
  };

  return (
    <>
      {size === 1 && (
        <h1 className={getStyles('h1')} {...props}>
          {children}
        </h1>
      )}
      {size === 2 && (
        <h2 className={getStyles('h2')} {...props}>
          {children}
        </h2>
      )}
      {size === 3 && (
        <h3 className={getStyles('h3')} {...props}>
          {children}
        </h3>
      )}
      {size === 4 && (
        <h4 className={getStyles('h4')} {...props}>
          {children}
        </h4>
      )}
    </>
  );
};

export default Htag;
