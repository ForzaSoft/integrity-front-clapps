import { IconProps } from '@/icons/type';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC, JSX } from 'react';
import styles from './Input.module.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  variantSize?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  inverted?: boolean;
  icon?: (props: IconProps) => JSX.Element;
  iconPosition?: 'left' | 'right';
}

const Input: FC<InputProps> = ({
  className,
  variantSize = 'md',
  loading = false,
  inverted = false,
  icon: Icon,
  iconPosition = 'left',
  ...rest
}) => {
  if (loading) {
    return <div className={clsx(styles.input, styles[variantSize], styles.loading, className)} />;
  }

  const inputElement = (
    <input
      className={clsx(
        styles.input,
        styles[variantSize],
        inverted && styles.inverted,
        Icon && styles.withIcon,
        Icon && iconPosition === 'right' && styles.iconRight,
        className,
      )}
      {...rest}
    />
  );

  if (Icon) {
    return (
      <div className={clsx(styles.inputContainer, styles[variantSize])}>
        {iconPosition === 'left' && (
          <div className={styles.iconWrapper}>
            <Icon
              size={variantSize === 'sm' ? 14 : variantSize === 'lg' ? 20 : 16}
              color={inverted ? 'white' : '#898989'}
            />
          </div>
        )}
        {inputElement}
        {iconPosition === 'right' && (
          <div className={styles.iconWrapper}>
            <Icon
              size={variantSize === 'sm' ? 14 : variantSize === 'lg' ? 20 : 16}
              color={inverted ? 'white' : '#898989'}
            />
          </div>
        )}
      </div>
    );
  }

  return inputElement;
};

export default Input;
