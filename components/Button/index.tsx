import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface HtagProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  primary?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: boolean;
  filled?: boolean;
  flat?: boolean;
  square?: boolean;
}

const Button = ({
  children,
  className,
  primary,
  outline,
  small,
  icon,
  filled,
  flat,
  square,
  ...props
}: HtagProps) => {
  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.primary]: primary,
          [styles.outline]: outline,
          [styles.small]: small,
          [styles.filled]: filled,
          [styles.flat]: flat,
          [styles['btn-icon']]: icon,
          [styles.square]: square,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
