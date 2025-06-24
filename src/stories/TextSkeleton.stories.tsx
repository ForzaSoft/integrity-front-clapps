import TextSkeleton from '@/components/TextSkeleton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TextSkeleton> = {
  title: 'Components/TextSkeleton',
  component: TextSkeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente skeleton para mostrar placeholders animados mientras se cargan los datos. Utiliza styled-components con animación shimmer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number' },
      description: 'Ancho del skeleton en píxeles',
    },
    height: {
      control: { type: 'number' },
      description: 'Alto del skeleton en píxeles',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    width: 100,
    height: 16,
  },
};

export const Medium: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Large: Story = {
  args: {
    width: 300,
    height: 24,
  },
};

export const Title: Story = {
  args: {
    width: 250,
    height: 32,
  },
};

export const Paragraph: Story = {
  args: {
    width: 400,
    height: 16,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        alignItems: 'start',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Título Principal</h4>
        <TextSkeleton width={300} height={32} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Subtítulo</h4>
        <TextSkeleton width={200} height={24} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Párrafos</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <TextSkeleton width={400} height={16} />
          <TextSkeleton width={380} height={16} />
          <TextSkeleton width={350} height={16} />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Etiquetas</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <TextSkeleton width={80} height={14} />
          <TextSkeleton width={60} height={14} />
          <TextSkeleton width={90} height={14} />
        </div>
      </div>
    </div>
  ),
};

export const InPatientCard: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
      }}
    >
      <h3 style={{ margin: '0 0 1.5rem 0' }}>Cargando Información del Paciente</h3>

      <div
        style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '4px',
          border: '1px solid #e9ecef',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.5rem' }}>Nombre:</div>
            <TextSkeleton width={200} height={20} />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.5rem' }}>DNI:</div>
            <TextSkeleton width={120} height={18} />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.5rem' }}>Obra Social:</div>
            <TextSkeleton width={180} height={18} />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.5rem' }}>Próxima Cita:</div>
            <TextSkeleton width={150} height={18} />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.5rem' }}>Observaciones:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <TextSkeleton width={350} height={16} />
              <TextSkeleton width={320} height={16} />
              <TextSkeleton width={280} height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InMedicalList: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: '0 0 1.5rem 0' }}>Cargando Lista de Turnos</h3>

      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto auto',
              gap: '1rem',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <TextSkeleton width={60} height={18} />
            <TextSkeleton width={180} height={16} />
            <TextSkeleton width={100} height={14} />
            <TextSkeleton width={80} height={20} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const InDashboard: Story = {
  render: () => (
    <div
      style={{
        width: '700px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ margin: '0 0 2rem 0' }}>Dashboard Médico - Cargando</h3>

      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <TextSkeleton width={150} height={24} />
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextSkeleton width={120} height={16} />
                <TextSkeleton width={40} height={20} />
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <TextSkeleton width={180} height={24} />
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  backgroundColor: 'white',
                  borderRadius: '3px',
                }}
              >
                <TextSkeleton width={20} height={20} />
                <div style={{ flex: 1 }}>
                  <TextSkeleton width={140} height={16} />
                  <div style={{ marginTop: '0.25rem' }}>
                    <TextSkeleton width={100} height={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <TextSkeleton width={200} height={24} />
        <div
          style={{
            marginTop: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
          }}
        >
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <TextSkeleton width={60} height={32} />
              <div style={{ marginTop: '0.5rem' }}>
                <TextSkeleton width={80} height={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AnimationDemo: Story = {
  render: () => (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        maxWidth: '500px',
      }}
    >
      <h3>Demostración de Animación Shimmer</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '2rem' }}>
        Los skeletons incluyen una animación shimmer que simula el efecto de carga.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextSkeleton width={300} height={20} />
        <TextSkeleton width={250} height={18} />
        <TextSkeleton width={200} height={16} />
        <TextSkeleton width={150} height={14} />
        <TextSkeleton width={100} height={12} />
      </div>
    </div>
  ),
};

export const ForTesting: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <TextSkeleton width={100} height={16} />
      <TextSkeleton width={200} height={20} />
      <TextSkeleton width={150} height={18} />
    </div>
  ),
};
