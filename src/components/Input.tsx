import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './Input.module.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  variantSize?: 'sm' | 'md' | 'lg';
}

const Input: FC<InputProps> = ({ className, variantSize = 'md', ...rest }) => (
  <input className={clsx(styles.input, styles[variantSize], className)} {...rest} />
);

export default Input;
