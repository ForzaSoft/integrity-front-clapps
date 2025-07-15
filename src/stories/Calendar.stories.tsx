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
          'Componente de calendario interactivo con navegación por dropdowns y botones, soporte para marcar fechas especiales y selección de rango de fechas. Incluye propiedades para delimitar rangos de fechas disponibles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onUpdate: {
      description: 'Función que se ejecuta cuando se selecciona un rango de fechas',
      action: 'date-range-selected',
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
    onUpdate: fn(),
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const createDateFromNow = (daysOffset: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date;
};

const createMonthRangeFromNow = (monthOffset: number): { start: Date; end: Date; points: Date[] } => {
  const now = new Date();
  const targetMonth = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const endOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0);

  return {
    start: targetMonth,
    end: endOfMonth,
    points: [
      new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 5),
      new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 12),
      new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 18),
      new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 25),
    ].filter((date) => date <= endOfMonth),
  };
};

export const Basic: Story = {
  args: {
    points: [],
  },
};

export const WithDateRange: Story = {
  args: (() => {
    const nextMonth = createMonthRangeFromNow(1);
    return {
      points: nextMonth.points,
      from: nextMonth.start,
      to: nextMonth.end,
    };
  })(),
};

export const RangeSelection = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

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

    const thisMonth = createMonthRangeFromNow(0);

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ marginTop: 0, color: '#1e40af' }}>Seleccionar Rango de Fechas</h3>
          <Calendar
            points={thisMonth.points}
            from={thisMonth.start}
            to={thisMonth.end}
            onUpdate={(range) => {
              setSelectedRange(range);
              console.log('Rango seleccionado:', range);
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
            <h4 style={{ margin: '0 0 16px 0', color: '#475569' }}>📅 Rango Seleccionado</h4>

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
                <li>Haz clic en una fecha para iniciar la selección</li>
                <li>Haz clic en otra fecha para completar el rango</li>
                <li>Los puntos azules indican fechas especiales</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const RestrictedRange = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

    const oneWeekFromNow = createDateFromNow(7);
    const fourWeeksFromNow = createDateFromNow(28);

    const weeklyPoints = [createDateFromNow(7), createDateFromNow(14), createDateFromNow(21), createDateFromNow(28)];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>📅 Ejemplo con Rango Restringido</h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
            Solo se pueden seleccionar fechas entre 1 y 4 semanas desde hoy (
            {oneWeekFromNow.toLocaleDateString('es-ES')} - {fourWeeksFromNow.toLocaleDateString('es-ES')}).
          </p>
        </div>

        <Calendar
          points={weeklyPoints}
          from={oneWeekFromNow}
          to={fourWeeksFromNow}
          onUpdate={(range) => {
            setSelectedRange(range);
            console.log('Rango seleccionado:', range);
          }}
        />

        {selectedRange?.from && (
          <div
            style={{ padding: '16px', backgroundColor: '#ecfccb', borderRadius: '8px', border: '1px solid #65a30d' }}
          >
            <strong style={{ color: '#365314' }}>Rango seleccionado:</strong>
            <br />
            <span style={{ color: '#365314' }}>
              {selectedRange.from.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              {selectedRange.to &&
                ` - ${selectedRange.to.toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}`}
            </span>
          </div>
        )}
      </div>
    );
  },
};

export const CurrentMonth = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

    const currentMonth = createMonthRangeFromNow(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '16px', backgroundColor: '#ede9fe', borderRadius: '8px', border: '1px solid #8b5cf6' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#5b21b6' }}>📅 Mes Actual</h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#5b21b6' }}>Selección disponible para todo el mes actual.</p>
        </div>

        <Calendar
          points={currentMonth.points}
          from={currentMonth.start}
          to={currentMonth.end}
          onUpdate={(range) => {
            setSelectedRange(range);
          }}
        />

        {selectedRange?.from && (
          <div
            style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}
          >
            <strong style={{ color: '#0c4a6e' }}>Selección actual:</strong>
            <br />
            <span style={{ color: '#0c4a6e' }}>
              {selectedRange.from.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
              })}
              {selectedRange.to &&
                ` - ${selectedRange.to.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                })}`}
            </span>
          </div>
        )}
      </div>
    );
  },
};
