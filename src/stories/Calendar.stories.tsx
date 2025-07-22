import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { fn } from 'storybook/test';

import Calendar from '@/components/Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Simplified calendar component for displaying dates and selecting ranges. Now separated from navigation component for greater flexibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    points: {
      control: { type: 'object' },
      description: 'Array of dates that will be marked with an indicator dot',
    },
  },
  args: {
    onSelect: fn(),
    month: new Date(),
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    points: [],
    month: new Date(),
  },
};

export const WithDateRange = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const formatDateRange = (range: DateRange | undefined) => {
      if (!range?.from) return 'No date selected';

      const from = range.from.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      if (!range.to) return `From: ${from}`;

      const to = range.to.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      return `From: ${from} - To: ${to}`;
    };

    const createExtendedRange = () => {
      const now = new Date();
      const startDate = new Date(now.getFullYear() - 1, 0, 1);
      const endDate = new Date(now.getFullYear() + 1, 11, 31);

      const currentMonthPoints = [
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 5),
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 12),
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 18),
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 25),
      ].filter((date) => {
        const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        return date <= lastDayOfMonth;
      });

      return {
        start: startDate,
        end: endDate,
        points: currentMonthPoints,
      };
    };

    const dateRange = createExtendedRange();

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <Calendar
            points={dateRange.points}
            from={dateRange.start}
            to={dateRange.end}
            month={currentMonth}
            selected={selectedRange}
            onSelect={(range) => {
              if (range && typeof range === 'object' && ('from' in range || 'to' in range)) {
                setSelectedRange(range as DateRange);
                console.log('Selected range:', range);
              }
            }}
          />
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <div
            style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', color: '#475569' }}>📅 Selected Range</h4>

            <div style={{ marginBottom: '16px' }}>
              <strong>Active month:</strong>
              <br />
              <span style={{ color: '#1e40af', fontSize: '16px' }}>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <strong>Date range:</strong>
              <br />
              <span style={{ color: '#1e40af', fontSize: '16px' }}>{formatDateRange(selectedRange)}</span>
            </div>

            {selectedRange?.from && selectedRange?.to && (
              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#dcfce7',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#166534',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>✅</span>
                  <span style={{ fontWeight: '600' }}>
                    Range of{' '}
                    {Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1}{' '}
                    days selected
                  </span>
                </div>
              </div>
            )}

            <div style={{ fontSize: '14px', color: '#64748b' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Instructions:</strong>
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Use dropdowns to change year/month</li>
                <li>Click calendar dates to select ranges</li>
                <li>Blue dots indicate special dates</li>
                <li>Navigation buttons (←, today, →) change the month view</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
