import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Input from '@/components/Input';
import BuscarIcon from '@/icons/BuscarIcon';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente de input con soporte para íconos y modo invertido.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variantSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: 'Básico',
  args: {
    placeholder: 'Escribe aquí...',
    variantSize: 'md',
  },
};

export const WithIcon: Story = {
  name: 'Con ícono de búsqueda',
  args: {
    placeholder: 'Buscar...',
    variantSize: 'md',
    icon: BuscarIcon,
    iconPosition: 'left',
  },
};

export const WithIconRight: Story = {
  name: 'Con ícono a la derecha',
  args: {
    placeholder: 'Buscar...',
    variantSize: 'md',
    icon: BuscarIcon,
    iconPosition: 'right',
  },
};
