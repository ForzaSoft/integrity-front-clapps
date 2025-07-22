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
        component: 'Input component with support for icons and inverted mode.',
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
  name: 'Basic',
  args: {
    placeholder: 'Type here...',
    variantSize: 'md',
  },
};

export const WithIcon: Story = {
  name: 'With Search Icon',
  args: {
    placeholder: 'Search...',
    variantSize: 'md',
    icon: BuscarIcon,
    iconPosition: 'left',
  },
};

export const WithIconRight: Story = {
  name: 'With Icon Right',
  args: {
    placeholder: 'Search...',
    variantSize: 'md',
    icon: BuscarIcon,
    iconPosition: 'right',
  },
};

export const OutlinedWithLabel: Story = {
  name: 'Outlined with Label (new style)',
  args: {
    placeholder: '1342',
    variantSize: 'md',
    appearance: 'outlined',
    label: 'Invoice Number',
  },
};

export const OutlinedBasic: Story = {
  name: 'Basic Outlined',
  args: {
    placeholder: 'Type here...',
    variantSize: 'md',
    appearance: 'outlined',
  },
};

export const OutlinedWithIcon: Story = {
  name: 'Outlined with Icon',
  args: {
    placeholder: 'Search...',
    variantSize: 'md',
    appearance: 'outlined',
    icon: BuscarIcon,
    iconPosition: 'left',
    label: 'Search',
  },
};

export const UnderlineStyle: Story = {
  name: 'Underline (previous style)',
  args: {
    placeholder: 'Previous style...',
    variantSize: 'md',
    appearance: 'underline',
  },
};

export const Comparison: Story = {
  name: 'Style Comparison',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#374151' }}>New Style (Outlined) - Default</h4>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'end' }}>
          <Input placeholder="No label" variantSize="md" appearance="outlined" />
          <Input placeholder="1342" variantSize="md" appearance="outlined" label="Invoice Number" />
          <Input placeholder="Search..." variantSize="md" appearance="outlined" icon={BuscarIcon} label="Search" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#374151' }}>Previous Style (Underline)</h4>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'end' }}>
          <Input placeholder="Text..." variantSize="md" appearance="underline" />
          <Input placeholder="Search..." variantSize="md" appearance="underline" icon={BuscarIcon} />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#374151' }}>Sizes (Outlined)</h4>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'end' }}>
          <Input placeholder="Small" variantSize="sm" appearance="outlined" label="SM" />
          <Input placeholder="Medium" variantSize="md" appearance="outlined" label="MD" />
          <Input placeholder="Large" variantSize="lg" appearance="outlined" label="LG" />
        </div>
      </div>
    </div>
  ),
};
