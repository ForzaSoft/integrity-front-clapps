import TextGroup from '@/components/TextGroup';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TextGroup> = {
  title: 'Components/TextGroup',
  component: TextGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente para mostrar grupos de información clave-valor con estado de carga. Incluye animación skeleton cuando los datos están vacíos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    list: {
      control: { type: 'object' },
      description: 'Array de objetos con key, value y color opcional',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    list: [
      { key: 'Nombre', value: 'García, Juan Carlos' },
      { key: 'DNI', value: '12.345.678' },
      { key: 'Edad', value: '45 años' },
      { key: 'Teléfono', value: '+54 11 1234-5678' },
    ],
  },
};

export const WithColors: Story = {
  args: {
    list: [
      { key: 'Estado', value: 'Activo', color: '#28a745' },
      { key: 'Prioridad', value: 'Alta', color: '#dc3545' },
      { key: 'Especialidad', value: 'Cardiología', color: '#0066cc' },
      { key: 'Próxima Cita', value: '15/12/2024', color: '#ffc107' },
    ],
  },
};

export const Loading: Story = {
  args: {
    list: [
      { key: 'Nombre', value: '' },
      { key: 'DNI', value: '' },
      { key: 'Edad', value: '' },
      { key: 'Teléfono', value: '' },
    ],
  },
};

export const PatientInformation: Story = {
  args: {
    list: [
      { key: 'Paciente', value: 'Rodríguez, María Elena' },
      { key: 'DNI', value: '23.456.789' },
      { key: 'Fecha de Nacimiento', value: '15/03/1978' },
      { key: 'Obra Social', value: 'OSDE 210' },
      { key: 'Número de Afiliado', value: '1234567890123' },
      { key: 'Teléfono', value: '+54 11 2345-6789' },
      { key: 'Email', value: 'maria.rodriguez@email.com' },
      { key: 'Dirección', value: 'Av. Corrientes 1234, CABA' },
    ],
  },
};

export const MedicalStatus: Story = {
  args: {
    list: [
      { key: 'Estado del Turno', value: 'Confirmado', color: '#28a745' },
      { key: 'Urgencia', value: 'Normal', color: '#6c757d' },
      { key: 'Especialidad', value: 'Cardiología', color: '#0066cc' },
      { key: 'Médico', value: 'Dr. Pérez, Carlos' },
      { key: 'Consultorio', value: 'Consultorio 3' },
      { key: 'Duración', value: '30 minutos' },
      { key: 'Motivo', value: 'Control de rutina' },
    ],
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        padding: '2rem',
        maxWidth: '800px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Datos Cargados</h4>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <TextGroup
            list={[
              { key: 'Nombre', value: 'García, Juan' },
              { key: 'DNI', value: '12.345.678' },
              { key: 'Estado', value: 'Activo', color: '#28a745' },
              { key: 'Teléfono', value: '+54 11 1234-5678' },
            ]}
          />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Estado de Carga</h4>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <TextGroup
            list={[
              { key: 'Nombre', value: '' },
              { key: 'DNI', value: '' },
              { key: 'Estado', value: '' },
              { key: 'Teléfono', value: '' },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

export const InPatientCard: Story = {
  render: () => (
    <div
      style={{
        width: '450px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e9ecef',
      }}
    >
      <h3
        style={{
          margin: '0 0 1.5rem 0',
          paddingBottom: '0.5rem',
          borderBottom: '2px solid #0066cc',
        }}
      >
        Información del Paciente
      </h3>

      <TextGroup
        list={[
          { key: 'Nombre Completo', value: 'López, Ana María' },
          { key: 'DNI', value: '34.567.890' },
          { key: 'Fecha de Nacimiento', value: '22/08/1985' },
          { key: 'Edad', value: '38 años' },
          { key: 'Obra Social', value: 'Swiss Medical' },
          { key: 'Plan', value: 'SMG 250' },
          { key: 'Estado', value: 'Activo', color: '#28a745' },
          { key: 'Teléfono', value: '+54 11 3456-7890' },
          { key: 'Email', value: 'ana.lopez@email.com' },
        ]}
      />
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
      }}
    >
      <h3 style={{ margin: '0 0 2rem 0' }}>Dashboard Médico - Información de Turnos</h3>

      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0', color: '#0066cc' }}>Próximo Turno</h4>
          <TextGroup
            list={[
              { key: 'Paciente', value: 'Martínez, Carlos' },
              { key: 'Horario', value: '14:30 hs' },
              { key: 'Estado', value: 'Confirmado', color: '#28a745' },
              { key: 'Especialidad', value: 'Traumatología' },
              { key: 'Consultorio', value: 'Consultorio 2' },
              { key: 'Duración', value: '45 minutos' },
            ]}
          />
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0', color: '#dc3545' }}>Turno Urgente</h4>
          <TextGroup
            list={[
              { key: 'Paciente', value: 'González, Elena' },
              { key: 'Horario', value: '15:00 hs' },
              { key: 'Estado', value: 'Urgente', color: '#dc3545' },
              { key: 'Especialidad', value: 'Emergencias' },
              { key: 'Motivo', value: 'Dolor de pecho' },
              { key: 'Prioridad', value: 'Alta', color: '#dc3545' },
            ]}
          />
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0', color: '#ffc107' }}>En Espera</h4>
          <TextGroup
            list={[
              { key: 'Paciente', value: 'Fernández, Pablo' },
              { key: 'Horario', value: '15:30 hs' },
              { key: 'Estado', value: 'En Espera', color: '#ffc107' },
              { key: 'Especialidad', value: 'Oftalmología' },
              { key: 'Tiempo Espera', value: '15 minutos' },
              { key: 'Consultorio', value: 'Sala de Espera' },
            ]}
          />
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0', color: '#6c757d' }}>Cargando...</h4>
          <TextGroup
            list={[
              { key: 'Paciente', value: '' },
              { key: 'Horario', value: '' },
              { key: 'Estado', value: '' },
              { key: 'Especialidad', value: '' },
              { key: 'Consultorio', value: '' },
              { key: 'Duración', value: '' },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

export const DifferentDataTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        padding: '2rem',
        maxWidth: '900px',
      }}
    >
      <div>
        <h4>Información Personal</h4>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
          }}
        >
          <TextGroup
            list={[
              { key: 'Nombre', value: 'Pérez, Luis' },
              { key: 'Edad', value: '52 años' },
              { key: 'Género', value: 'Masculino' },
              { key: 'Estado Civil', value: 'Casado' },
            ]}
          />
        </div>
      </div>

      <div>
        <h4>Información Médica</h4>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
          }}
        >
          <TextGroup
            list={[
              { key: 'Grupo Sanguíneo', value: 'O+' },
              { key: 'Alergias', value: 'Penicilina', color: '#dc3545' },
              { key: 'Medicación', value: 'Enalapril 10mg' },
              { key: 'Última Consulta', value: '01/12/2024' },
            ]}
          />
        </div>
      </div>

      <div>
        <h4>Información de Contacto</h4>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
          }}
        >
          <TextGroup
            list={[
              { key: 'Teléfono', value: '+54 11 4567-8901' },
              { key: 'Celular', value: '+54 9 11 2345-6789' },
              { key: 'Email', value: 'luis.perez@email.com' },
              { key: 'Dirección', value: 'San Martín 567, CABA' },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

export const ForTesting: Story = {
  args: {
    list: [
      { key: 'Test Key', value: 'Test Value' },
      { key: 'Color Test', value: 'Red Text', color: '#dc3545' },
    ],
  },
};
