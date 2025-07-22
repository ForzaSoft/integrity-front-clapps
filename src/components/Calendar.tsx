import Dropdown, { DropdownOption } from '@/components/Dropdown';
import React from 'react';
import { DateLib, DateRange, DayPicker, formatMonthDropdown } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import Button from './Button';
import styles from './Calendar.module.css';

type CalendarProps = {
  onSelect?: (range: DateRange | undefined) => void;
  selected?: DateRange;
  month?: Date;
  points?: Date[];
  from?: Date;
  to?: Date;
} & React.ComponentPropsWithoutRef<'div'>;

const customWeekdayNames: string[] = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

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

const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

const Calendar = ({ onSelect, selected, month = new Date(), points = [], from, to, ...rest }: CalendarProps) => {
  const [years, setYears] = React.useState<DropdownOption<number>[]>();
  const [selYear, setSelYear] = React.useState<number>();

  const [months, setMonths] = React.useState<DropdownOption<number>[]>();
  const [selMonth, setSelMonth] = React.useState<number>();

  const [active, setActive] = React.useState<Date>(month);

  const filteredPoints = points.filter((point) => point.getMonth() === active.getMonth());

  React.useEffect(() => {
    setYears(getYearList());
    setMonths(getMonthsList());

    setSelYear(active.getFullYear());
    setSelMonth(active.getMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setActive(month);
  }, [month]);

  React.useEffect(() => {
    setSelYear(active.getFullYear());
    setSelMonth(active.getMonth());
  }, [active]);

  return (
    <div className={styles.container} {...rest}>
      <DayPicker
        className={styles.dayPicker}
        locale={es}
        weekStartsOn={0}
        mode="range"
        selected={selected}
        month={active}
        fromDate={from}
        toDate={to}
        onSelect={(range) => {
          onSelect?.(range);
        }}
        formatters={{
          formatWeekdayName: (weekday) => customWeekdayNames[weekday.getDay()] || '',
        }}
        modifiers={{
          points: filteredPoints,
        }}
        modifiersClassNames={{
          points: 'modifier-points',
        }}
        modifiersStyles={{
          selected: {
            backgroundColor: '#023E8A',
          },
          today: {
            border: '1px solid #3185EF',
          },
        }}
        styles={{
          month_caption: {
            display: 'none',
          },
          weekday: {
            fontFamily: 'Rubik',
            fontSize: '12px',
            lineHeight: '14px',
            fontWeight: '400',
            letterSpacing: '0%',
            color: '#4C5260',
          },
          day: {
            borderRadius: '50%',
            padding: '5px 2px',
            textAlign: 'center',
          },
          day_button: {
            width: '26px',
            height: '20px',
            fontFamily: 'Rubik',
            fontSize: '12px',
            lineHeight: '14px',
            fontWeight: '400',
            letterSpacing: '0%',
            border: 'none',
            background: 'none',
            color: '#4C5260',
          },
        }}
        hideNavigation
      />
      <div className={styles.nav}>
        <div className={styles.navLabel}>Año</div>
        <Dropdown
          options={years}
          selected={selYear}
          onSelected={(value) => {
            setActive(new Date(value, active.getMonth(), 1));
          }}
        />
        <div className={styles.navLabel}>Mes</div>
        <Dropdown
          options={months}
          selected={selMonth}
          onSelected={(value) => {
            setActive(new Date(active.getFullYear(), value, 1));
          }}
        />
        <div className={styles.navLabel}>Días</div>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.yesterdayButton}
            variant="primary"
            appearance="outline"
            size="sm"
            onClick={() => {
              const newDate = new Date(active);
              newDate.setDate(active.getDate() - 1);
              setActive(newDate);
            }}
          >
            &lsaquo;
          </Button>
          <Button
            className={styles.todayButton}
            variant="primary"
            appearance="outline"
            size="sm"
            onClick={() => {
              const today = new Date();
              setActive(today);
            }}
          >
            hoy
          </Button>
          <Button
            className={styles.tomorrowButton}
            variant="primary"
            appearance="outline"
            size="sm"
            onClick={() => {
              const newDate = new Date(active);
              newDate.setDate(active.getDate() + 1);
              setActive(newDate);
            }}
          >
            &rsaquo;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
