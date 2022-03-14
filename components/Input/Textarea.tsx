import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

interface InputProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  small?: boolean;
  large?: boolean;
  textarea?: boolean;
}

interface InputProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  small?: boolean;
  large?: boolean;
}

const Input = ({ className, small, large, ...props }: InputProps) => {
  return (
    <textarea
      className={cn(
        styles.input,
        styles.textarea,
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
