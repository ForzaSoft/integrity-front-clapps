import TableFilterInput from '@/components/TableFilterInput';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta: Meta<typeof TableFilterInput> = {
  title: 'Components/TableFilterInput',
  component: TableFilterInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input de filtro especializado para tablas con iconos de búsqueda y configuración. Incluye estilos específicos para filtrado de datos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Valor actual del filtro',
    },
    onChange: {
      action: 'changed',
      description: 'Función que se ejecuta al cambiar el valor',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: '',
    onChange: (value: string) => console.log('Filter changed:', value),
  },
};

export const WithValue: Story = {
  args: {
    value: 'García',
    onChange: (value: string) => console.log('Filter changed:', value),
  },
};

export const Interactive: Story = {
  render: () => {
    const [filterValue, setFilterValue] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <h4>Filtro Interactivo</h4>
        <TableFilterInput value={filterValue} onChange={setFilterValue} />
        <p style={{ fontSize: '14px', color: '#666' }}>Valor actual: &quot;{filterValue}&quot;</p>
      </div>
    );
  },
};

export const InPatientTable: Story = {
  render: () => {
    const [filter, setFilter] = useState('');

    const patients = [
      { id: 1, nombre: 'García, Juan', dni: '12345678', obraSocial: 'OSDE' },
      { id: 2, nombre: 'Rodríguez, María', dni: '23456789', obraSocial: 'Swiss Medical' },
      { id: 3, nombre: 'Martínez, Carlos', dni: '34567890', obraSocial: 'Galeno' },
      { id: 4, nombre: 'López, Ana', dni: '45678901', obraSocial: 'OSDE' },
      { id: 5, nombre: 'Pérez, Luis', dni: '56789012', obraSocial: 'Medicus' },
    ];

    const filteredPatients = patients.filter(
      (patient) =>
        patient.nombre.toLowerCase().includes(filter.toLowerCase()) ||
        patient.dni.includes(filter) ||
        patient.obraSocial.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
      <div
        style={{
          width: '600px',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
        }}
      >
        <h3 style={{ margin: '0 0 1.5rem 0' }}>Lista de Pacientes</h3>

        <div style={{ marginBottom: '1rem' }}>
          <TableFilterInput value={filter} onChange={setFilter} />
        </div>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              fontWeight: 'bold',
              borderBottom: '1px solid #e9ecef',
            }}
          >
            <div>Nombre</div>
            <div>DNI</div>
            <div>Obra Social</div>
          </div>

          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto',
                  gap: '1rem',
                  padding: '1rem',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <div>{patient.nombre}</div>
                <div style={{ fontFamily: 'monospace' }}>{patient.dni}</div>
                <div>{patient.obraSocial}</div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                color: '#666',
              }}
            >
              No se encontraron pacientes que coincidan con &quot;{filter}&quot;
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '1rem',
            fontSize: '14px',
            color: '#666',
          }}
        >
          Mostrando {filteredPatients.length} de {patients.length} pacientes
        </div>
      </div>
    );
  },
};

export const InMedicalDashboard: Story = {
  render: () => {
    const [appointmentFilter, setAppointmentFilter] = useState('');
    const [doctorFilter, setDoctorFilter] = useState('');

    return (
      <div
        style={{
          width: '800px',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h3 style={{ margin: '0 0 2rem 0' }}>Dashboard Médico - Filtros</h3>

        <div
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: '1fr 1fr',
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
            <h4 style={{ margin: '0 0 1rem 0' }}>Filtrar Turnos</h4>
            <TableFilterInput value={appointmentFilter} onChange={setAppointmentFilter} />
            <div style={{ marginTop: '1rem', fontSize: '14px', color: '#666' }}>
              Buscar por paciente, especialidad o horario
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
            <h4 style={{ margin: '0 0 1rem 0' }}>Filtrar Médicos</h4>
            <TableFilterInput value={doctorFilter} onChange={setDoctorFilter} />
            <div style={{ marginTop: '1rem', fontSize: '14px', color: '#666' }}>Buscar por nombre o especialidad</div>
          </div>
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
          <strong>Filtros activos:</strong>
          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
            <li>Turnos: {appointmentFilter || 'Sin filtro'}</li>
            <li>Médicos: {doctorFilter || 'Sin filtro'}</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const MultipleFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      name: '',
      specialty: '',
      date: '',
      status: '',
    });

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    return (
      <div
        style={{
          width: '700px',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ margin: '0 0 1.5rem 0' }}>Filtros Múltiples</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Filtrar por Nombre
            </label>
            <TableFilterInput value={filters.name} onChange={(value) => handleFilterChange('name', value)} />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Filtrar por Especialidad
            </label>
            <TableFilterInput value={filters.specialty} onChange={(value) => handleFilterChange('specialty', value)} />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Filtrar por Fecha
            </label>
            <TableFilterInput value={filters.date} onChange={(value) => handleFilterChange('date', value)} />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Filtrar por Estado
            </label>
            <TableFilterInput value={filters.status} onChange={(value) => handleFilterChange('status', value)} />
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Filtros Aplicados:</h4>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {Object.entries(filters).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '0.25rem' }}>
                <strong>{key}:</strong> {value || 'Sin filtro'}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const ForTesting: Story = {
  render: () => {
    const [value, setValue] = useState('test');

    return <TableFilterInput value={value} onChange={setValue} />;
  },
};
