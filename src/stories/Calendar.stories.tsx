import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { fn } from 'storybook/test';

import Calendar from '@/components/Calendar';
import CalendarNavigation from '@/components/CalendarNavigation';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de calendario simplificado para mostrar fechas y seleccionar rangos. Ahora separado del componente de navegación para mayor flexibilidad.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: {
      description: 'Función que se ejecuta cuando se selecciona un rango de fechas',
      action: 'date-range-selected',
    },
    selected: {
      control: { type: 'object' },
      description: 'Rango de fechas actualmente seleccionado',
    },
    month: {
      control: { type: 'date' },
      description: 'Mes que se muestra en el calendario',
    },
    points: {
      control: { type: 'object' },
      description: 'Array de fechas que se marcarán con un punto indicador',
    },
    from: {
      control: { type: 'date' },
      description: 'Fecha mínima seleccionable (delimita el inicio del rango)',
    },
    to: {
      control: { type: 'date' },
      description: 'Fecha máxima seleccionable (delimita el final del rango)',
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

export const WithNavigation = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const formatDateRange = (range: DateRange | undefined) => {
      if (!range?.from) return 'Ninguna fecha seleccionada';

      const from = range.from.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      if (!range.to) return `Desde: ${from}`;

      const to = range.to.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      return `Desde: ${from} - Hasta: ${to}`;
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
              if (range && typeof range === 'object' && 'from' in range) {
                setSelectedRange(range);
                console.log('Rango seleccionado:', range);
              }
            }}
          />
        </div>

        <CalendarNavigation
          currentMonth={currentMonth}
          onDateChange={(date) => {
            setCurrentMonth(date);
          }}
        />

        <div style={{ flex: '1', minWidth: '300px' }}>
          <div
            style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', color: '#475569' }}>📅 Rango Seleccionado</h4>

            <div style={{ marginBottom: '16px' }}>
              <strong>Mes activo:</strong>
              <br />
              <span style={{ color: '#1e40af', fontSize: '16px' }}>
                {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <strong>Rango de fechas:</strong>
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
                    Rango de{' '}
                    {Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1}{' '}
                    días seleccionado
                  </span>
                </div>
              </div>
            )}

            <div style={{ fontSize: '14px', color: '#64748b' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Instrucciones:</strong>
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Usa los dropdowns para cambiar año/mes</li>
                <li>Haz clic en fechas del calendario para seleccionar rangos</li>
                <li>Los puntos azules indican fechas especiales</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
