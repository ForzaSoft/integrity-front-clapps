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

export default meta;
type Story = StoryObj<typeof meta>;

export const NotUrgent: Story = {
  args: {
    urgente: false,
  },
};

export const Urgent: Story = {
  args: {
    urgente: true,
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
      <div style={{ textAlign: 'center' }}>
        <h4>Caso Normal</h4>
        <UrgentLabelComponent urgente={false} />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>No urgente - Sin icono</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4>Caso Urgente</h4>
        <UrgentLabelComponent urgente={true} />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>Urgente - Con icono rojo</p>
      </div>
    </div>
  ),
};

export const InPatientList: Story = {
  render: () => (
    <div
      style={{
        width: '500px',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
      }}
    >
      <h3 style={{ margin: '0 0 1.5rem 0' }}>Lista de Pacientes</h3>

      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {[
          { nombre: 'García, Juan', hora: '09:00', urgente: false },
          { nombre: 'Rodríguez, María', hora: '09:30', urgente: true },
          { nombre: 'Martínez, Carlos', hora: '10:00', urgente: false },
          { nombre: 'López, Ana', hora: '10:30', urgente: true },
          { nombre: 'Pérez, Luis', hora: '11:00', urgente: false },
          { nombre: 'González, Elena', hora: '11:30', urgente: true },
        ].map((paciente, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <div
              style={{
                minWidth: '60px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              {paciente.hora}
            </div>
            <div
              style={{
                flex: 1,
                fontSize: '14px',
              }}
            >
              {paciente.nombre}
            </div>
            <div
              style={{
                minWidth: '30px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <UrgentLabelComponent urgente={paciente.urgente} />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        <strong>Leyenda:</strong> Los casos marcados con el icono rojo requieren atención prioritaria.
      </div>
    </div>
  ),
};

export const InMedicalDashboard: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ margin: '0 0 1.5rem 0' }}>Dashboard Médico - Turnos del Día</h3>

      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>Próximos Turnos</h4>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {[
              { paciente: 'García, Juan', especialidad: 'Cardiología', urgente: false },
              { paciente: 'Rodríguez, María', especialidad: 'Emergencias', urgente: true },
              { paciente: 'Martínez, Carlos', especialidad: 'Clínica Médica', urgente: false },
            ].map((turno, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: 'white',
                  borderRadius: '3px',
                }}
              >
                <UrgentLabelComponent urgente={turno.urgente} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{turno.paciente}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{turno.especialidad}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>Estadísticas</h4>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Total de turnos:</span>
              <strong>24</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UrgentLabelComponent urgente={true} />
                Casos urgentes:
              </span>
              <strong style={{ color: '#e10000' }}>6</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Casos normales:</span>
              <strong>18</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div
      style={{
        width: '700px',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <h3>Ejemplos de Uso del Componente Urgente</h3>

      <div style={{ display: 'grid', gap: '2rem', marginTop: '1.5rem' }}>
        <div>
          <h4>1. En Tablas de Pacientes</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto auto',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '4px',
              alignItems: 'center',
            }}
          >
            <div style={{ fontWeight: 'bold' }}>09:30</div>
            <div>Rodríguez, María - Dolor de pecho</div>
            <UrgentLabelComponent urgente={true} />
            <div
              style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: '#e3f2fd',
                borderRadius: '3px',
                fontSize: '12px',
              }}
            >
              Cardiología
            </div>
          </div>
        </div>

        <div>
          <h4>2. En Cards de Información</h4>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <h5 style={{ margin: 0 }}>Paciente: López, Ana</h5>
              <UrgentLabelComponent urgente={true} />
            </div>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              Consulta de emergencia - Requiere atención inmediata
            </p>
          </div>
        </div>

        <div>
          <h4>3. En Listas de Notificaciones</h4>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
              <UrgentLabelComponent urgente={true} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Nuevo turno urgente asignado</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '0.25rem' }}>
                  García, Pedro - 14:30 - Traumatología
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ForTesting: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div>
        <span>Normal: </span>
        <UrgentLabelComponent urgente={false} />
      </div>
      <div>
        <span>Urgente: </span>
        <UrgentLabelComponent urgente={true} />
      </div>
    </div>
  ),
};
