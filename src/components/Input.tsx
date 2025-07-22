import { IconProps } from '@/icons/type';
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, FC, JSX } from 'react';
import styles from './Input.module.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  variantSize?: 'sm' | 'md' | 'lg';
  appearance?: 'outlined' | 'underline';
  loading?: boolean;
  inverted?: boolean;
  icon?: (props: IconProps) => JSX.Element;
  iconPosition?: 'left' | 'right';
  label?: string;
}

const Input: FC<InputProps> = ({
  className,
  variantSize = 'md',
  appearance = 'outlined',
  loading = false,
  inverted = false,
  icon: Icon,
  iconPosition = 'left',
  label,
  ...rest
}) => {
  const inputRef = React.useRef<HTMLDivElement>(null);
  const [labelBackgroundColor, setLabelBackgroundColor] = React.useState<string>('inherit');

  React.useEffect(() => {
    if (!inputRef.current || !label || appearance !== 'outlined') return;

    const getEffectiveBackgroundColor = (element: HTMLElement): string => {
      let currentElement: HTMLElement | null = element;

      while (currentElement && currentElement !== document.body) {
        const computedStyle = window.getComputedStyle(currentElement);
        const backgroundColor = computedStyle.backgroundColor;

        if (
          backgroundColor &&
          backgroundColor !== 'transparent' &&
          backgroundColor !== 'rgba(0, 0, 0, 0)' &&
          !backgroundColor.includes('rgba(0, 0, 0, 0)')
        ) {
          return backgroundColor;
        }

        currentElement = currentElement.parentElement;
      }

      const bodyStyle = window.getComputedStyle(document.body);
      const bodyBg = bodyStyle.backgroundColor;
      if (bodyBg && bodyBg !== 'transparent' && bodyBg !== 'rgba(0, 0, 0, 0)') {
        return bodyBg;
      }

      const htmlStyle = window.getComputedStyle(document.documentElement);
      const htmlBg = htmlStyle.backgroundColor;
      if (htmlBg && htmlBg !== 'transparent' && htmlBg !== 'rgba(0, 0, 0, 0)') {
        return htmlBg;
      }

      return '#ffffff';
    };

    const parentElement = inputRef.current.parentElement;
    if (parentElement) {
      const bgColor = getEffectiveBackgroundColor(parentElement);
      setLabelBackgroundColor(bgColor);
    }
  }, [label, appearance]);

  if (loading) {
    return (
      <div ref={inputRef} className={clsx(styles.inputWrapper, styles[variantSize])}>
        {label && appearance === 'outlined' && (
          <div
            className={clsx(styles.inputLabel)}
            style={{
              backgroundColor: labelBackgroundColor,
            }}
          >
            {label}
          </div>
        )}
        <div className={clsx(styles.input, styles[variantSize], styles.loading, className)} />
      </div>
    );
  }

  const inputElement = (
    <input
      className={clsx(
        styles.input,
        styles[variantSize],
        styles[appearance],
        inverted && styles.inverted,
        Icon && styles.withIcon,
        Icon && iconPosition === 'right' && styles.iconRight,
        className,
      )}
      {...rest}
    />
  );

  const content = Icon ? (
    <div className={clsx(styles.inputContainer, styles[variantSize], styles[appearance])}>
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
  ) : (
    inputElement
  );

  if (label && appearance === 'outlined') {
    return (
      <div ref={inputRef} className={clsx(styles.inputWrapper, styles[variantSize])}>
        <div
          className={clsx(styles.inputLabel)}
          style={{
            backgroundColor: labelBackgroundColor,
          }}
        >
          {label}
        </div>
        {content}
      </div>
    );
  }

  return content;
};

export default Input;
