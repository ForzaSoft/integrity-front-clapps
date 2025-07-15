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
        component:
          'Componente dropdown genérico con opciones personalizables, estilos redondeados y funcionalidad de selección.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: { type: 'object' },
      description: 'Array de opciones para el dropdown',
    },
    selected: {
      control: { type: 'text' },
      description: 'Valor actualmente seleccionado',
    },
    onSelected: {
      description: 'Función que se ejecuta cuando se selecciona una opción',
      action: 'option-selected',
    },
    label: {
      control: { type: 'text' },
      description: 'Texto del label que aparece encima del dropdown',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Estado de carga que muestra un shimmer placeholder',
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
  { value: 'opcion1', label: 'Opción 1' },
  { value: 'opcion2', label: 'Opción 2' },
  { value: 'opcion3', label: 'Opción 3' },
];

const longStringOptions: DropdownOption<string>[] = [{ value: 'opcion1', label: 'Este es un texto largo de ejemplo' }];

const manyOptions: DropdownOption<string>[] = [
  { value: 'opcion1', label: 'Opción 1' },
  { value: 'opcion2', label: 'Opción 2' },
  { value: 'opcion3', label: 'Opción 3' },
  { value: 'opcion4', label: 'Opción 4' },
  { value: 'opcion5', label: 'Opción 5' },
  { value: 'opcion6', label: 'Opción 6' },
  { value: 'opcion7', label: 'Opción 7' },
  { value: 'opcion8', label: 'Opción 8' },
  { value: 'opcion9', label: 'Opción 9' },
  { value: 'opcion10', label: 'Opción 10' },
];

export const Basic: Story = {
  args: {
    options: stringOptions,
  },
};

export const WithLabel: Story = {
  args: {
    options: stringOptions,
    label: 'Selecciona una opción',
  },
};

export const WithLongString: Story = {
  args: {
    options: longStringOptions,
    label: 'Este es un label largo para testear el dropdown',
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
    selected: 'opcion2',
    label: 'Opción preseleccionada',
  },
};

export const PositionAdaptive = {
  render: () => {
    return (
      <div style={{ height: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#1e40af' }}>Posicionamiento Adaptativo</h3>
          <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b' }}>
            Los dropdowns se adaptan automáticamente al espacio disponible. Cuando no hay suficiente espacio abajo, se
            abren hacia arriba.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#374151' }}>
              Dropdown con espacio suficiente (se abre hacia abajo)
            </h4>
            <Dropdown label="Opciones normales" options={manyOptions} selected="opcion1" />
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#374151' }}>
            Dropdown cerca del borde inferior (se abre hacia arriba)
          </h4>
          <Dropdown label="Opciones que se adaptan" options={manyOptions} selected="opcion1" />
        </div>
      </div>
    );
  },
};
