import Dropdown, { DropdownOption } from '@/components/Dropdown';
import React from 'react';
import { DateLib, formatMonthDropdown } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import styles from './CalendarNavigation.module.css';

type CalendarNavigationProps = {
  onDateChange: (date: Date) => void;
  currentMonth?: Date;
};

const capitalizeFirstLetter = (source: string): string => {
  return String(source).charAt(0).toUpperCase() + String(source).slice(1);
};

const getYearList = (): DropdownOption<number>[] => {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: 12 }, (_, i) => {
    const value = currentYear - 10 + i;
    return {
      value,
      label: value.toString(),
    };
  });
};

const getMonthsList = (): DropdownOption<number>[] => {
  const dateLib = new DateLib({ locale: es });

  return Array.from({ length: 12 }, (_, i) => {
    return {
      value: i,
      label: capitalizeFirstLetter(formatMonthDropdown(new Date(2025, i, 1), dateLib)),
    };
  });
};

const CalendarNavigation = ({ onDateChange, currentMonth = new Date() }: CalendarNavigationProps) => {
  const [years] = React.useState<DropdownOption<number>[]>(getYearList());
  const [months] = React.useState<DropdownOption<number>[]>(getMonthsList());

  const [selYear, setSelYear] = React.useState<number>(currentMonth.getFullYear());
  const [selMonth, setSelMonth] = React.useState<number>(currentMonth.getMonth());

  React.useEffect(() => {
    setSelYear(currentMonth.getFullYear());
    setSelMonth(currentMonth.getMonth());
  }, [currentMonth.getFullYear(), currentMonth.getMonth()]);

  const handleYearChange = (year: number) => {
    setSelYear(year);
    const newDate = new Date(year, selMonth, 1);
    onDateChange(newDate);
  };

  const handleMonthChange = (month: number) => {
    setSelMonth(month);
    const newDate = new Date(selYear, month, 1);
    onDateChange(newDate);
  };

  return (
    <div className={styles.nav}>
      <div className={styles.navLabel}>Año</div>
      <div className={styles.dropdownContainer}>
        <Dropdown options={years} selected={selYear} onSelected={handleYearChange} />
      </div>

      <div className={styles.navLabel}>Mes</div>
      <div className={styles.dropdownContainer}>
        <Dropdown options={months} selected={selMonth} onSelected={handleMonthChange} />
      </div>
    </div>
  );
};

export default CalendarNavigation;
