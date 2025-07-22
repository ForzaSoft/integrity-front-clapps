import TurnosDelDiaComponent from '@/components/TurnosDelDiaComponent';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TurnosDelDiaComponent> = {
  title: 'Components/TurnosDelDiaComponent',
  component: TurnosDelDiaComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Component that displays daily appointment statistics with visual indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    values: {
      control: { type: 'object' },
      description: 'Object with appointment statistics',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    values: {
      total: 24,
      sinLlegar: 6,
      presentes: 4,
      atendidos: 14,
    },
  },
};

export const Loading: Story = {
  args: {
    values: undefined,
  },
};

export const HighVolume: Story = {
  args: {
    values: {
      total: 45,
      sinLlegar: 12,
      presentes: 8,
      atendidos: 25,
    },
  },
};

export const LowVolume: Story = {
  args: {
    values: {
      total: 8,
      sinLlegar: 2,
      presentes: 1,
      atendidos: 5,
    },
  },
};

export const ForTesting: Story = {
  args: {
    values: {
      total: 10,
      sinLlegar: 3,
      presentes: 2,
      atendidos: 5,
    },
  },
};
