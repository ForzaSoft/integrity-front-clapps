import clsx from 'clsx';
import React from 'react';
import styles from './DatePicker.module.css';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DatePickerProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  selected?: DateRange;
  onDateSelect?: (range: DateRange | undefined) => void;
  label?: string;
  placeholder?: string;
  loading?: boolean;
  from?: Date;
  to?: Date;
  mode?: 'single' | 'range';
}

const DatePicker = ({
  selected,
  onDateSelect,
  label,
  placeholder = 'Seleccionar fecha',
  loading = false,
  from,
  to,
  mode = 'range',
  ...rest
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openUpward, setOpenUpward] = React.useState(false);
  const [labelBackgroundColor, setLabelBackgroundColor] = React.useState<string>('inherit');
  const [currentMonth, setCurrentMonth] = React.useState<Date>(selected?.from || new Date());
  const [tempSelection, setTempSelection] = React.useState<DateRange | undefined>(selected);
  const [calendarView, setCalendarView] = React.useState<'days' | 'months' | 'years'>('days');

  const datePickerRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLDivElement>(null);

  const formatDateRange = (range: DateRange | undefined): string => {
    if (!range?.from) return '';

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    };

    if (!range.to) {
      return formatDate(range.from);
    }

    return `${formatDate(range.from)} - ${formatDate(range.to)}`;
  };

  const displayValue = tempSelection || selected ? formatDateRange(tempSelection || selected) : '';

  React.useEffect(() => {
    if (!datePickerRef.current) return;

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

    const parentElement = datePickerRef.current.parentElement;
    if (parentElement) {
      const bgColor = getEffectiveBackgroundColor(parentElement);
      setLabelBackgroundColor(bgColor);
    }
  }, []);

  React.useEffect(() => {
    setTempSelection(selected);
    if (selected?.from) {
      setCurrentMonth(selected.from);
    }
  }, [selected]);

  const toggleDatePicker = () => {
    if (loading) return;
    setIsOpen(!isOpen);
  };

  const closeDatePicker = () => {
    setIsOpen(false);
    setCalendarView('days');
    buttonRef.current?.focus();
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    if (onDateSelect) {
      onDateSelect(range);
    }
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startWeekDay = firstDay.getDay();

    const days: Date[] = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startWeekDay - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    const daysNeededToCompleteWeek = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= daysNeededToCompleteWeek; day++) {
      days.push(new Date(year, month + 1, day));
    }

    return days;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isDateInRange = (date: Date, range: DateRange | undefined): boolean => {
    if (!range?.from) return false;
    if (!range.to) return isSameDay(date, range.from);

    return date >= range.from && date <= range.to;
  };

  const isDateDisabled = (date: Date): boolean => {
    if (from && date < from) return true;
    if (to && date > to) return true;
    return false;
  };

  const isDateNotSelectable = (date: Date): boolean => {
    if (mode === 'single') return false;

    if (tempSelection?.from && date < tempSelection.from) return true;
    return false;
  };

  const handleDayClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    if (isDateNotSelectable(date)) return;

    let newSelection: DateRange | undefined;

    if (mode === 'single') {
      if (tempSelection?.from && isSameDay(date, tempSelection.from)) {
        newSelection = undefined;
      } else {
        newSelection = { from: date, to: undefined };
      }
    } else {
      if (!tempSelection?.from) {
        newSelection = { from: date, to: undefined };
      } else {
        if (isSameDay(date, tempSelection.from)) {
          newSelection = undefined;
        } else if (date > tempSelection.from) {
          newSelection = { from: tempSelection.from, to: date };
        } else {
          return;
        }
      }
    }

    setTempSelection(newSelection);
    handleDateSelect(newSelection);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(monthIndex);
    setCurrentMonth(newMonth);
    setCalendarView('days');
  };

  const handleYearSelect = (year: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setFullYear(year);
    setCurrentMonth(newMonth);
    setCalendarView('days');
  };

  const renderMonthView = () => {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const currentYear = currentMonth.getFullYear();

    return (
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <button
            type="button"
            onClick={() => {
              const newMonth = new Date(currentMonth);
              newMonth.setFullYear(newMonth.getFullYear() - 1);
              setCurrentMonth(newMonth);
            }}
            className={styles.navButton}
            aria-label="Año anterior"
          >
            ‹
          </button>
          <button type="button" onClick={() => setCalendarView('years')} className={styles.monthYearButton}>
            {currentYear}
          </button>
          <button
            type="button"
            onClick={() => {
              const newMonth = new Date(currentMonth);
              newMonth.setFullYear(newMonth.getFullYear() + 1);
              setCurrentMonth(newMonth);
            }}
            className={styles.navButton}
            aria-label="Año siguiente"
          >
            ›
          </button>
        </div>

        <div className={styles.monthsGrid}>
          {months.map((month, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleMonthSelect(index)}
              className={clsx(styles.monthButton, {
                [styles.currentMonth]: index === currentMonth.getMonth(),
              })}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const currentYear = currentMonth.getFullYear();
    const startYear = Math.floor(currentYear / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i - 1);

    return (
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <button
            type="button"
            onClick={() => {
              const newMonth = new Date(currentMonth);
              newMonth.setFullYear(newMonth.getFullYear() - 10);
              setCurrentMonth(newMonth);
            }}
            className={styles.navButton}
            aria-label="Década anterior"
          >
            ‹
          </button>
          <div className={styles.monthYear}>
            {startYear} - {startYear + 9}
          </div>
          <button
            type="button"
            onClick={() => {
              const newMonth = new Date(currentMonth);
              newMonth.setFullYear(newMonth.getFullYear() + 10);
              setCurrentMonth(newMonth);
            }}
            className={styles.navButton}
            aria-label="Década siguiente"
          >
            ›
          </button>
        </div>

        <div className={styles.yearsGrid}>
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => handleYearSelect(year)}
              className={clsx(styles.yearButton, {
                [styles.currentYear]: year === currentYear,
                [styles.outsideDecade]: year < startYear || year > startYear + 9,
              })}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    if (calendarView === 'months') {
      return renderMonthView();
    }

    if (calendarView === 'years') {
      return renderYearView();
    }

    const days = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long' });
    const year = currentMonth.getFullYear();

    return (
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <button
            type="button"
            onClick={() => navigateMonth('prev')}
            className={styles.navButton}
            aria-label="Mes anterior"
          >
            ‹
          </button>
          <div className={styles.monthYearContainer}>
            <button type="button" onClick={() => setCalendarView('months')} className={styles.monthYearButton}>
              {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
            </button>
            <span className={styles.separator}> de </span>
            <button type="button" onClick={() => setCalendarView('years')} className={styles.monthYearButton}>
              {year}
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigateMonth('next')}
            className={styles.navButton}
            aria-label="Mes siguiente"
          >
            ›
          </button>
        </div>

        <div className={styles.weekDays}>
          {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
            <div key={index} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {days.map((date, index) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday = isSameDay(date, new Date());
            const isSelected = isDateInRange(date, tempSelection);
            const isDisabled = isDateDisabled(date);
            const isNotSelectable = isDateNotSelectable(date);

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDayClick(date)}
                disabled={isDisabled}
                className={clsx(styles.dayButton, {
                  [styles.currentMonth]: isCurrentMonth,
                  [styles.today]: isToday,
                  [styles.selected]: isSelected,
                  [styles.disabled]: isDisabled,
                  [styles.notSelectable]: isNotSelectable,
                })}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (loading) return;

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;

      case 'Escape':
        event.preventDefault();
        closeDatePicker();
        break;

      case 'Tab':
        if (isOpen) {
          closeDatePicker();
        }
        break;
    }
  };

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        closeDatePicker();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen || loading) {
      setOpenUpward(false);
      return;
    }

    if (!datePickerRef.current) return;

    const rect = datePickerRef.current.getBoundingClientRect();
    const calendarHeight = 350;

    let container = datePickerRef.current.parentElement;
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

    const shouldOpenUpward = spaceBelow < calendarHeight && spaceAbove >= calendarHeight;

    setOpenUpward(shouldOpenUpward);
  }, [isOpen, loading]);

  if (loading) {
    return (
      <div className={styles.datePicker}>
        <div className={clsx(styles.datePickerBox, styles.loading)} />
      </div>
    );
  }

  return (
    <div className={styles.datePicker} ref={datePickerRef} {...rest}>
      {label && (
        <div
          ref={labelRef}
          className={clsx(styles.datePickerLabel, {
            [styles.hidden]: isOpen && openUpward,
          })}
          style={{
            backgroundColor: labelBackgroundColor,
          }}
        >
          {label}
        </div>
      )}

      <div
        ref={buttonRef}
        className={clsx(styles.datePickerBox, {
          [styles.open]: isOpen,
          [styles.openUpward]: isOpen && openUpward,
        })}
        onClick={toggleDatePicker}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={label || 'Seleccionar fecha'}
      >
        <div className={styles.datePickerContent}>
          <svg
            className={styles.calendarIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#898989" strokeWidth="2" fill="none" />
            <line x1="16" y1="2" x2="16" y2="6" stroke="#898989" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="2" x2="8" y2="6" stroke="#898989" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="10" x2="21" y2="10" stroke="#898989" strokeWidth="2" />
          </svg>
          <span className={styles.datePickerText}>{displayValue || placeholder}</span>
        </div>
        <span
          className={clsx(styles.triangle, {
            [styles.openUpward]: isOpen && openUpward,
          })}
        />
      </div>

      {isOpen && (
        <div
          className={clsx(styles.datePickerDropdown, {
            [styles.openUpward]: openUpward,
          })}
          role="dialog"
          aria-label="Seleccionar fechas"
        >
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
