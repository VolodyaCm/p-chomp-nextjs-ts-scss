import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  small?: boolean;
  large?: boolean;
}

const Input = ({ className, small, large, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        styles.input,
        {
          [styles.small]: small,
          [styles.large]: large,
        },
        className
      )}
      {...props}
    />
  );
};

export default Input;
