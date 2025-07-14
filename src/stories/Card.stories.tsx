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
    title: 'Card Básica',
    children: (
      <div>
        <p>Este es el contenido básico de la card.</p>
        <p>Tiene dimensiones fijas de 360px de ancho y padding de 16px.</p>
      </div>
    ),
  },
};

export const Flat: Story = {
  args: {
    title: 'Card Flat',
    variant: 'flat',
    children: (
      <div>
        <p>Esta card usa la variante &apos;flat&apos; que no tiene fondo gris.</p>
        <p>Solo se ve el header con gradiente.</p>
      </div>
    ),
  },
};

export const Filled: Story = {
  args: {
    title: 'Card Filled',
    variant: 'filled',
    children: (
      <div>
        <p>Esta card usa la variante &apos;filled&apos; con fondo gris.</p>
        <p>Es la variante por defecto.</p>
      </div>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Este es un título muy largo que debería mostrar ellipsis cuando supere el ancho disponible',
    children: (
      <div>
        <p>Esta card demuestra cómo se comporta el título cuando es muy largo.</p>
        <p>El texto se corta con ellipsis (...) y el título completo se muestra en hover.</p>
      </div>
    ),
  },
};
