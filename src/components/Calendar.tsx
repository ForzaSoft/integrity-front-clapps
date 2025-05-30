import Dropdown, { DropdownOption } from '@/components/Dropdown';
import React from 'react';
import { DateLib, DayPicker, formatMonthDropdown } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import Button from './Button';
import styles from './Calendar.module.css';

type CalendarProps = {
  onUpdate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  points: Date[];
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

const Calendar = ({ onUpdate, points = [], ...rest }: CalendarProps) => {
  const [years, setYears] = React.useState<DropdownOption<number>[]>();
  const [selYear, setSelYear] = React.useState<number>();

  const [months, setMonths] = React.useState<DropdownOption<number>[]>();
  const [selMonth, setSelMonth] = React.useState<number>();

  const [active, setActive] = React.useState<Date>(new Date());

  const [selected, setSelected] = React.useState<Date>(new Date());
  const [lastSelected, setLastSelected] = React.useState<Date>();

  // filtrar los points por mes seleccionado
  points = points.filter((point) => point.getMonth() === active.getMonth());

  React.useEffect(() => {
    setYears(getYearList());
    setMonths(getMonthsList());

    setSelYear(selected?.getFullYear());
    setSelMonth(selected?.getMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (lastSelected === undefined || !isSameDay(lastSelected, selected)) {
      setLastSelected(selected);

      const filteredDate = selected;
      filteredDate.setHours(0, 0, 0, 0);
      onUpdate(selected);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  React.useEffect(() => {
    setSelYear(active?.getFullYear());
    setSelMonth(active?.getMonth());
  }, [active]);

  return (
    <div className={styles.container} {...rest}>
      <DayPicker
        className={styles.dayPicker}
        locale={es}
        weekStartsOn={0}
        mode="single"
        selected={selected}
        month={active}
        onSelect={(value) => {
          if (value) {
            setSelected(value);
          }
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
            setActive(new Date(selected.getFullYear(), value, 1));
          }}
        />
        <div className={styles.navLabel}>Días</div>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.yesterdayButton}
            variant="outline"
            size="sm"
            onClick={() => {
              const date = new Date(selected.getTime());
              date.setDate(selected.getDate() - 1);
              setSelected(date);
              setActive(date);
            }}
          >
            &lsaquo;
          </Button>
          <Button
            className={styles.todayButton}
            variant="outline"
            size="sm"
            onClick={() => {
              setSelected(new Date());
              setActive(new Date());
            }}
          >
            hoy
          </Button>
          <Button
            className={styles.tomorrowButton}
            variant="outline"
            size="sm"
            onClick={() => {
              const date = new Date(selected.getTime());
              date.setDate(selected.getDate() + 1);
              setSelected(date);
              setActive(date);
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
