import Dropdown, { DropdownOption } from '@/components/Dropdown';
import React from 'react';
import { DateLib, DateRange, DayPicker, formatMonthDropdown } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import Button from './Button';
import styles from './Calendar.module.css';

type CalendarProps = {
  onUpdate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
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

const Calendar = ({ onUpdate, points = [], from, to, ...rest }: CalendarProps) => {
  const [years, setYears] = React.useState<DropdownOption<number>[]>();
  const [selYear, setSelYear] = React.useState<number>();

  const [months, setMonths] = React.useState<DropdownOption<number>[]>();
  const [selMonth, setSelMonth] = React.useState<number>();

  const [active, setActive] = React.useState<Date>(new Date());

  const [selected, setSelected] = React.useState<DateRange | undefined>();
  const [lastSelected, setLastSelected] = React.useState<DateRange | undefined>();

  points = points.filter((point) => point.getMonth() === active.getMonth());

  React.useEffect(() => {
    setYears(getYearList());
    setMonths(getMonthsList());

    setSelYear(selected?.from?.getFullYear() || new Date().getFullYear());
    setSelMonth(selected?.from?.getMonth() || new Date().getMonth());
  }, []);

  React.useEffect(() => {
    if (lastSelected === undefined || lastSelected.from !== selected?.from || lastSelected.to !== selected?.to) {
      setLastSelected(selected);
      onUpdate(selected);
    }
  }, [selected, lastSelected, onUpdate]);

  React.useEffect(() => {
    setSelYear(active?.getFullYear());
    setSelMonth(active?.getMonth());
  }, [active]);

  const isDateDisabled = (date: Date): boolean => {
    if (from && date < from) return true;
    if (to && date > to) return true;
    return false;
  };

  return (
    <div className={styles.container} {...rest}>
      <DayPicker
        className={styles.dayPicker}
        locale={es}
        weekStartsOn={0}
        mode="range"
        selected={selected}
        month={active}
        disabled={isDateDisabled}
        fromDate={from}
        toDate={to}
        onSelect={(value) => {
          setSelected(value);
        }}
        formatters={{
          formatWeekdayName: (weekday) => customWeekdayNames[weekday.getDay()] || '',
        }}
        modifiers={{
          points: points,
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
            setActive(new Date(selected?.from?.getFullYear() || new Date().getFullYear(), value, 1));
          }}
        />
        <div className={styles.navLabel}>Días</div>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.yesterdayButton}
            appearance="outline"
            size="sm"
            onClick={() => {
              const date = new Date();
              date.setDate(date.getDate() - 1);
              if (!isDateDisabled(date)) {
                setSelected({ from: date, to: undefined });
                setActive(date);
              }
            }}
            disabled={(() => {
              const date = new Date();
              date.setDate(date.getDate() - 1);
              return isDateDisabled(date);
            })()}
          >
            &lsaquo;
          </Button>
          <Button
            className={styles.todayButton}
            appearance="outline"
            size="sm"
            onClick={() => {
              const today = new Date();
              if (!isDateDisabled(today)) {
                setSelected({ from: today, to: undefined });
                setActive(today);
              }
            }}
            disabled={isDateDisabled(new Date())}
          >
            hoy
          </Button>
          <Button
            className={styles.tomorrowButton}
            appearance="outline"
            size="sm"
            onClick={() => {
              const date = new Date();
              date.setDate(date.getDate() + 1);
              if (!isDateDisabled(date)) {
                setSelected({ from: date, to: undefined });
                setActive(date);
              }
            }}
            disabled={(() => {
              const date = new Date();
              date.setDate(date.getDate() + 1);
              return isDateDisabled(date);
            })()}
          >
            &rsaquo;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
