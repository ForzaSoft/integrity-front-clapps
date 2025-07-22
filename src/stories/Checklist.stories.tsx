import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { ChecklistItem } from '@/components/Checklist';
import Checklist from '@/components/Checklist';

const meta = {
  title: 'Components/Checklist',
  component: Checklist,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    items: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof Checklist>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems: ChecklistItem[] = [
  {
    id: 1,
    text: 'Requesting physician',
    status: 'completed',
  },
  {
    id: 2,
    text: 'Services',
    status: 'completed',
  },
  {
    id: 3,
    text: 'Medical order',
    status: 'completed',
  },
  {
    id: 4,
    text: 'Insurance authorization',
    status: 'error',
  },
];

export const Default: Story = {
  args: {
    title: 'Appointment requirements status:',
    items: defaultItems,
  },
};

export const AllCompleted: Story = {
  args: {
    title: 'Appointment requirements status:',
    items: [
      {
        id: 1,
        text: 'Requesting physician',
        status: 'completed',
      },
      {
        id: 2,
        text: 'Services',
        status: 'completed',
      },
      {
        id: 3,
        text: 'Medical order',
        status: 'completed',
      },
      {
        id: 4,
        text: 'Insurance authorization',
        status: 'completed',
      },
    ],
  },
};

export const AllErrors: Story = {
  args: {
    title: 'Appointment requirements status:',
    items: [
      {
        id: 1,
        text: 'Requesting physician',
        status: 'error',
      },
      {
        id: 2,
        text: 'Services',
        status: 'error',
      },
      {
        id: 3,
        text: 'Medical order',
        status: 'error',
      },
      {
        id: 4,
        text: 'Insurance authorization',
        status: 'error',
      },
    ],
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Document verification:',
    items: [
      {
        id: 1,
        text: 'Patient ID',
        status: 'completed',
      },
      {
        id: 2,
        text: 'Valid insurance',
        status: 'completed',
      },
      {
        id: 3,
        text: 'Prior authorization',
        status: 'error',
      },
    ],
  },
};

export const ShortList: Story = {
  args: {
    title: 'Basic requirements:',
    items: [
      {
        id: 1,
        text: 'Identification',
        status: 'completed',
      },
      {
        id: 2,
        text: 'Consent',
        status: 'error',
      },
    ],
  },
};

export const LongList: Story = {
  args: {
    title: 'Complete requirements checklist:',
    items: [
      {
        id: 1,
        text: 'Requesting physician',
        status: 'completed',
      },
      {
        id: 2,
        text: 'Authorized services',
        status: 'completed',
      },
      {
        id: 3,
        text: 'Valid medical order',
        status: 'completed',
      },
      {
        id: 4,
        text: 'Insurance authorization',
        status: 'error',
      },
      {
        id: 5,
        text: 'Patient documentation',
        status: 'completed',
      },
      {
        id: 6,
        text: 'Informed consent',
        status: 'error',
      },
      {
        id: 7,
        text: 'Updated medical history',
        status: 'completed',
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    title: 'Single status:',
    items: [
      {
        id: 1,
        text: 'Pending authorization',
        status: 'error',
      },
    ],
  },
};
