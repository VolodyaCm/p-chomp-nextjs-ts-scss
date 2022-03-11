import React, {
  useState,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  MouseEvent,
} from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

export interface ButtonProps
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
  toggle?: boolean;
  full?: boolean;
  contentOnly?: boolean;
  error?: boolean;
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
  full,
  contentOnly,
  toggle,
  error,
  onClick,
  ...props
}: ButtonProps) => {
  const [state, setState] = useState(toggle);

  const toggleBtn = (e: MouseEvent<HTMLButtonElement>): void => {
    if (onClick) onClick(e);
    if (typeof toggle !== 'boolean') return;
    setState((prev) => !prev);
  };

  return (
    <button
      onClick={toggleBtn}
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
          [styles.toggle]: state,
          [styles.full]: full,
          [styles['content-only']]: contentOnly,
          [styles['error']]: error,
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
