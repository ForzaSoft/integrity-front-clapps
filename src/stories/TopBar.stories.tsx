import TopBar from '@/components/TopBar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Barra superior del sistema médico INTEGRITY. Incluye título, fecha actual, notificaciones, búsqueda y acciones principales.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título que se muestra en la barra superior',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Dashboard Médico',
  },
};

export const WithDashboardTitle: Story = {
  args: {
    title: 'Dashboard Principal',
  },
};

export const WithPatientsTitle: Story = {
  args: {
    title: 'Gestión de Pacientes',
  },
};

export const WithAppointmentsTitle: Story = {
  args: {
    title: 'Agenda de Turnos',
  },
};

export const WithConfigurationTitle: Story = {
  args: {
    title: 'Configuraciones del Sistema',
  },
};

export const WithLongTitle: Story = {
  args: {
    title: 'Sistema de Gestión Integral de Consultorios Médicos - INTEGRITY',
  },
};

export const WithReactElement: Story = {
  args: {
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: '#e3f2fd',
            borderRadius: '3px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          NUEVO
        </span>
        Dashboard Médico Avanzado
      </div>
    ),
  },
};

export const InMedicalLayout: Story = {
  render: (args) => (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopBar {...args} />
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: 'white',
          margin: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2>Contenido Principal</h2>
        <p>Esta es una demostración de cómo se ve el TopBar en el contexto completo de la aplicación médica.</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
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
            <h3>Turnos de Hoy</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0066cc' }}>24</p>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <h3>Pacientes Atendidos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>18</p>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <h3>En Espera</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>6</p>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <h3>Urgentes</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>2</p>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    title: 'Dashboard Médico INTEGRITY',
  },
};

export const DifferentSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Dashboard Principal</h4>
        <TopBar title="Dashboard Médico" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Gestión de Pacientes</h4>
        <TopBar title="Pacientes" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Agenda de Turnos</h4>
        <TopBar title="Agenda del Día" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Configuraciones</h4>
        <TopBar title="Configuraciones del Sistema" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Reportes</h4>
        <TopBar title="Reportes y Estadísticas" />
      </div>
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopBar
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#0066cc',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              I
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>INTEGRITY Medical System</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Sistema de Gestión Médica Integral</div>
            </div>
          </div>
        }
      />

      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: 'white',
          margin: '1rem',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { title: 'Nuevo Turno', desc: 'Agendar nueva cita', color: '#28a745' },
            { title: 'Buscar Paciente', desc: 'Encontrar información', color: '#17a2b8' },
            { title: 'Ver Agenda', desc: 'Consultar horarios', color: '#ffc107' },
            { title: 'Notificaciones', desc: '3 nuevas alertas', color: '#dc3545' },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: item.color,
                  borderRadius: '50%',
                  margin: '0 auto 1rem auto',
                }}
              />
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h4>
              <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Pantalla Completa (Desktop)</h4>
        <div style={{ width: '100%', border: '1px solid #ccc' }}>
          <TopBar title="Dashboard Médico - Vista Desktop" />
        </div>
      </div>

      <div>
        <h4>Tablet (768px)</h4>
        <div style={{ width: '768px', border: '1px solid #ccc' }}>
          <TopBar title="Dashboard - Tablet" />
        </div>
      </div>

      <div>
        <h4>Mobile (375px)</h4>
        <div style={{ width: '375px', border: '1px solid #ccc' }}>
          <TopBar title="Dashboard" />
        </div>
      </div>
    </div>
  ),
};

export const ForTesting: Story = {
  args: {
    title: 'Test TopBar',
  },
};
