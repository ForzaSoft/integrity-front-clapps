import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Table from '@/components/Table';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  fechaRegistro: string;
}

const usuariosEjemplo: Usuario[] = [
  {
    id: 1,
    nombre: 'John Smith',
    email: 'john.smith@example.com',
    rol: 'Administrator',
    activo: true,
    fechaRegistro: '2024-01-15',
  },
  {
    id: 2,
    nombre: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    rol: 'Doctor',
    activo: true,
    fechaRegistro: '2024-02-20',
  },
  {
    id: 3,
    nombre: 'Carlos Lopez',
    email: 'carlos.lopez@example.com',
    rol: 'Receptionist',
    activo: false,
    fechaRegistro: '2024-01-08',
  },
  {
    id: 4,
    nombre: 'Ana Martinez',
    email: 'ana.martinez@example.com',
    rol: 'Doctor',
    activo: true,
    fechaRegistro: '2024-03-10',
  },
  {
    id: 5,
    nombre: 'Roberto Silva',
    email: 'roberto.silva@example.com',
    rol: 'Administrator',
    activo: false,
    fechaRegistro: '2024-02-05',
  },
];

const meta = {
  title: 'Components/Table',
  component: Table<Usuario>,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Table component built with TanStack Table.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onRowClick: fn(),
  },
} satisfies Meta<typeof Table<Usuario>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    headers: [
      { title: 'ID', value: 'id' },
      { title: 'Name', value: 'nombre' },
      { title: 'Email', value: 'email' },
      { title: 'Role', value: 'rol' },
    ],
    items: usuariosEjemplo.slice(0, 3),
  },
};

export const WithGlobalFilter: Story = {
  name: 'With Global Filter',
  args: {
    headers: [
      { title: 'ID', value: 'id' },
      { title: 'Name', value: 'nombre' },
      { title: 'Email', value: 'email' },
      { title: 'Role', value: 'rol' },
      {
        title: 'Status',
        renderer: (usuario: Usuario) => (
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: usuario.activo ? '#62b72d' : '#e10000',
              backgroundColor: usuario.activo ? '#f0f9ff' : '#fef2f2',
            }}
          >
            {usuario.activo ? 'Active' : 'Inactive'}
          </span>
        ),
        align: 'center',
      },
    ],
    items: usuariosEjemplo,
    enableGlobalFilter: true,
    onGlobalFilterChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table with global filter in the header (right column). The filter searches across all searchable columns. Try typing "Maria", "Doctor" or "gmail".',
      },
    },
  },
};
