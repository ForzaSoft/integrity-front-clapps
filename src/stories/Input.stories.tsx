import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Input from '@/components/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de input que extiende las propiedades nativas de HTML input con variantes de tamaño y estilos personalizados.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variantSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del input',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
      description: 'Tipo de input HTML',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto de placeholder',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Estado de carga',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado deshabilitado',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Campo requerido',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Ingrese su texto aquí...',
    variantSize: 'md',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Input pequeño',
    variantSize: 'sm',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Input mediano',
    variantSize: 'md',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Input grande',
    variantSize: 'lg',
  },
};
