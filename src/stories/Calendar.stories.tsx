import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
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
          'Componente de calendario interactivo con navegación por dropdowns y botones, soporte para marcar fechas especiales y selección de fecha.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onUpdate: {
      description: 'Función que se ejecuta cuando se selecciona una fecha',
      action: 'date-selected',
    },
    points: {
      control: { type: 'object' },
      description: 'Array de fechas que se marcarán con un punto indicador',
    },
  },
  args: {
    onUpdate: fn(),
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    points: [],
  },
};

export const MedicalSystem = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const turnosDisponibles = [
      new Date(2024, 2, 11),
      new Date(2024, 2, 12),
      new Date(2024, 2, 13),
      new Date(2024, 2, 15),
      new Date(2024, 2, 18),
      new Date(2024, 2, 19),
      new Date(2024, 2, 20),
      new Date(2024, 2, 22),
      new Date(2024, 2, 25),
      new Date(2024, 2, 26),
      new Date(2024, 2, 27),
      new Date(2024, 2, 29),
    ];

    const formatDate = (date: Date) =>
      date.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });

    const isAvailable = (date: Date) =>
      turnosDisponibles.some((available) => available.toDateString() === date.toDateString());

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ marginTop: 0, color: '#1e40af' }}>Seleccionar Fecha de Turno</h3>
          <Calendar
            points={turnosDisponibles}
            onUpdate={(date) => {
              setSelectedDate(date);
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
            <h4 style={{ margin: '0 0 16px 0', color: '#475569' }}>📅 Información del Turno</h4>

            {selectedDate && (
              <div style={{ marginBottom: '16px' }}>
                <strong>Fecha seleccionada:</strong>
                <br />
                <span style={{ color: '#1e40af', fontSize: '18px' }}>{formatDate(selectedDate)}</span>
              </div>
            )}

            <div
              style={{
                padding: '12px',
                backgroundColor: isAvailable(selectedDate || new Date()) ? '#dcfce7' : '#fee2e2',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isAvailable(selectedDate || new Date()) ? '#166534' : '#dc2626',
                }}
              >
                <span style={{ fontSize: '18px' }}>{isAvailable(selectedDate || new Date()) ? '✅' : '❌'}</span>
                <span style={{ fontWeight: '600' }}>
                  {isAvailable(selectedDate || new Date()) ? 'Turnos disponibles' : 'No hay turnos disponibles'}
                </span>
              </div>
            </div>

            <div style={{ fontSize: '14px', color: '#64748b' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Horarios de atención:</strong>
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Mañana: 08:00 - 12:00</li>
                <li>Tarde: 14:00 - 18:00</li>
              </ul>
              <p style={{ margin: '12px 0 0 0', fontSize: '13px', fontStyle: 'italic' }}>
                * Los puntos azules indican días con turnos disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
