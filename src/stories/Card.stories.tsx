import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from '@/components/Button';
import Card from '@/components/Card';
import AgregarIcon from '@/icons/AgregarIcon';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'flat'],
      description: 'Visual variant of the card',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the card (CSS value)',
    },
    title: {
      control: { type: 'text' },
      description: 'Title displayed in the header',
    },
    paddingX: {
      control: { type: 'number' },
      description: 'Horizontal padding for content area',
    },
    paddingY: {
      control: { type: 'number' },
      description: 'Vertical padding for content area',
    },
    marginTop: {
      control: { type: 'number' },
      description: 'Top margin of the card',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Card Básica',
    children: (
      <div>
        <p>Este es el contenido básico de la card.</p>
        <p>Puede contener cualquier elemento React.</p>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    children: (
      <div>
        <h3>Contenido sin título</h3>
        <p>Esta card no tiene header con título.</p>
      </div>
    ),
  },
};

export const Flat: Story = {
  args: {
    title: 'Card Flat',
    variant: 'flat',
    children: (
      <div>
        <p>Esta card usa la variante &apos;flat&apos; que no tiene fondo gris.</p>
        <p>Solo se ve el header con gradiente.</p>
      </div>
    ),
  },
};

export const Filled: Story = {
  args: {
    title: 'Card Filled',
    variant: 'filled',
    children: (
      <div>
        <p>Esta card usa la variante &apos;filled&apos; con fondo gris.</p>
        <p>Es la variante por defecto.</p>
      </div>
    ),
  },
};

export const CustomWidth: Story = {
  args: {
    title: 'Card Ancha',
    width: '600px',
    children: (
      <div>
        <p>Esta card tiene un ancho personalizado de 600px.</p>
        <p>El ancho por defecto es 360px.</p>
      </div>
    ),
  },
};

export const CustomPadding: Story = {
  args: {
    title: 'Card con Padding Personalizado',
    paddingX: 30,
    paddingY: 20,
    children: (
      <div>
        <p>Esta card tiene padding horizontal de 30px y vertical de 20px.</p>
        <p>El padding por defecto es 10px en ambas direcciones.</p>
      </div>
    ),
  },
};

export const WithMarginTop: Story = {
  args: {
    title: 'Card con Margen Superior',
    marginTop: 40,
    children: (
      <div>
        <p>Esta card tiene un margen superior de 40px.</p>
        <p>Útil para separar cards en layouts verticales.</p>
      </div>
    ),
  },
};

export const WithComplexContent: Story = {
  args: {
    title: 'Información del Usuario',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#e0e7ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#4338ca',
            }}
          >
            JD
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Juan Pérez</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>juan.perez@ejemplo.com</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '4px 12px',
              backgroundColor: '#dcfce7',
              color: '#166534',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            Activo
          </span>
          <span
            style={{
              padding: '4px 12px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            Administrador
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button size="sm" variant="outline">
            Ver Perfil
          </Button>
          <Button size="sm" variant="primary" icon={AgregarIcon}>
            Editar
          </Button>
        </div>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    title: 'Card Pequeña',
    width: '240px',
    paddingX: 12,
    paddingY: 8,
    children: (
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>24</h3>
        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Turnos Hoy</p>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    title: 'Dashboard Completo',
    width: '800px',
    paddingX: 24,
    paddingY: 20,
    children: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#0ea5e9' }}>128</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Total Pacientes</p>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#22c55e' }}>45</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Atendidos Hoy</p>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#ef4444' }}>3</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Cancelados</p>
        </div>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    title: 'Card Sin Padding',
    paddingX: 0,
    paddingY: 0,
    children: (
      <div
        style={{
          border: '2px dashed #d1d5db',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Contenido sin padding interno</p>
      </div>
    ),
  },
};
