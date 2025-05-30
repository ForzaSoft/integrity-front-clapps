import { IconProps } from '@/icons/type';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, JSX } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'flat' | 'flat-inverted';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'square' | 'round';
  color?: 'default' | 'negative' | 'positive';
  icon?: (props: IconProps) => JSX.Element;
}

const iconSize = {
  sm: 20,
  md: 20,
  lg: 24,
};

const iconColor = {
  primary: '#ffffff',
  secondary: '#4496ff',
  outline: undefined,
  flat: '#4496ff',
  'flat-inverted': '#ffffff',
};

const colors = {
  default: null,
  negative: '#e10000',
  positive: '#62b72d',
};

const Button = ({
  icon: Icon,
  size = 'md',
  variant = 'primary',
  shape = 'square',
  color = 'default',
  className,
  children,
  ...rest
}: ButtonProps) => (
  <button
    className={clsx(
      styles.button,
      styles[size],
      styles[variant],
      styles[shape],
      styles[color],
      Icon && children && styles.hasIcon,
      Icon && !children && styles.iconOnly,
      className,
    )}
    {...rest}
  >
    {Icon && <Icon color={(variant !== 'primary' && colors[color]) || iconColor[variant]} size={iconSize[size]} />}
    {children}
  </button>
);

export default Button;
