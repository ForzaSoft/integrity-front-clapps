import React from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import styles from './Calendar.module.css';

type CalendarProps = {
  onSelect: (value: DateRange | undefined) => void;
  selected?: DateRange;
  month?: Date;
  points?: Date[];
  from?: Date;
  to?: Date;
} & React.ComponentPropsWithoutRef<'div'>;

const customWeekdayNames: string[] = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

const Calendar = ({ onSelect, selected, month = new Date(), points = [], from, to, ...rest }: CalendarProps) => {
  const filteredPoints = points.filter((point) => point.getMonth() === month.getMonth());

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
        month={month}
        disabled={isDateDisabled}
        fromDate={from}
        toDate={to}
        onSelect={onSelect}
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
    </div>
  );
};

export default Calendar;
