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
    appearance: {
      control: { type: 'select' },
      options: ['outlined', 'underline'],
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

export const OutlinedWithLabel: Story = {
  name: 'Outlined con label (nuevo estilo)',
  args: {
    placeholder: '1342',
    variantSize: 'md',
    appearance: 'outlined',
    label: 'Nro. Liquidación',
  },
};

export const OutlinedBasic: Story = {
  name: 'Outlined básico',
  args: {
    placeholder: 'Escribe aquí...',
    variantSize: 'md',
    appearance: 'outlined',
  },
};

export const OutlinedWithIcon: Story = {
  name: 'Outlined con ícono',
  args: {
    placeholder: 'Buscar...',
    variantSize: 'md',
    appearance: 'outlined',
    icon: BuscarIcon,
    iconPosition: 'left',
    label: 'Búsqueda',
  },
};

export const UnderlineStyle: Story = {
  name: 'Underline (estilo anterior)',
  args: {
    placeholder: 'Estilo anterior...',
    variantSize: 'md',
    appearance: 'underline',
  },
};

export const Comparison: Story = {
  name: 'Comparación de estilos',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#374151' }}>
          Nuevo estilo (Outlined) - Por defecto
        </h4>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'end' }}>
          <Input placeholder="Sin label" variantSize="md" appearance="outlined" />
          <Input placeholder="1342" variantSize="md" appearance="outlined" label="Nro. Liquidación" />
          <Input placeholder="Buscar..." variantSize="md" appearance="outlined" icon={BuscarIcon} label="Búsqueda" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#374151' }}>Estilo anterior (Underline)</h4>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'end' }}>
          <Input placeholder="Texto..." variantSize="md" appearance="underline" />
          <Input placeholder="Buscar..." variantSize="md" appearance="underline" icon={BuscarIcon} />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#374151' }}>Tamaños (Outlined)</h4>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'end' }}>
          <Input placeholder="Pequeño" variantSize="sm" appearance="outlined" label="SM" />
          <Input placeholder="Mediano" variantSize="md" appearance="outlined" label="MD" />
          <Input placeholder="Grande" variantSize="lg" appearance="outlined" label="LG" />
        </div>
      </div>
    </div>
  ),
};
