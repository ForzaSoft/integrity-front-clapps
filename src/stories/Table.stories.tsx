import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Button from '@/components/Button';
import Table from '@/components/Table';
import EditarIcon from '@/icons/EditarIcon';
import EliminarIcon from '@/icons/EliminarIcon';
import VisualizarIcon from '@/icons/VisualizarIcon';

// Datos de ejemplo
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
  },
  tags: ['autodocs'],
  args: {
    onRowClick: fn(),
  },
} satisfies Meta<typeof Table<Usuario>>;

export default meta;
type Story = StoryObj<typeof meta>;

// Tabla básica con datos simples
export const Basic: Story = {
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

// Tabla con diferentes alineaciones
export const WithAlignment: Story = {
  args: {
    headers: [
      { title: 'ID', value: 'id', align: 'center' },
      { title: 'Nombre', value: 'nombre', align: 'left' },
      { title: 'Email', value: 'email', align: 'left' },
      { title: 'Rol', value: 'rol', align: 'center' },
      { title: 'Fecha Registro', value: 'fechaRegistro', align: 'right' },
    ],
    items: usuariosEjemplo,
  },
};

// Tabla con renderers personalizados
export const WithCustomRenderers: Story = {
  args: {
    headers: [
      { title: 'ID', value: 'id', align: 'center' },
      { title: 'Nombre', value: 'nombre' },
      { title: 'Email', value: 'email' },
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
      {
        title: 'Acciones',
        renderer: () => (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <Button size="sm" variant="flat" icon={VisualizarIcon} />
            <Button size="sm" variant="flat" icon={EditarIcon} />
            <Button size="sm" variant="flat" color="negative" icon={EliminarIcon} />
          </div>
        ),
        align: 'center',
      },
    ],
    items: usuariosEjemplo,
  },
};

// Tabla con filas resaltadas
export const WithHighlightedRows: Story = {
  args: {
    headers: [
      { title: 'ID', value: 'id' },
      { title: 'Nombre', value: 'nombre' },
      { title: 'Email', value: 'email' },
      { title: 'Rol', value: 'rol' },
    ],
    items: usuariosEjemplo,
    highlightedRows: [1, 3],
  },
};

// Tabla con click en filas
export const WithRowClick: Story = {
  args: {
    headers: [
      { title: 'ID', value: 'id' },
      { title: 'Nombre', value: 'nombre' },
      { title: 'Email', value: 'email' },
      { title: 'Rol', value: 'rol' },
    ],
    items: usuariosEjemplo.slice(0, 3),
    onRowClick: fn(),
  },
};

// Tabla vacía
export const Empty: Story = {
  args: {
    headers: [
      { title: 'ID', value: 'id' },
      { title: 'Nombre', value: 'nombre' },
      { title: 'Email', value: 'email' },
      { title: 'Rol', value: 'rol' },
    ],
    items: [],
  },
};

// Tabla con una sola fila
export const SingleRow: Story = {
  args: {
    headers: [
      { title: 'ID', value: 'id' },
      { title: 'Nombre', value: 'nombre' },
      { title: 'Email', value: 'email' },
      { title: 'Rol', value: 'rol' },
    ],
    items: [usuariosEjemplo[0]],
  },
};

// Tabla con children (contenido manual)
export const WithChildren: Story = {
  args: {
    headers: [
      { title: 'Producto' },
      { title: 'Precio', align: 'right' },
      { title: 'Stock', align: 'center' },
      { title: 'Acciones', align: 'center' },
    ],
    children: [
      <tr key="1">
        <td>Producto A</td>
        <td style={{ textAlign: 'right' }}>$99.99</td>
        <td style={{ textAlign: 'center' }}>15</td>
        <td style={{ textAlign: 'center' }}>
          <Button size="sm" variant="flat" icon={EditarIcon} />
        </td>
      </tr>,
      <tr key="2">
        <td>Producto B</td>
        <td style={{ textAlign: 'right' }}>$149.99</td>
        <td style={{ textAlign: 'center' }}>8</td>
        <td style={{ textAlign: 'center' }}>
          <Button size="sm" variant="flat" icon={EditarIcon} />
        </td>
      </tr>,
      <tr key="3">
        <td>Producto C</td>
        <td style={{ textAlign: 'right' }}>$79.99</td>
        <td style={{ textAlign: 'center' }}>0</td>
        <td style={{ textAlign: 'center' }}>
          <Button size="sm" variant="flat" color="negative" icon={EliminarIcon} />
        </td>
      </tr>,
    ],
  },
};

// Tabla compleja con múltiples características
export const Complex: Story = {
  args: {
    headers: [
      { title: 'ID', value: 'id', align: 'center' },
      { title: 'Usuario', value: 'nombre' },
      {
        title: 'Contacto',
        renderer: (usuario: Usuario) => (
          <div>
            <div style={{ fontWeight: 'bold' }}>{usuario.email}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Registrado: {new Date(usuario.fechaRegistro).toLocaleDateString()}
            </div>
          </div>
        ),
      },
      {
        title: 'Rol/Estado',
        renderer: (usuario: Usuario) => (
          <div>
            <div style={{ marginBottom: '4px' }}>{usuario.rol}</div>
            <span
              style={{
                padding: '2px 6px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: usuario.activo ? '#62b72d' : '#e10000',
                backgroundColor: usuario.activo ? '#f0f9ff' : '#fef2f2',
              }}
            >
              {usuario.activo ? 'ACTIVO' : 'INACTIVO'}
            </span>
          </div>
        ),
        align: 'center',
      },
      {
        title: 'Acciones',
        renderer: (usuario: Usuario) => (
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
            <Button size="sm" variant="flat" icon={VisualizarIcon} title="Ver" />
            <Button size="sm" variant="flat" icon={EditarIcon} title="Editar" />
            <Button
              size="sm"
              variant="flat"
              color="negative"
              icon={EliminarIcon}
              title="Eliminar"
              disabled={!usuario.activo}
            />
          </div>
        ),
        align: 'center',
      },
    ],
    items: usuariosEjemplo,
    highlightedRows: [0],
    onRowClick: fn(),
  },
};
