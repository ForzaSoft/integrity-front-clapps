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
  const [internalSelected, setInternalSelected] = React.useState<DropdownOption<T> | undefined>();
  const [labelBackgroundColor, setLabelBackgroundColor] = React.useState<string>('inherit');
  const [hasCalledInitialCallback, setHasCalledInitialCallback] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const dropdownButtonRef = React.useRef<HTMLDivElement>(null);
  const options = props.options || [];

  const selected = React.useMemo(() => {
    if (!options.length) return undefined;

    if (props.selected !== undefined) {
      return options.find((opt) => opt.value === props.selected) || options[0];
    }

    return internalSelected || options[0];
  }, [options, props.selected, internalSelected]);

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
    if (options.length > 0 && !hasCalledInitialCallback) {
      const defaultOption = options.find((opt) => opt.value === props.selected) || options[0];

      if (props.selected === undefined) {
        setInternalSelected(defaultOption);
      }

      if (props.onSelected && !hasCalledInitialCallback) {
        props.onSelected(defaultOption.value);
        setHasCalledInitialCallback(true);
      }
    }
  }, [options, props.selected, props.onSelected, hasCalledInitialCallback]);

  React.useEffect(() => {
    if (props.selected !== undefined) {
      setHasCalledInitialCallback(true);
    }
  }, [props.selected]);

  React.useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (props.loading) return;

    if (!isOpen) {
      const currentSelectedIndex = selected ? options.findIndex((opt) => opt.value === selected.value) : 0;
      setFocusedIndex(currentSelectedIndex >= 0 ? currentSelectedIndex : 0);
    } else {
      setFocusedIndex(-1);
    }

    setIsOpen(!isOpen);
  };

  const openDropdown = () => {
    if (props.loading || isOpen) return;
    const currentSelectedIndex = selected ? options.findIndex((opt) => opt.value === selected.value) : 0;
    setFocusedIndex(currentSelectedIndex >= 0 ? currentSelectedIndex : 0);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    if (!isOpen) return;
    setIsOpen(false);
    setFocusedIndex(-1);
    dropdownButtonRef.current?.focus();
  };

  const selectOption = (option: DropdownOption<T>) => {
    handleSelect(option);
    closeDropdown();
  };

  const moveFocus = (direction: 'up' | 'down' | 'first' | 'last') => {
    if (!isOpen || options.length === 0) return;

    let newIndex = focusedIndex;

    switch (direction) {
      case 'up':
        newIndex = focusedIndex <= 0 ? options.length - 1 : focusedIndex - 1;
        break;
      case 'down':
        newIndex = focusedIndex >= options.length - 1 ? 0 : focusedIndex + 1;
        break;
      case 'first':
        newIndex = 0;
        break;
      case 'last':
        newIndex = options.length - 1;
        break;
    }

    setFocusedIndex(newIndex);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (props.loading) return;

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else if (focusedIndex >= 0) {
          selectOption(options[focusedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        closeDropdown();
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          moveFocus('down');
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          moveFocus('up');
        }
        break;

      case 'Home':
        event.preventDefault();
        if (isOpen) {
          moveFocus('first');
        }
        break;

      case 'End':
        event.preventDefault();
        if (isOpen) {
          moveFocus('last');
        }
        break;

      case 'Tab':
        if (isOpen) {
          closeDropdown();
        }
        break;
    }
  };

  const handleSelect = (option: DropdownOption<T>) => {
    if (props.loading) return;

    if (props.selected !== undefined) {
      if (props.onSelected) {
        props.onSelected(option.value);
      }
    } else {
      setInternalSelected(option);
      if (props.onSelected) {
        props.onSelected(option.value);
      }
    }
  };

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
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
        ref={dropdownButtonRef}
        className={clsx(styles.dropdownBox, {
          [styles.open]: isOpen,
          [styles.openUpward]: isOpen && openUpward,
        })}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={props.label || 'Select option'}
      >
        <span className={styles.dropdownText}>{selected?.label || ''}</span>
        <span
          className={clsx(styles.triangle, {
            [styles.openUpward]: isOpen && openUpward,
          })}
        />
      </div>

      {isOpen && (
        <ul
          className={clsx(styles.dropdownMenu, { [styles.openUpward]: openUpward })}
          role="listbox"
          aria-label="Options"
          onMouseLeave={() => setFocusedIndex(-1)}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={clsx(styles.dropdownItem, {
                [styles.focused]: index === focusedIndex,
              })}
              onClick={() => selectOption(option)}
              onMouseEnter={() => setFocusedIndex(index)}
              role="option"
              aria-selected={selected?.value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownComponent;
