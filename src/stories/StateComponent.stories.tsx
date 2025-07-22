import StateComponent from '@/components/StateComponent';
import { TurnoEstadoTipo } from '@/types/api';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof StateComponent> = {
  title: 'Components/StateComponent',
  component: StateComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente que muestra el estado de los turnos médicos con colores específicos para cada estado.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    idEstado: {
      control: { type: 'select' },
      options: Object.values(TurnoEstadoTipo),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    idEstado: TurnoEstadoTipo.Atendido,
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      <h3>Estados de Turnos Médicos</h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Cancelado} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Atendido} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Atendiendo} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Presente} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Confirmado} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Controlado} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Llamado} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Bloqueado} />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Asignado} />
        </div>
      </div>
    </div>
  ),
};
