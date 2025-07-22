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
          'Componente DatePicker para selección de fechas individuales o rangos con calendario desplegable integrado. Mantiene la apariencia del Dropdown pero con funcionalidad de calendario similar a Material UI.',
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
      if (context.name === 'Estado de carga') {
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
      description: 'Función que se ejecuta cuando se selecciona un rango de fechas',
      action: 'date-selected',
    },
    selected: {
      control: { type: 'object' },
      description: 'Rango de fechas actualmente seleccionado',
    },
    label: {
      control: { type: 'text' },
      description: 'Label que aparece flotando sobre el campo',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto placeholder cuando no hay fecha seleccionada',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Estado de carga que muestra un shimmer placeholder',
    },
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
      description: 'Modo de selección: fecha única o rango de fechas',
    },
  },
  args: {
    onDateSelect: fn(),
    loading: false,
    placeholder: 'Seleccionar fecha',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: 'Básico',
  args: {
    placeholder: 'Seleccionar fecha',
  },
};

export const Loading: Story = {
  name: 'Estado de carga',
  args: {
    label: 'Fecha',
    loading: true,
  },
};

export const WithDateLimits: Story = {
  name: 'Con límites de fechas',
  args: {
    label: 'Seleccionar período',
    placeholder: 'Rango limitado',
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
};

export const SingleDateMode: Story = {
  name: 'Modo fecha única',
  args: {
    label: 'Fecha de nacimiento',
    placeholder: 'Seleccionar fecha',
    mode: 'single',
  },
};

export const Interactive: Story = {
  name: 'Ejemplo interactivo',
  parameters: {
    layout: 'padded',
  },
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

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', minHeight: '450px' }}>
        <div>
          <DatePicker
            label="Fecha"
            placeholder="Seleccionar rango"
            selected={selectedRange}
            onDateSelect={(range) => {
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
            <h4 style={{ margin: '0 0 16px 0', color: '#475569' }}>📅 Resultado</h4>

            <div style={{ marginBottom: '16px' }}>
              <strong>Rango seleccionado:</strong>
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
                <li>Haz clic en el DatePicker para abrir el calendario</li>
                <li>Selecciona fecha inicial y final para crear un rango</li>
                <li>Navega entre meses usando las flechas</li>
                <li>Las fechas fuera del rango permitido aparecen deshabilitadas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
