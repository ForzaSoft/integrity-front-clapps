import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Button from '@/components/Button';
import AgregarIcon from '@/icons/AgregarIcon';
import EditarIcon from '@/icons/EditarIcon';
import EliminarIcon from '@/icons/EliminarIcon';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'flat', 'flat-inverted'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: { type: 'select' },
      options: ['square', 'round'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'negative', 'positive'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const Flat: Story = {
  args: {
    children: 'Button',
    variant: 'flat',
  },
};

export const FlatInverted: Story = {
  args: {
    children: 'Button',
    variant: 'flat-inverted',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Square: Story = {
  args: {
    children: 'Square',
    shape: 'square',
  },
};

export const Round: Story = {
  args: {
    children: 'Round',
    shape: 'round',
  },
};

export const Default: Story = {
  args: {
    children: 'Default',
    color: 'default',
  },
};

export const Negative: Story = {
  args: {
    children: 'Negative',
    color: 'negative',
  },
};

export const Positive: Story = {
  args: {
    children: 'Positive',
    color: 'positive',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Agregar',
    icon: AgregarIcon,
  },
};

export const IconOnly: Story = {
  args: {
    icon: EditarIcon,
  },
};

export const IconSecondary: Story = {
  args: {
    children: 'Editar',
    icon: EditarIcon,
    variant: 'secondary',
  },
};

export const IconNegative: Story = {
  args: {
    children: 'Eliminar',
    icon: EliminarIcon,
    color: 'negative',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const DisabledWithIcon: Story = {
  args: {
    children: 'Disabled',
    icon: AgregarIcon,
    disabled: true,
  },
};

export const LargeRoundPositive: Story = {
  args: {
    children: 'Large Round Positive',
    size: 'lg',
    shape: 'round',
    color: 'positive',
  },
};

export const SmallOutlineNegative: Story = {
  args: {
    children: 'Small Outline Negative',
    size: 'sm',
    variant: 'outline',
    color: 'negative',
  },
};
