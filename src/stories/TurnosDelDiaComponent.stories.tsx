import TurnosDelDiaComponent, { TurnosTotalizados } from '@/components/TurnosDelDiaComponent';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TurnosDelDiaComponent> = {
  title: 'Components/TurnosDelDiaComponent',
  component: TurnosDelDiaComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente que muestra estadísticas de turnos del día con indicadores visuales.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    values: {
      control: { type: 'object' },
      description: 'Objeto con estadísticas de turnos',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    values: {
      total: 24,
      sinLlegar: 6,
      presentes: 4,
      atendidos: 14,
    },
  },
};

export const Loading: Story = {
  args: {
    values: undefined,
  },
};

export const HighVolume: Story = {
  args: {
    values: {
      total: 45,
      sinLlegar: 12,
      presentes: 8,
      atendidos: 25,
    },
  },
};

export const LowVolume: Story = {
  args: {
    values: {
      total: 8,
      sinLlegar: 2,
      presentes: 1,
      atendidos: 5,
    },
  },
};

export const DifferentScenarios: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        padding: '2rem',
        maxWidth: '1200px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Día Normal</h4>
        <TurnosDelDiaComponent
          values={{
            total: 20,
            sinLlegar: 5,
            presentes: 3,
            atendidos: 12,
          }}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Día Ocupado</h4>
        <TurnosDelDiaComponent
          values={{
            total: 40,
            sinLlegar: 10,
            presentes: 8,
            atendidos: 22,
          }}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Día Tranquilo</h4>
        <TurnosDelDiaComponent
          values={{
            total: 12,
            sinLlegar: 2,
            presentes: 1,
            atendidos: 9,
          }}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Cargando</h4>
        <TurnosDelDiaComponent values={undefined} />
      </div>
    </div>
  ),
};

export const InMedicalDashboard: Story = {
  render: () => (
    <div
      style={{
        width: '800px',
        padding: '2rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        minHeight: '600px',
      }}
    >
      <h2
        style={{
          margin: '0 0 2rem 0',
          textAlign: 'center',
          color: '#333',
        }}
      >
        Dashboard Médico - INTEGRITY
      </h2>

      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <div>
          <TurnosDelDiaComponent
            values={{
              total: 28,
              sinLlegar: 7,
              presentes: 5,
              atendidos: 16,
            }}
          />
        </div>

        <div
          style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 1.5rem 0' }}>Resumen del Día</h3>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <span>Eficiencia:</span>
              <strong style={{ color: '#28a745' }}>57%</strong>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <span>Tiempo Promedio:</span>
              <strong>35 min</strong>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <span>Próximo Turno:</span>
              <strong style={{ color: '#0066cc' }}>14:30</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const RealTimeDemo: Story = {
  render: () => {
    const scenarios: TurnosTotalizados[] = [
      { total: 20, sinLlegar: 8, presentes: 2, atendidos: 10 },
      { total: 20, sinLlegar: 6, presentes: 4, atendidos: 10 },
      { total: 20, sinLlegar: 4, presentes: 6, atendidos: 10 },
      { total: 20, sinLlegar: 2, presentes: 3, atendidos: 15 },
      { total: 20, sinLlegar: 0, presentes: 2, atendidos: 18 },
    ];

    return (
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          maxWidth: '600px',
        }}
      >
        <h3 style={{ margin: '0 0 2rem 0', textAlign: 'center' }}>Simulación de Progreso del Día</h3>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {scenarios.map((scenario, index) => (
            <div key={index}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px', color: '#666' }}>
                {index === 0 && 'Inicio del día (8:00 AM)'}
                {index === 1 && 'Media mañana (10:00 AM)'}
                {index === 2 && 'Mediodía (12:00 PM)'}
                {index === 3 && 'Tarde (3:00 PM)'}
                {index === 4 && 'Final del día (6:00 PM)'}
              </h4>
              <TurnosDelDiaComponent values={scenario} />
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          <strong>Interpretación de colores:</strong>
          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
            <li>
              <strong style={{ color: '#B8B8B8' }}>Gris:</strong> Sin llegar
            </li>
            <li>
              <strong style={{ color: '#0029FF' }}>Azul:</strong> Presentes
            </li>
            <li>
              <strong style={{ color: '#62B72D' }}>Verde:</strong> Atendidos
            </li>
          </ul>
        </div>
      </div>
    );
  },
};

export const ForTesting: Story = {
  args: {
    values: {
      total: 10,
      sinLlegar: 3,
      presentes: 2,
      atendidos: 5,
    },
  },
};
