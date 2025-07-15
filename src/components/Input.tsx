import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './Input.module.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  variantSize?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Input: FC<InputProps> = ({ className, variantSize = 'md', loading = false, ...rest }) => {
  if (loading) {
    return <div className={clsx(styles.input, styles[variantSize], styles.loading, className)} />;
  }

  return <input className={clsx(styles.input, styles[variantSize], className)} {...rest} />;
};

export default Input;
