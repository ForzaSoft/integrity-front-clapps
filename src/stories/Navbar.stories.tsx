import Navbar from '@/components/Navbar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Barra de navegación lateral con iconos de funciones principales del sistema médico. Incluye botones para nuevo turno, dashboard, agendas, pacientes, parametrización y perfil de usuario.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '80px' }}>
      <Navbar />
    </div>
  ),
};

export const InMedicalApp: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ width: '80px' }}>
        <Navbar />
      </div>
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h1>Sistema Médico INTEGRITY</h1>
        <p>Esta es la barra de navegación lateral del sistema médico.</p>
        <div style={{ marginTop: '2rem' }}>
          <h3>Funciones disponibles:</h3>
          <ul>
            <li>Nuevo Turno - Crear nuevas citas médicas</li>
            <li>Dashboard - Vista general del sistema</li>
            <li>Agendas - Gestión de agendas médicas</li>
            <li>Pacientes - Administración de pacientes</li>
            <li>Parametrización - Configuración del sistema</li>
            <li>Perfil de Usuario - Configuración personal</li>
            <li>Log out - Cerrar sesión</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const DifferentHeights: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
      <div style={{ height: '500px', width: '80px' }}>
        <Navbar />
      </div>
      <div style={{ height: '100vh', width: '80px' }}>
        <Navbar />
      </div>
    </div>
  ),
};

export const WithActiveStates: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '80px' }}>
      <Navbar />
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '100px',
          padding: '1rem',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h4>Navegación del Sistema Médico</h4>
        <p>Los botones permiten navegar entre:</p>
        <ul style={{ fontSize: '14px', lineHeight: '1.4' }}>
          <li>Gestión de turnos y citas</li>
          <li>Dashboard principal</li>
          <li>Agendas activas</li>
          <li>Base de datos de pacientes</li>
          <li>Configuración del sistema</li>
          <li>Perfil y configuración personal</li>
        </ul>
      </div>
    </div>
  ),
};

export const InFullLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* Navbar */}
      <div style={{ width: '80px' }}>
        <Navbar />
      </div>

      {/* Header */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: '60px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          Sistema INTEGRITY - Gestión Médica
        </header>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: '2rem',
            backgroundColor: '#f8f9fa',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              height: '100%',
            }}
          >
            <h2>Dashboard Principal</h2>
            <p>Contenido principal de la aplicación médica.</p>
            <div style={{ marginTop: '2rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <h3>Turnos del Día</h3>
                  <p style={{ fontSize: '24px', margin: '0.5rem 0' }}>24</p>
                </div>
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#e8f5e8',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <h3>Pacientes Atendidos</h3>
                  <p style={{ fontSize: '24px', margin: '0.5rem 0' }}>18</p>
                </div>
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#fff3e0',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <h3>En Espera</h3>
                  <p style={{ fontSize: '24px', margin: '0.5rem 0' }}>6</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
};
