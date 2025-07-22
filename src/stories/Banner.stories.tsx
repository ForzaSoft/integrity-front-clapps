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
          'Notification/alert component with different types and corresponding icons to display important messages to the user.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'Banner type that determines color, icon and style',
    },
    children: {
      control: { type: 'text' },
      description: 'Banner message content',
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    children: 'Operation completed successfully! The data has been saved correctly.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    children: 'Error: Could not complete the operation. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    children: 'Warning: Some fields are incomplete. Please review the information before continuing.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    children: 'Info: The system will update in 5 minutes. Please save your work.',
  },
};
