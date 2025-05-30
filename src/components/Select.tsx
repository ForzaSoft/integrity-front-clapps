import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './Select.module.css';

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  variantSize?: 'sm' | 'md' | 'lg';
}

const Select: FC<SelectProps> = ({ className, variantSize = 'md', ...rest }) => (
  <select className={clsx(styles.select, styles[variantSize], className)} {...rest} />
);

export default Select;
