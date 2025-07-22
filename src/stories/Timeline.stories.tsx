import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import type { StepData } from '@/components/Timeline';
import Timeline from '@/components/Timeline';

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSteps: StepData[] = [
  {
    id: 1,
    title: 'Appointment assignment',
    subtitle: 'Spiritoso Guido Martin',
    date: 'Jan 31, 2024',
    time: '10:15',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Checked in',
    date: 'Jan 31, 2024',
    time: '12:25',
    status: 'completed',
    linkText: 'More information',
    onLinkClick: fn(),
  },
  {
    id: 3,
    title: 'Attended',
    date: 'Jan 31, 2024',
    status: 'completed',
    linkText: 'More information',
    onLinkClick: fn(),
  },
  {
    id: 4,
    title: 'Reported',
    status: 'active',
    linkText: 'More information',
    onLinkClick: fn(),
  },
  {
    id: 5,
    title: 'Settled',
    status: 'pending',
    linkText: 'More information',
    onLinkClick: fn(),
  },
  {
    id: 6,
    title: 'Billed',
    status: 'pending',
    linkText: 'More information',
    onLinkClick: fn(),
  },
];

export const Default: Story = {
  args: {
    steps: mockSteps,
  },
};

export const CompletedOnly: Story = {
  args: {
    steps: [
      {
        id: 1,
        title: 'First phase',
        subtitle: 'First phase description',
        date: 'Dec 15, 2023',
        time: '09:00',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Second phase',
        subtitle: 'Second phase description',
        date: 'Dec 20, 2023',
        time: '14:30',
        status: 'completed',
      },
      {
        id: 3,
        title: 'Third phase',
        subtitle: 'Third phase description',
        date: 'Dec 25, 2023',
        time: '11:15',
        status: 'completed',
      },
    ],
  },
};

export const WithActiveStep: Story = {
  args: {
    steps: [
      {
        id: 1,
        title: 'Registration',
        subtitle: 'User registered successfully',
        date: 'Jan 10, 2024',
        time: '08:30',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Verification',
        subtitle: 'Verifying documents',
        date: 'Jan 12, 2024',
        time: '10:00',
        status: 'active',
        linkText: 'View details',
        onLinkClick: fn(),
      },
      {
        id: 3,
        title: 'Approval',
        status: 'pending',
      },
      {
        id: 4,
        title: 'Completion',
        status: 'pending',
      },
    ],
  },
};

export const SimpleTimeline: Story = {
  args: {
    steps: [
      {
        id: 1,
        title: 'Start',
        status: 'completed',
      },
      {
        id: 2,
        title: 'In progress',
        status: 'active',
      },
      {
        id: 3,
        title: 'Pending',
        status: 'pending',
      },
    ],
  },
};

export const WithLinksOnly: Story = {
  args: {
    steps: [
      {
        id: 1,
        title: 'Step 1',
        subtitle: 'First step completed',
        status: 'completed',
        linkText: 'View more',
        onLinkClick: fn(),
      },
      {
        id: 2,
        title: 'Step 2',
        subtitle: 'Second step in progress',
        status: 'active',
        linkText: 'Additional information',
        onLinkClick: fn(),
      },
      {
        id: 3,
        title: 'Step 3',
        subtitle: 'Third step pending',
        status: 'pending',
        linkText: 'Coming soon',
        onLinkClick: fn(),
      },
    ],
  },
};

export const SingleStep: Story = {
  args: {
    steps: [
      {
        id: 1,
        title: 'Single step',
        subtitle: 'This is the only step in the process',
        date: 'Today',
        time: '15:30',
        status: 'completed',
        linkText: 'Finish',
        onLinkClick: fn(),
      },
    ],
  },
};

export const LongTimeline: Story = {
  args: {
    steps: [
      {
        id: 1,
        title: 'Request sent',
        subtitle: 'Request has been sent successfully',
        date: 'Feb 01, 2024',
        time: '09:00',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Initial review',
        subtitle: 'Document under review',
        date: 'Feb 02, 2024',
        time: '11:30',
        status: 'completed',
        linkText: 'View comments',
        onLinkClick: fn(),
      },
      {
        id: 3,
        title: 'Technical verification',
        subtitle: 'Verifying technical aspects',
        date: 'Feb 05, 2024',
        time: '14:15',
        status: 'completed',
      },
      {
        id: 4,
        title: 'Management approval',
        subtitle: 'Awaiting management approval',
        status: 'active',
        linkText: 'Contact management',
        onLinkClick: fn(),
      },
      {
        id: 5,
        title: 'Document signing',
        status: 'pending',
      },
      {
        id: 6,
        title: 'Final delivery',
        status: 'pending',
      },
      {
        id: 7,
        title: 'Process closure',
        status: 'pending',
      },
    ],
  },
};

export const NoDateTime: Story = {
  args: {
    steps: [
      {
        id: 1,
        title: 'Initial setup',
        subtitle: 'System configured',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Data loading',
        subtitle: 'Data imported successfully',
        status: 'completed',
      },
      {
        id: 3,
        title: 'Validation',
        subtitle: 'Validating information',
        status: 'active',
      },
      {
        id: 4,
        title: 'Publication',
        status: 'pending',
      },
    ],
  },
};
