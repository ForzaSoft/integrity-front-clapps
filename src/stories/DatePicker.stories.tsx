import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import DatePicker, { DateRange } from '@/components/DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      canvas: {
        sourceState: 'hidden',
      },
      description: {
        component:
          'DatePicker component for selecting individual dates or ranges with integrated dropdown calendar. Maintains Dropdown appearance but with calendar functionality similar to Material UI.',
      },
    },
    options: {
      showPanel: true,
    },
    chromatic: {
      viewports: [1200, 800],
      delay: 1000,
    },
  },
  decorators: [
    (Story, context) => {
      if (context.name === 'Loading State') {
        return (
          <div style={{ minHeight: '120px', padding: '20px' }}>
            <Story />
          </div>
        );
      }

      return (
        <div style={{ minHeight: '500px', padding: '20px' }}>
          <Story />
        </div>
      );
    },
  ],
  tags: ['autodocs'],
  argTypes: {
    onDateSelect: {
      description: 'Function executed when a date range is selected',
      action: 'date-selected',
    },
    selected: {
      control: { type: 'object' },
      description: 'Currently selected date range',
    },
    label: {
      control: { type: 'text' },
      description: 'Label that appears floating above the field',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when no date is selected',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state that shows a shimmer placeholder',
    },
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
      description: 'Selection mode: single date or date range',
    },
  },
  args: {
    onDateSelect: fn(),
    loading: false,
    placeholder: 'Select date',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    placeholder: 'Select date',
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    label: 'Date',
    loading: true,
  },
};

export const WithDateLimits: Story = {
  name: 'With Date Limits',
  args: {
    label: 'Select period',
    placeholder: 'Limited range',
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
};

export const SingleDateMode: Story = {
  name: 'Single Date Mode',
  args: {
    label: 'Birth date',
    placeholder: 'Select date',
    mode: 'single',
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  parameters: {
    layout: 'padded',
  },
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

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

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', minHeight: '450px' }}>
        <div>
          <DatePicker
            label="Date"
            placeholder="Select range"
            selected={selectedRange}
            onDateSelect={(range) => {
              setSelectedRange(range);
              console.log('Selected range:', range);
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
            <h4 style={{ margin: '0 0 16px 0', color: '#475569' }}>📅 Result</h4>

            <div style={{ marginBottom: '16px' }}>
              <strong>Selected range:</strong>
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
                <li>Click the DatePicker to open the calendar</li>
                <li>Select start and end dates to create a range</li>
                <li>Navigate between months using arrows</li>
                <li>Dates outside the allowed range appear disabled</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
