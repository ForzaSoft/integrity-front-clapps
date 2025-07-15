import clsx from 'clsx';
import React from 'react';
import styles from './Dropdown.module.css';

export interface DropdownOption<T> {
  value: T;
  label: string;
}

type DropdownProps<T> = {
  options?: DropdownOption<T>[];
  selected?: T;
  onSelected?: (value: T) => void;
  label?: string;
  loading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const DropdownComponent = <T,>(props: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openUpward, setOpenUpward] = React.useState(false);
  const [selected, setSelected] = React.useState<DropdownOption<T> | undefined>();
  const [labelBackgroundColor, setLabelBackgroundColor] = React.useState<string>('inherit');

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const options = props.options || [];

  React.useEffect(() => {
    if (!dropdownRef.current) return;

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

    const parentElement = dropdownRef.current.parentElement;
    if (parentElement) {
      const bgColor = getEffectiveBackgroundColor(parentElement);
      setLabelBackgroundColor(bgColor);
    }
  }, []);

  React.useEffect(() => {
    if (options.length > 0 && !selected) {
      const defaultSelected = options.find((opt) => opt.value === props.selected) || options[0];
      setSelected(defaultSelected);
    }
  }, [props.options, props.selected, selected]);

  React.useEffect(() => {
    if (selected && props.onSelected) {
      props.onSelected(selected.value);
    }
  }, [selected?.value, props.onSelected]);

  const toggleDropdown = () => {
    if (props.loading) return;
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: DropdownOption<T>) => {
    if (props.loading) return;
    setSelected(option);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen || props.loading) {
      setOpenUpward(false);
      return;
    }

    if (!dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const menuHeight = Math.min(options.length * 32 + 16, 158);

    let container = dropdownRef.current.parentElement;
    let containerRect = null;

    while (container && container !== document.body) {
      const styles = window.getComputedStyle(container);
      const hasOverflow =
        styles.overflow !== 'visible' || styles.overflowY !== 'visible' || styles.overflowX !== 'visible';

      if (hasOverflow) {
        containerRect = container.getBoundingClientRect();
        break;
      }
      container = container.parentElement;
    }

    if (!containerRect) {
      containerRect = {
        top: 0,
        bottom: window.innerHeight,
        left: 0,
        right: window.innerWidth,
      };
    }

    const spaceBelow = containerRect.bottom - rect.bottom;
    const spaceAbove = rect.top - containerRect.top;

    const shouldOpenUpward = spaceBelow < menuHeight && spaceAbove >= menuHeight;

    setOpenUpward(shouldOpenUpward);
  }, [isOpen, options.length, props.loading]);

  if (props.loading) {
    return (
      <div className={styles.dropdown}>
        <div className={clsx(styles.dropdownBox, styles.loading)} />
      </div>
    );
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {props.label && (
        <div
          ref={labelRef}
          className={clsx(styles.dropdownLabel, {
            [styles.hidden]: isOpen && openUpward,
          })}
          style={{
            backgroundColor: labelBackgroundColor,
          }}
        >
          {props.label}
        </div>
      )}

      <div
        className={clsx(styles.dropdownBox, {
          [styles.open]: isOpen,
          [styles.openUpward]: isOpen && openUpward,
        })}
        onClick={toggleDropdown}
      >
        <span className={styles.dropdownText}>{selected?.label || ''}</span>
        <span
          className={clsx(styles.triangle, {
            [styles.openUpward]: isOpen && openUpward,
          })}
        />
      </div>

      {isOpen && (
        <ul className={clsx(styles.dropdownMenu, { [styles.openUpward]: openUpward })}>
          {options.map((option, index) => (
            <li key={index} className={styles.dropdownItem} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownComponent;
