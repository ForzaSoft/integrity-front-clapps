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

// Calendar básico sin fechas marcadas
export const Basic: Story = {
  args: {
    points: [],
  },
};

// Calendar con fechas marcadas (points)
export const WithPoints: Story = {
  args: {
    points: [
      new Date(2024, 2, 15), // 15 de marzo
      new Date(2024, 2, 20), // 20 de marzo
      new Date(2024, 2, 25), // 25 de marzo
      new Date(2024, 2, 28), // 28 de marzo
    ],
  },
};

// Calendar con muchas fechas marcadas
export const WithManyPoints: Story = {
  args: {
    points: [
      // Fechas de marzo 2024
      new Date(2024, 2, 1),
      new Date(2024, 2, 3),
      new Date(2024, 2, 5),
      new Date(2024, 2, 8),
      new Date(2024, 2, 10),
      new Date(2024, 2, 12),
      new Date(2024, 2, 15),
      new Date(2024, 2, 17),
      new Date(2024, 2, 19),
      new Date(2024, 2, 22),
      new Date(2024, 2, 24),
      new Date(2024, 2, 26),
      new Date(2024, 2, 29),
    ],
  },
};

// Calendar interactivo con estado controlado
export const Interactive = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [availableDates] = useState([
      new Date(2024, 2, 10),
      new Date(2024, 2, 11),
      new Date(2024, 2, 12),
      new Date(2024, 2, 15),
      new Date(2024, 2, 16),
      new Date(2024, 2, 18),
      new Date(2024, 2, 19),
      new Date(2024, 2, 22),
      new Date(2024, 2, 25),
      new Date(2024, 2, 26),
    ]);

    return (
      <div>
        <Calendar
          points={availableDates}
          onUpdate={(date) => {
            setSelectedDate(date);
            console.log('Fecha seleccionada:', date);
          }}
        />
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Fecha Seleccionada:</h4>
          <p style={{ margin: 0, fontFamily: 'monospace' }}>
            {selectedDate
              ? selectedDate.toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Ninguna'}
          </p>
        </div>
      </div>
    );
  },
};

// Casos de uso del sistema médico
export const MedicalSystem = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    // Fechas con turnos disponibles
    const turnosDisponibles = [
      new Date(2024, 2, 11), // lunes
      new Date(2024, 2, 12), // martes
      new Date(2024, 2, 13), // miércoles
      new Date(2024, 2, 15), // viernes
      new Date(2024, 2, 18), // lunes
      new Date(2024, 2, 19), // martes
      new Date(2024, 2, 20), // miércoles
      new Date(2024, 2, 22), // viernes
      new Date(2024, 2, 25), // lunes
      new Date(2024, 2, 26), // martes
      new Date(2024, 2, 27), // miércoles
      new Date(2024, 2, 29), // viernes
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

// Calendar con fechas del mes actual
export const CurrentMonth: Story = {
  args: {
    points: [
      new Date(), // hoy
      new Date(Date.now() + 24 * 60 * 60 * 1000), // mañana
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // pasado mañana
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // próxima semana
    ],
  },
};

// Calendar sin fechas marcadas (mes vacío)
export const EmptyMonth: Story = {
  args: {
    points: [],
  },
};

// Demostración con fechas de diferentes meses
export const MultiplemonthPoints: Story = {
  args: {
    points: [
      new Date(2024, 0, 15), // enero
      new Date(2024, 1, 14), // febrero
      new Date(2024, 2, 15), // marzo
      new Date(2024, 3, 15), // abril
    ],
  },
};
