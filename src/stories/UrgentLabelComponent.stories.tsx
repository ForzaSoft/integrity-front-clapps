import UrgentLabelComponent from '@/components/UrgentLabelComponent';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof UrgentLabelComponent> = {
  title: 'Components/UrgentLabelComponent',
  component: UrgentLabelComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente que muestra un icono de urgente cuando el caso es marcado como urgente. Se usa en listas de turnos y pacientes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    urgente: {
      control: { type: 'boolean' },
      description: 'Indica si el caso es urgente',
    },
  },
};

export const Urgent: Story = {
  args: {
    urgente: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotUrgent: Story = {
  args: {
    urgente: false,
  },
};

export const Comparison: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '1rem', borderRadius: '0.5rem' }}>
        <h4>Caso Normal</h4>
        <UrgentLabelComponent urgente={false} />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>No urgente - Sin icono</p>
      </div>

      <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '1rem', borderRadius: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h4>Caso Urgente</h4>
          <UrgentLabelComponent urgente={true} />
        </div>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>Urgente - Con icono rojo</p>
      </div>
    </div>
  ),
};
