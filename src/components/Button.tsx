import { IconProps } from '@/icons/type';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, JSX } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'size'> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  appearance?: 'filled' | 'outline' | 'flat' | 'flat-inverted';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'square' | 'round';
  color?: string;
  icon?: (props: IconProps) => JSX.Element;
}

const iconSize = {
  sm: 20,
  md: 20,
  lg: 24,
};

const variantColors = {
  primary: '#4496ff',
  success: '#62b72d',
  warning: '#ffee00',
  danger: '#ff0000',
  info: '#cccccc',
};

const variantDarkColors = {
  warning: '#b8a600',
  info: '#666666',
};

const Button = ({
  icon: Icon,
  size = 'md',
  variant = 'primary',
  appearance = 'filled',
  shape = 'round',
  color,
  className,
  children,
  style,
  ...rest
}: ButtonProps) => {
  const customColorStyle = color ? { '--custom-color': color } : {};
  const combinedStyle = { ...customColorStyle, ...style };

  // Para colores claros (warning, info) en filled, usar color oscuro de la misma gama
  let iconColor = color || variantColors[variant];
  if (!color && appearance === 'filled' && (variant === 'warning' || variant === 'info')) {
    iconColor = variantDarkColors[variant];
  }

  return (
    <button
      className={clsx(
        styles.button,
        styles[size],
        styles[variant],
        styles[appearance],
        styles[shape],
        color && styles.customColor,
        Icon && children && styles.hasIcon,
        Icon && !children && styles.iconOnly,
        className,
      )}
      style={combinedStyle}
      {...rest}
    >
      {Icon && <Icon color={iconColor} size={iconSize[size]} />}
      {children}
    </button>
  );
};

export default Button;
