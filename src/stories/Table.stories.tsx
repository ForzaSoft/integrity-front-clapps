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
    nombre: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    rol: 'Administrador',
    activo: true,
    fechaRegistro: '2024-01-15',
  },
  {
    id: 2,
    nombre: 'María García',
    email: 'maria.garcia@ejemplo.com',
    rol: 'Médico',
    activo: true,
    fechaRegistro: '2024-02-20',
  },
  {
    id: 3,
    nombre: 'Carlos López',
    email: 'carlos.lopez@ejemplo.com',
    rol: 'Recepcionista',
    activo: false,
    fechaRegistro: '2024-01-08',
  },
  {
    id: 4,
    nombre: 'Ana Martínez',
    email: 'ana.martinez@ejemplo.com',
    rol: 'Médico',
    activo: true,
    fechaRegistro: '2024-03-10',
  },
  {
    id: 5,
    nombre: 'Roberto Silva',
    email: 'roberto.silva@ejemplo.com',
    rol: 'Administrador',
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
        component: 'Componente de tabla construido con TanStack Table.',
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
  name: 'Básico',
  args: {
    headers: [
      { title: 'ID', value: 'id' },
      { title: 'Nombre', value: 'nombre' },
      { title: 'Email', value: 'email' },
      { title: 'Rol', value: 'rol' },
    ],
    items: usuariosEjemplo.slice(0, 3),
  },
};

export const WithGlobalFilter: Story = {
  name: 'Con filtro global',
  args: {
    headers: [
      { title: 'ID', value: 'id' },
      { title: 'Nombre', value: 'nombre' },
      { title: 'Email', value: 'email' },
      { title: 'Rol', value: 'rol' },
      {
        title: 'Estado',
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
            {usuario.activo ? 'Activo' : 'Inactivo'}
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
          'Tabla con filtro global en el header (columna derecha). El filtro busca en todas las columnas searchables. Prueba escribir "María", "Médico" o "gmail".',
      },
    },
  },
};
