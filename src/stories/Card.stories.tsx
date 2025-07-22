import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Card from '@/components/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'flat'],
      description: 'Visual variant of the card',
    },
    title: {
      control: { type: 'text' },
      description: 'Title displayed in the header',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Basic Card',
    children: (
      <div>
        <p>This is the basic card content.</p>
        <p>It has fixed dimensions of 360px width and 16px padding.</p>
      </div>
    ),
  },
};

export const Flat: Story = {
  args: {
    title: 'Flat Card',
    variant: 'flat',
    children: (
      <div>
        <p>This card uses the &apos;flat&apos; variant which has no gray background.</p>
        <p>Only the header with gradient is visible.</p>
      </div>
    ),
  },
};

export const Filled: Story = {
  args: {
    title: 'Filled Card',
    variant: 'filled',
    children: (
      <div>
        <p>This card uses the &apos;filled&apos; variant with gray background.</p>
        <p>This is the default variant.</p>
      </div>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a very long title that should show ellipsis when it exceeds the available width',
    children: (
      <div>
        <p>This card demonstrates how the title behaves when it is very long.</p>
        <p>Text is truncated with ellipsis (...) and the full title is shown on hover.</p>
      </div>
    ),
  },
};
