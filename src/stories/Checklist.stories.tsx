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
    text: 'Médico solicitante',
    status: 'completed',
  },
  {
    id: 2,
    text: 'Prestaciones',
    status: 'completed',
  },
  {
    id: 3,
    text: 'Orden médica',
    status: 'completed',
  },
  {
    id: 4,
    text: 'Autorización de obra Social',
    status: 'error',
  },
];

export const Default: Story = {
  args: {
    title: 'Estado de requisitos del turno:',
    items: defaultItems,
  },
};

export const AllCompleted: Story = {
  args: {
    title: 'Estado de requisitos del turno:',
    items: [
      {
        id: 1,
        text: 'Médico solicitante',
        status: 'completed',
      },
      {
        id: 2,
        text: 'Prestaciones',
        status: 'completed',
      },
      {
        id: 3,
        text: 'Orden médica',
        status: 'completed',
      },
      {
        id: 4,
        text: 'Autorización de obra Social',
        status: 'completed',
      },
    ],
  },
};

export const AllErrors: Story = {
  args: {
    title: 'Estado de requisitos del turno:',
    items: [
      {
        id: 1,
        text: 'Médico solicitante',
        status: 'error',
      },
      {
        id: 2,
        text: 'Prestaciones',
        status: 'error',
      },
      {
        id: 3,
        text: 'Orden médica',
        status: 'error',
      },
      {
        id: 4,
        text: 'Autorización de obra Social',
        status: 'error',
      },
    ],
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Verificación de documentos:',
    items: [
      {
        id: 1,
        text: 'DNI del paciente',
        status: 'completed',
      },
      {
        id: 2,
        text: 'Obra social vigente',
        status: 'completed',
      },
      {
        id: 3,
        text: 'Autorización previa',
        status: 'error',
      },
    ],
  },
};

export const ShortList: Story = {
  args: {
    title: 'Requisitos básicos:',
    items: [
      {
        id: 1,
        text: 'Identificación',
        status: 'completed',
      },
      {
        id: 2,
        text: 'Consentimiento',
        status: 'error',
      },
    ],
  },
};

export const LongList: Story = {
  args: {
    title: 'Checklist completo de requisitos:',
    items: [
      {
        id: 1,
        text: 'Médico solicitante',
        status: 'completed',
      },
      {
        id: 2,
        text: 'Prestaciones autorizadas',
        status: 'completed',
      },
      {
        id: 3,
        text: 'Orden médica válida',
        status: 'completed',
      },
      {
        id: 4,
        text: 'Autorización de obra Social',
        status: 'error',
      },
      {
        id: 5,
        text: 'Documentación del paciente',
        status: 'completed',
      },
      {
        id: 6,
        text: 'Consentimiento informado',
        status: 'error',
      },
      {
        id: 7,
        text: 'Historia clínica actualizada',
        status: 'completed',
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    title: 'Estado único:',
    items: [
      {
        id: 1,
        text: 'Autorización pendiente',
        status: 'error',
      },
    ],
  },
};
