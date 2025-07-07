import Table from '@/components/Table';
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
          'Input de filtro especializado para tablas con iconos de búsqueda y configuración. Se utiliza principalmente en los headers de las tablas para filtrar datos.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

type DataItem = {
  id: number;
  paciente: string;
  dni: string;
  obraSocial: string;
  estado: string;
};

const mockData: DataItem[] = [
  { id: 1, paciente: 'García, Juan', dni: '12345678', obraSocial: 'OSDE', estado: 'Pendiente' },
  { id: 2, paciente: 'Rodríguez, María', dni: '23456789', obraSocial: 'Swiss Medical', estado: 'Atendido' },
  { id: 3, paciente: 'Martínez, Carlos', dni: '34567890', obraSocial: 'Galeno', estado: 'Cancelado' },
  { id: 4, paciente: 'López, Ana', dni: '45678901', obraSocial: 'OSDE', estado: 'Pendiente' },
  { id: 5, paciente: 'Pérez, Luis', dni: '56789012', obraSocial: 'Medicus', estado: 'Atendido' },
];

export const TableHeaderFilter: Story = {
  render: () => {
    const [filter, setFilter] = useState('');

    const filteredData = mockData.filter(
      (item) =>
        item.paciente.toLowerCase().includes(filter.toLowerCase()) ||
        item.dni.includes(filter) ||
        item.obraSocial.toLowerCase().includes(filter.toLowerCase()) ||
        item.estado.toLowerCase().includes(filter.toLowerCase()),
    );

    const headers = [
      {
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '200px' }}>
            <span>Pacientes</span>
            <TableFilterInput value={filter} onChange={setFilter} />
          </div>
        ),
        renderer: (item: DataItem) => <span>{item.paciente}</span>,
      },
      { title: 'DNI', renderer: (item: DataItem) => <span>{item.dni}</span>, align: 'center' as const },
      { title: 'Obra Social', renderer: (item: DataItem) => <span>{item.obraSocial}</span> },
      { title: 'Estado', renderer: (item: DataItem) => <span>{item.estado}</span>, align: 'center' as const },
    ];

    return (
      <div style={{ minWidth: '800px' }}>
        <Table headers={headers} items={filteredData} />
      </div>
    );
  },
};

export const MultiColumnFilter: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      paciente: '',
      obraSocial: '',
    });

    const filteredData = mockData.filter(
      (item) =>
        item.paciente.toLowerCase().includes(filters.paciente.toLowerCase()) &&
        item.obraSocial.toLowerCase().includes(filters.obraSocial.toLowerCase()),
    );

    const headers = [
      {
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '200px' }}>
            <span>Pacientes</span>
            <TableFilterInput
              value={filters.paciente}
              onChange={(value) => setFilters((prev) => ({ ...prev, paciente: value }))}
            />
          </div>
        ),
        renderer: (item: DataItem) => <span>{item.paciente}</span>,
      },
      { title: 'DNI', renderer: (item: DataItem) => <span>{item.dni}</span>, align: 'center' as const },
      {
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '200px' }}>
            <span>Obra Social</span>
            <TableFilterInput
              value={filters.obraSocial}
              onChange={(value) => setFilters((prev) => ({ ...prev, obraSocial: value }))}
            />
          </div>
        ),
        renderer: (item: DataItem) => <span>{item.obraSocial}</span>,
      },
      { title: 'Estado', renderer: (item: DataItem) => <span>{item.estado}</span>, align: 'center' as const },
    ];

    return (
      <div style={{ minWidth: '800px' }}>
        <Table headers={headers} items={filteredData} />
      </div>
    );
  },
};
