import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from '@/components/Button';
import Caja from '@/components/Caja';
import AgregarIcon from '@/icons/AgregarIcon';
import EditarIcon from '@/icons/EditarIcon';

const meta = {
  title: 'Components/Caja',
  component: Caja,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente contenedor flexible con título opcional y borde inferior con gradiente azul.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    titulo: {
      control: { type: 'text' },
      description: 'Título opcional que se muestra en el header',
    },
    children: {
      control: { type: 'text' },
      description: 'Contenido del componente',
    },
  },
} satisfies Meta<typeof Caja>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    titulo: 'Título de la Caja',
    children: (
      <div>
        <p>Este es el contenido básico de la caja.</p>
        <p>El componente es flexible y se adapta al contenido.</p>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 16px 0' }}>Contenido sin título</h3>
        <p>Esta caja no tiene header con título.</p>
        <p>Solo muestra el contenido con el fondo gris característico.</p>
      </div>
    ),
  },
};

export const SimpleContent: Story = {
  args: {
    titulo: 'Información',
    children: <p>Contenido simple en una línea de texto.</p>,
  },
};

export const WithList: Story = {
  args: {
    titulo: 'Lista de Elementos',
    children: (
      <ul style={{ margin: 0, paddingLeft: '20px' }}>
        <li>Primer elemento de la lista</li>
        <li>Segundo elemento de la lista</li>
        <li>Tercer elemento de la lista</li>
        <li>Cuarto elemento de la lista</li>
      </ul>
    ),
  },
};

export const WithActions: Story = {
  args: {
    titulo: 'Acciones del Usuario',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p>Seleccione una acción para continuar:</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="sm" variant="primary" icon={AgregarIcon}>
            Agregar
          </Button>
          <Button size="sm" variant="secondary" icon={EditarIcon}>
            Editar
          </Button>
          <Button size="sm" variant="outline">
            Cancelar
          </Button>
        </div>
      </div>
    ),
  },
};

export const WithForm: Story = {
  args: {
    titulo: 'Datos del Paciente',
    children: (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Nombre completo</label>
          <input
            type="text"
            placeholder="Ingrese el nombre"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button size="sm" variant="outline">
            Cancelar
          </Button>
          <Button size="sm" variant="primary">
            Guardar
          </Button>
        </div>
      </form>
    ),
  },
};

export const WithMetrics: Story = {
  args: {
    titulo: 'Estadísticas del Día',
    children: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0ea5e9' }}>45</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Turnos Atendidos</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>12</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>En Espera</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>3</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Retrasados</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>1</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Cancelados</div>
        </div>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    titulo: 'Cargando Datos',
    children: (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            border: '3px solid #f3f4f6',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ margin: 0, color: '#6b7280' }}>Cargando información...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    ),
  },
};

export const WithLongContent: Story = {
  args: {
    titulo: 'Descripción Detallada',
    children: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.
        </p>
      </div>
    ),
  },
};

export const WithTable: Story = {
  args: {
    titulo: 'Horarios de Atención',
    children: (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: '600' }}>Día</th>
            <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: '600' }}>Horario</th>
            <th style={{ textAlign: 'center', padding: '8px 0', fontWeight: '600' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
            <td style={{ padding: '8px 0' }}>Lunes</td>
            <td style={{ padding: '8px 0' }}>08:00 - 17:00</td>
            <td style={{ padding: '8px 0', textAlign: 'center' }}>
              <span style={{ color: '#22c55e', fontWeight: '500' }}>Activo</span>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
            <td style={{ padding: '8px 0' }}>Martes</td>
            <td style={{ padding: '8px 0' }}>08:00 - 17:00</td>
            <td style={{ padding: '8px 0', textAlign: 'center' }}>
              <span style={{ color: '#22c55e', fontWeight: '500' }}>Activo</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0' }}>Miércoles</td>
            <td style={{ padding: '8px 0' }}>08:00 - 12:00</td>
            <td style={{ padding: '8px 0', textAlign: 'center' }}>
              <span style={{ color: '#f59e0b', fontWeight: '500' }}>Medio día</span>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
};
