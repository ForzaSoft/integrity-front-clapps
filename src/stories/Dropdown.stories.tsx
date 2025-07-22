import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Dropdown, { DropdownOption } from '@/components/Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Generic dropdown component with customizable options, rounded styles and selection functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: { type: 'object' },
      description: 'Array of options for the dropdown',
    },
    selected: {
      control: { type: 'text' },
      description: 'Currently selected value',
    },
    onSelected: {
      description: 'Function executed when an option is selected',
      action: 'option-selected',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text that appears above the dropdown',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state that shows a shimmer placeholder',
    },
  },
  args: {
    onSelected: fn(),
    loading: false,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const stringOptions: DropdownOption<string>[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const longStringOptions: DropdownOption<string>[] = [{ value: 'option1', label: 'This is a long text example' }];

const manyOptions: DropdownOption<string>[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
  { value: 'option6', label: 'Option 6' },
  { value: 'option7', label: 'Option 7' },
  { value: 'option8', label: 'Option 8' },
  { value: 'option9', label: 'Option 9' },
  { value: 'option10', label: 'Option 10' },
];

export const Basic: Story = {
  args: {
    options: stringOptions,
  },
};

export const WithLabel: Story = {
  args: {
    options: stringOptions,
    label: 'Select an option',
  },
};

export const WithLongString: Story = {
  args: {
    options: longStringOptions,
    label: 'This is a long label to test the dropdown',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithPreselected: Story = {
  args: {
    options: stringOptions,
    selected: 'option2',
    label: 'Preselected option',
  },
};

export const PositionAdaptive = {
  render: () => {
    return (
      <div style={{ height: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#1e40af' }}>Adaptive Positioning</h3>
          <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b' }}>
            Dropdowns automatically adapt to available space. When there's not enough space below, they open upward.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#374151' }}>
              Dropdown with enough space (opens downward)
            </h4>
            <Dropdown label="Normal options" options={manyOptions} selected="option1" />
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#374151' }}>
            Dropdown near bottom edge (opens upward)
          </h4>
          <Dropdown label="Adaptive options" options={manyOptions} selected="option1" />
        </div>
      </div>
    );
  },
};
