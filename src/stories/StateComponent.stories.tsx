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
    estadoNombre: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Cancelado: Story = {
  args: {
    idEstado: TurnoEstadoTipo.Cancelado,
    estadoNombre: 'Cancelado',
  },
};

export const Atendido: Story = {
  args: {
    idEstado: TurnoEstadoTipo.Atendido,
    estadoNombre: 'Atendido',
  },
};

export const Atendiendo: Story = {
  args: {
    idEstado: TurnoEstadoTipo.Atendiendo,
    estadoNombre: 'Atendiendo',
  },
};

export const Presente: Story = {
  args: {
    idEstado: TurnoEstadoTipo.Presente,
    estadoNombre: 'Presente',
  },
};

export const Confirmado: Story = {
  args: {
    idEstado: TurnoEstadoTipo.Confirmado,
    estadoNombre: 'Confirmado',
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
          <StateComponent idEstado={TurnoEstadoTipo.Cancelado} estadoNombre="Cancelado" />
          <span style={{ fontSize: '12px', color: '#666' }}>Rojo</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Atendido} estadoNombre="Atendido" />
          <span style={{ fontSize: '12px', color: '#666' }}>Verde</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Atendiendo} estadoNombre="Atendiendo" />
          <span style={{ fontSize: '12px', color: '#666' }}>Verde</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Presente} estadoNombre="Presente" />
          <span style={{ fontSize: '12px', color: '#666' }}>Azul</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Confirmado} estadoNombre="Confirmado" />
          <span style={{ fontSize: '12px', color: '#666' }}>Celeste</span>
        </div>
      </div>
    </div>
  ),
};

export const InMedicalContext: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <h3>Lista de Turnos del Día</h3>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {[
          { hora: '09:00', paciente: 'García, Juan', estado: TurnoEstadoTipo.Atendido, estadoNombre: 'Atendido' },
          {
            hora: '09:30',
            paciente: 'Rodríguez, María',
            estado: TurnoEstadoTipo.Atendiendo,
            estadoNombre: 'Atendiendo',
          },
          { hora: '10:00', paciente: 'Martínez, Carlos', estado: TurnoEstadoTipo.Presente, estadoNombre: 'Presente' },
          { hora: '10:30', paciente: 'López, Ana', estado: TurnoEstadoTipo.Confirmado, estadoNombre: 'Confirmado' },
          { hora: '11:00', paciente: 'Pérez, Luis', estado: TurnoEstadoTipo.Cancelado, estadoNombre: 'Cancelado' },
        ].map((turno, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '4px',
            }}
          >
            <div style={{ minWidth: '60px', fontWeight: 'bold' }}>{turno.hora}</div>
            <div style={{ flex: 1 }}>{turno.paciente}</div>
            <StateComponent idEstado={turno.estado} estadoNombre={turno.estadoNombre} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const StateFlow: Story = {
  render: () => (
    <div
      style={{
        width: '700px',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <h3>Flujo de Estados de Turno</h3>
      <p style={{ marginBottom: '2rem', color: '#666' }}>Evolución típica del estado de un turno médico</p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <StateComponent idEstado={TurnoEstadoTipo.Confirmado} estadoNombre="Confirmado" />
        <span style={{ fontSize: '20px', color: '#666' }}>→</span>

        <StateComponent idEstado={TurnoEstadoTipo.Presente} estadoNombre="Presente" />
        <span style={{ fontSize: '20px', color: '#666' }}>→</span>

        <StateComponent idEstado={TurnoEstadoTipo.Atendiendo} estadoNombre="Atendiendo" />
        <span style={{ fontSize: '20px', color: '#666' }}>→</span>

        <StateComponent idEstado={TurnoEstadoTipo.Atendido} estadoNombre="Atendido" />
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
        }}
      >
        <h4>Estado Alternativo:</h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <StateComponent idEstado={TurnoEstadoTipo.Cancelado} estadoNombre="Cancelado" />
          <span>Turno cancelado</span>
        </div>
      </div>
    </div>
  ),
};

export const ColorGuide: Story = {
  render: () => (
    <div
      style={{
        width: '500px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
      }}
    >
      <h3>Guía de Colores</h3>

      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
        <div>
          <h4 style={{ color: '#E10000' }}>🔴 Estados Críticos (Rojo)</h4>
          <StateComponent idEstado={TurnoEstadoTipo.Cancelado} estadoNombre="Cancelado" />
        </div>

        <div>
          <h4 style={{ color: '#62B72D' }}>🟢 Estados Completados (Verde)</h4>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <StateComponent idEstado={TurnoEstadoTipo.Atendido} estadoNombre="Atendido" />
            <StateComponent idEstado={TurnoEstadoTipo.Atendiendo} estadoNombre="Atendiendo" />
          </div>
        </div>

        <div>
          <h4 style={{ color: '#1530BB' }}>🔵 Estados Activos (Azul)</h4>
          <StateComponent idEstado={TurnoEstadoTipo.Presente} estadoNombre="Presente" />
        </div>

        <div>
          <h4 style={{ color: '#46CDFF' }}>🔷 Estados Pendientes (Celeste)</h4>
          <StateComponent idEstado={TurnoEstadoTipo.Confirmado} estadoNombre="Confirmado" />
        </div>
      </div>
    </div>
  ),
};

export const ForTesting: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <StateComponent idEstado={TurnoEstadoTipo.Atendido} estadoNombre="Test" />
      <StateComponent idEstado={TurnoEstadoTipo.Cancelado} estadoNombre="Test" />
      <StateComponent idEstado={TurnoEstadoTipo.Presente} estadoNombre="Test" />
    </div>
  ),
};
