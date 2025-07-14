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

export const Success: Story = {
  args: {
    type: 'success',
    children: '¡Operación completada exitosamente! Los datos se han guardado correctamente.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    children: 'Error: No se pudo completar la operación. Por favor, intente nuevamente.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    children: 'Advertencia: Algunos campos están incompletos. Revise la información antes de continuar.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    children: 'Información: El sistema se actualizará en 5 minutos. Guarde su trabajo.',
  },
};
