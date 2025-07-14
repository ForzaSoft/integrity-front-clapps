import { IconProps } from '@/icons/type';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, JSX } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'size'> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  appearance?: 'filled' | 'outline' | 'flat' | 'flat-inverted';
  size?: 'sm' | 'md' | 'lg';
  iconInputSize?: number;
  shape?: 'square' | 'round';
  color?: string;
  icon?: (props: IconProps) => JSX.Element;
}

const iconSize = {
  sm: 16,
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
  warning: '#212529',
  info: '#898989',
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
  iconInputSize,
  disabled,
  ...rest
}: ButtonProps) => {
  const customColorStyle = color ? { '--custom-color': color } : {};
  const combinedStyle = { ...customColorStyle, ...style };

  let iconColor = color || variantColors[variant];

  if (disabled) {
    iconColor = '#bcbcbc';
  } else if (
    !color &&
    (appearance === 'filled' || appearance === 'outline') &&
    (variant === 'warning' || variant === 'info')
  ) {
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
      disabled={disabled}
      {...rest}
    >
      {Icon && <Icon color={iconColor} size={iconInputSize || iconSize[size]} />}
      {children}
    </button>
  );
};

export default Button;
