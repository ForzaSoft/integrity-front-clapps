import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Banner from '@/components/Banner';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de notificación/alerta con diferentes tipos y iconos correspondientes para mostrar mensajes importantes al usuario.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'Tipo de banner que determina el color, icono y estilo',
    },
    children: {
      control: { type: 'text' },
      description: 'Contenido del mensaje del banner',
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Banner de éxito
export const Success: Story = {
  args: {
    type: 'success',
    children: '¡Operación completada exitosamente! Los datos se han guardado correctamente.',
  },
};

// Banner de error
export const Error: Story = {
  args: {
    type: 'error',
    children: 'Error: No se pudo completar la operación. Por favor, intente nuevamente.',
  },
};

// Banner de advertencia
export const Warning: Story = {
  args: {
    type: 'warning',
    children: 'Advertencia: Algunos campos están incompletos. Revise la información antes de continuar.',
  },
};

// Banner de información
export const Info: Story = {
  args: {
    type: 'info',
    children: 'Información: El sistema se actualizará en 5 minutos. Guarde su trabajo.',
  },
};

// Banner con mensaje corto
export const ShortMessage: Story = {
  args: {
    type: 'success',
    children: 'Guardado.',
  },
};

// Banner con mensaje largo
export const LongMessage: Story = {
  args: {
    type: 'error',
    children:
      'Error crítico del sistema: No se pudo establecer conexión con la base de datos. Esto puede deberse a problemas de conectividad de red, mantenimiento programado del servidor, o configuración incorrecta de la base de datos. Por favor, contacte al administrador del sistema si el problema persiste.',
  },
};

// Banner con contenido HTML
export const WithHtmlContent: Story = {
  args: {
    type: 'info',
    children: (
      <>
        <strong>Nueva actualización disponible:</strong> Haga clic{' '}
        <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>
          aquí
        </a>{' '}
        para actualizar.
      </>
    ),
  },
};

// Banner con lista
export const WithList: Story = {
  args: {
    type: 'warning',
    children: (
      <>
        <strong>Se encontraron los siguientes errores:</strong>
        <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
          <li>El campo &quot;Nombre&quot; es obligatorio</li>
          <li>El formato del email es inválido</li>
          <li>La fecha debe ser posterior a hoy</li>
        </ul>
      </>
    ),
  },
};

// Todos los tipos juntos para comparación
export const AllTypes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Banner type="success">✅ Éxito: La operación se completó correctamente.</Banner>
      <Banner type="error">❌ Error: Algo salió mal durante el proceso.</Banner>
      <Banner type="warning">⚠️ Advertencia: Revise la información antes de continuar.</Banner>
      <Banner type="info">ℹ️ Información: Datos importantes del sistema.</Banner>
    </div>
  ),
};

// Casos de uso del sistema médico
export const MedicalSystemExamples = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Banner type="success">Turno confirmado para Juan Pérez el 15/03/2024 a las 14:30 hs.</Banner>
      <Banner type="warning">El paciente María García tiene 15 minutos de retraso en su cita.</Banner>
      <Banner type="error">No se pudo acceder al historial médico. Verifique la conexión.</Banner>
      <Banner type="info">Recordatorio: Mañana hay mantenimiento programado de 02:00 a 06:00 hs.</Banner>
    </div>
  ),
};

// Banner con acciones
export const WithActions: Story = {
  args: {
    type: 'warning',
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span>Su sesión expirará en 5 minutos.</span>
        <button
          style={{
            background: 'transparent',
            border: '1px solid currentColor',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '0.75rem',
            color: 'inherit',
            cursor: 'pointer',
            marginLeft: '16px',
          }}
        >
          Extender
        </button>
      </div>
    ),
  },
};

// Banner minimalista
export const Minimal: Story = {
  args: {
    type: 'info',
    children: 'Sistema actualizado',
  },
};

// Banner con código de error
export const WithErrorCode: Story = {
  args: {
    type: 'error',
    children: (
      <>
        <strong>Error 500:</strong> Error interno del servidor.{' '}
        <span style={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>ID: ERR-2024-03-15-001</span>
      </>
    ),
  },
};

// Banner de validación de formulario
export const FormValidation: Story = {
  args: {
    type: 'error',
    children: (
      <>
        <strong>Errores de validación:</strong>
        <br />
        • El DNI debe tener 8 dígitos
        <br />
        • El teléfono debe incluir código de área
        <br />• La obra social es obligatoria
      </>
    ),
  },
};
