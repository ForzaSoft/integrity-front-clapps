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
    title: 'Asignación de turno',
    subtitle: 'Spiritoso Guido Martin',
    date: '31 Ene 2024',
    time: '10:15',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Recepcionado',
    date: '31 Ene 2024',
    time: '12:25',
    status: 'completed',
    linkText: 'Más información',
    onLinkClick: fn(),
  },
  {
    id: 3,
    title: 'Atendido',
    date: '31 Ene 2024',
    status: 'completed',
    linkText: 'Más información',
    onLinkClick: fn(),
  },
  {
    id: 4,
    title: 'Informado',
    status: 'active',
    linkText: 'Más información',
    onLinkClick: fn(),
  },
  {
    id: 5,
    title: 'Liquidado',
    status: 'pending',
    linkText: 'Más información',
    onLinkClick: fn(),
  },
  {
    id: 6,
    title: 'Facturado',
    status: 'pending',
    linkText: 'Más información',
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
        title: 'Primera fase',
        subtitle: 'Descripción de la primera fase',
        date: '15 Dic 2023',
        time: '09:00',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Segunda fase',
        subtitle: 'Descripción de la segunda fase',
        date: '20 Dic 2023',
        time: '14:30',
        status: 'completed',
      },
      {
        id: 3,
        title: 'Tercera fase',
        subtitle: 'Descripción de la tercera fase',
        date: '25 Dic 2023',
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
        title: 'Registro',
        subtitle: 'Usuario registrado exitosamente',
        date: '10 Ene 2024',
        time: '08:30',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Verificación',
        subtitle: 'Verificando documentos',
        date: '12 Ene 2024',
        time: '10:00',
        status: 'active',
        linkText: 'Ver detalles',
        onLinkClick: fn(),
      },
      {
        id: 3,
        title: 'Aprobación',
        status: 'pending',
      },
      {
        id: 4,
        title: 'Finalización',
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
        title: 'Inicio',
        status: 'completed',
      },
      {
        id: 2,
        title: 'En progreso',
        status: 'active',
      },
      {
        id: 3,
        title: 'Pendiente',
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
        title: 'Paso 1',
        subtitle: 'Primer paso completado',
        status: 'completed',
        linkText: 'Ver más',
        onLinkClick: fn(),
      },
      {
        id: 2,
        title: 'Paso 2',
        subtitle: 'Segundo paso en curso',
        status: 'active',
        linkText: 'Información adicional',
        onLinkClick: fn(),
      },
      {
        id: 3,
        title: 'Paso 3',
        subtitle: 'Tercer paso pendiente',
        status: 'pending',
        linkText: 'Próximamente',
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
        title: 'Único paso',
        subtitle: 'Este es el único paso del proceso',
        date: 'Hoy',
        time: '15:30',
        status: 'completed',
        linkText: 'Finalizar',
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
        title: 'Solicitud enviada',
        subtitle: 'La solicitud ha sido enviada correctamente',
        date: '01 Feb 2024',
        time: '09:00',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Revisión inicial',
        subtitle: 'Documento bajo revisión',
        date: '02 Feb 2024',
        time: '11:30',
        status: 'completed',
        linkText: 'Ver comentarios',
        onLinkClick: fn(),
      },
      {
        id: 3,
        title: 'Verificación técnica',
        subtitle: 'Verificando aspectos técnicos',
        date: '05 Feb 2024',
        time: '14:15',
        status: 'completed',
      },
      {
        id: 4,
        title: 'Aprobación gerencial',
        subtitle: 'Esperando aprobación de gerencia',
        status: 'active',
        linkText: 'Contactar gerencia',
        onLinkClick: fn(),
      },
      {
        id: 5,
        title: 'Firma de documentos',
        status: 'pending',
      },
      {
        id: 6,
        title: 'Entrega final',
        status: 'pending',
      },
      {
        id: 7,
        title: 'Cierre del proceso',
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
        title: 'Configuración inicial',
        subtitle: 'Sistema configurado',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Carga de datos',
        subtitle: 'Datos importados correctamente',
        status: 'completed',
      },
      {
        id: 3,
        title: 'Validación',
        subtitle: 'Validando información',
        status: 'active',
      },
      {
        id: 4,
        title: 'Publicación',
        status: 'pending',
      },
    ],
  },
};
