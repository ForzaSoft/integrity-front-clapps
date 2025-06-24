import TimeLabel from '@/components/TimeLabel';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TimeLabel> = {
  title: 'Components/TimeLabel',
  component: TimeLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente que formatea y muestra horarios en formato 24 horas.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    time: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Morning: Story = {
  args: {
    time: '09:30',
  },
};

export const Afternoon: Story = {
  args: {
    time: '14:45',
  },
};

export const Evening: Story = {
  args: {
    time: '18:00',
  },
};

export const TimeExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '2rem',
        maxWidth: '600px',
      }}
    >
      {['08:00', '09:15', '10:30', '11:45', '12:00', '13:15', '14:30', '15:45', '16:00', '17:15', '18:30', '19:45'].map(
        (time) => (
          <div
            key={time}
            style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.5rem' }}>{time}</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              <TimeLabel time={time} />
            </div>
          </div>
        ),
      )}
    </div>
  ),
};

export const InMedicalSchedule: Story = {
  render: () => (
    <div
      style={{
        width: '500px',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <h3>Agenda Médica del Día</h3>

      <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
        {[
          { time: '08:00', paciente: 'García, Juan', especialidad: 'Cardiología' },
          { time: '08:30', paciente: 'Rodríguez, María', especialidad: 'Dermatología' },
          { time: '09:00', paciente: 'Martínez, Carlos', especialidad: 'Clínica Médica' },
          { time: '09:30', paciente: 'López, Ana', especialidad: 'Pediatría' },
          { time: '10:00', paciente: 'Pérez, Luis', especialidad: 'Traumatología' },
        ].map((cita, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '1rem',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              backgroundColor: 'white',
              borderRadius: '4px',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#0066cc',
                minWidth: '60px',
              }}
            >
              <TimeLabel time={cita.time} />
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{cita.paciente}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{cita.especialidad}</div>
            </div>
            <div
              style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: '#e3f2fd',
                borderRadius: '3px',
                fontSize: '12px',
              }}
            >
              30 min
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const InTimeSlots: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h3>Horarios Disponibles</h3>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Mañana</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30'].map((time) => (
              <button
                key={time}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#e3f2fd',
                  border: '1px solid #90caf9',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                <TimeLabel time={time} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Tarde</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'].map((time) => (
              <button
                key={time}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#fff3e0',
                  border: '1px solid #ffcc02',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                <TimeLabel time={time} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ForTesting: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <TimeLabel time="09:30" />
      <TimeLabel time="14:45" />
      <TimeLabel time="18:00" />
    </div>
  ),
};
