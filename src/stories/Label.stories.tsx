import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Label from '@/components/Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de etiqueta (badge) con estilo azul que se usa para mostrar estados, categorías o información destacada.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Contenido de la etiqueta',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Label básica
export const Basic: Story = {
  args: {
    children: 'Etiqueta',
  },
};

// Label con texto corto
export const Short: Story = {
  args: {
    children: 'OK',
  },
};

// Label con texto largo
export const Long: Story = {
  args: {
    children: 'Etiqueta con texto más largo',
  },
};

// Label con número
export const WithNumber: Story = {
  args: {
    children: '42',
  },
};

// Diferentes casos de uso
export const UseCases = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Estados:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Label>Activo</Label>
          <Label>Pendiente</Label>
          <Label>Completado</Label>
          <Label>En proceso</Label>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Prioridades:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Label>Alta</Label>
          <Label>Media</Label>
          <Label>Baja</Label>
          <Label>Urgente</Label>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Categorías:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Label>Medicina</Label>
          <Label>Cirugía</Label>
          <Label>Pediatría</Label>
          <Label>Cardiología</Label>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Números:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Label>1</Label>
          <Label>25</Label>
          <Label>100</Label>
          <Label>+999</Label>
        </div>
      </div>
    </div>
  ),
};

// Labels en contexto de lista
export const InList = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#374151' }}>Lista de Pacientes</h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div>
            <div style={{ fontWeight: '600' }}>Juan Pérez</div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>DNI: 12345678</div>
          </div>
          <Label>Confirmado</Label>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div>
            <div style={{ fontWeight: '600' }}>María García</div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>DNI: 87654321</div>
          </div>
          <Label>En espera</Label>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div>
            <div style={{ fontWeight: '600' }}>Carlos López</div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>DNI: 11223344</div>
          </div>
          <Label>Atendido</Label>
        </div>
      </div>
    </div>
  ),
};

// Labels con íconos y texto
export const WithIcons = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Con emojis:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Label>✅ Completado</Label>
          <Label>⏳ Pendiente</Label>
          <Label>🔥 Urgente</Label>
          <Label>📅 Programado</Label>
          <Label>❌ Cancelado</Label>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Sistema médico:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Label>🩺 Consulta</Label>
          <Label>💉 Vacunación</Label>
          <Label>🔬 Análisis</Label>
          <Label>📋 Control</Label>
          <Label>🚑 Emergencia</Label>
        </div>
      </div>
    </div>
  ),
};

// Labels en contexto de tabla
export const InTable = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#374151' }}>Turnos de Hoy</h4>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Paciente</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Hora</th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>Ana Martínez</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>09:00</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
              <Label>Confirmado</Label>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>Roberto Silva</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>09:30</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
              <Label>En espera</Label>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>Laura Torres</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>10:00</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
              <Label>Atendiendo</Label>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>Diego Ramírez</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>10:30</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
              <Label>Programado</Label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

// Labels múltiples en un elemento
export const Multiple = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#374151' }}>Perfil de Paciente</h4>

      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h5 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Dr. Carlos Mendoza</h5>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Especialista en Cardiología</p>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <Label>Cardiología</Label>
            <Label>Medicina Interna</Label>
            <Label>Ecocardiografía</Label>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '14px' }}>Horarios disponibles:</h6>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <Label>Lunes</Label>
            <Label>Miércoles</Label>
            <Label>Viernes</Label>
          </div>
        </div>

        <div>
          <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '14px' }}>Certificaciones:</h6>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <Label>UBA</Label>
            <Label>Residencia</Label>
            <Label>Fellowship</Label>
            <Label>15 años exp.</Label>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Casos extremos
export const EdgeCases = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Casos especiales:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Label>{''}</Label>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>(vacía)</span>

          <Label> </Label>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>(espacio)</span>

          <Label>A</Label>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>(una letra)</span>

          <Label>Etiqueta muy larga que puede ocupar mucho espacio</Label>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>(texto largo)</span>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Con caracteres especiales:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Label>123456789</Label>
          <Label>!@#$%</Label>
          <Label>áéíóú</Label>
          <Label>ñÑ</Label>
          <Label>COVID-19</Label>
          <Label>V1.2.3</Label>
        </div>
      </div>
    </div>
  ),
};
