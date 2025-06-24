import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
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
  },
  args: {
    onSelected: fn(),
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Opciones de ejemplo para diferentes casos
const stringOptions: DropdownOption<string>[] = [
  { value: 'opcion1', label: 'Opción 1' },
  { value: 'opcion2', label: 'Opción 2' },
  { value: 'opcion3', label: 'Opción 3' },
];

const numberOptions: DropdownOption<number>[] = [
  { value: 1, label: 'Uno' },
  { value: 2, label: 'Dos' },
  { value: 3, label: 'Tres' },
  { value: 4, label: 'Cuatro' },
  { value: 5, label: 'Cinco' },
];

const monthOptions: DropdownOption<number>[] = [
  { value: 0, label: 'Enero' },
  { value: 1, label: 'Febrero' },
  { value: 2, label: 'Marzo' },
  { value: 3, label: 'Abril' },
  { value: 4, label: 'Mayo' },
  { value: 5, label: 'Junio' },
  { value: 6, label: 'Julio' },
  { value: 7, label: 'Agosto' },
  { value: 8, label: 'Septiembre' },
  { value: 9, label: 'Octubre' },
  { value: 10, label: 'Noviembre' },
  { value: 11, label: 'Diciembre' },
];

const yearOptions: DropdownOption<number>[] = [
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025' },
];

// Dropdown básico con strings
export const Basic: Story = {
  args: {
    options: stringOptions,
  },
};

// Dropdown con números
export const WithNumbers: Story = {
  args: {
    options: numberOptions,
  },
};

// Dropdown con selección inicial
export const WithPreselected: Story = {
  args: {
    options: stringOptions,
    selected: 'opcion2',
  },
};

// Dropdown de meses
export const MonthSelector: Story = {
  args: {
    options: monthOptions,
    selected: new Date().getMonth(), // mes actual
  },
};

// Dropdown de años
export const YearSelector: Story = {
  args: {
    options: yearOptions,
    selected: new Date().getFullYear(), // año actual
  },
};

// Dropdown con muchas opciones
export const WithManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: i + 1,
      label: `Opción ${i + 1}`,
    })),
  },
};

// Dropdown interactivo
export const Interactive = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<string>('opcion1');

    const options: DropdownOption<string>[] = [
      { value: 'red', label: 'Rojo' },
      { value: 'green', label: 'Verde' },
      { value: 'blue', label: 'Azul' },
      { value: 'yellow', label: 'Amarillo' },
      { value: 'purple', label: 'Morado' },
    ];

    const getColorValue = (colorName: string) => {
      const colors: Record<string, string> = {
        red: '#ef4444',
        green: '#22c55e',
        blue: '#3b82f6',
        yellow: '#eab308',
        purple: '#a855f7',
      };
      return colors[colorName] || '#6b7280';
    };

    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Selecciona un color:</label>
          <Dropdown
            options={options}
            selected={selectedOption}
            onSelected={(value) => {
              setSelectedOption(value);
              console.log('Color seleccionado:', value);
            }}
          />
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: getColorValue(selectedOption),
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
          }}
        >
          Color seleccionado: {options.find((opt) => opt.value === selectedOption)?.label}
        </div>
      </div>
    );
  },
};

// Casos de uso del sistema médico
export const MedicalSystem = {
  render: () => {
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('cardiology');
    const [selectedDoctor, setSelectedDoctor] = useState<number>(1);

    const specialtyOptions: DropdownOption<string>[] = [
      { value: 'cardiology', label: 'Cardiología' },
      { value: 'dermatology', label: 'Dermatología' },
      { value: 'neurology', label: 'Neurología' },
      { value: 'pediatrics', label: 'Pediatría' },
      { value: 'psychiatry', label: 'Psiquiatría' },
      { value: 'surgery', label: 'Cirugía' },
    ];

    const doctorsBySpecialty: Record<string, DropdownOption<number>[]> = {
      cardiology: [
        { value: 1, label: 'Dr. García' },
        { value: 2, label: 'Dra. López' },
        { value: 3, label: 'Dr. Martínez' },
      ],
      dermatology: [
        { value: 4, label: 'Dra. Rodríguez' },
        { value: 5, label: 'Dr. Fernández' },
      ],
      neurology: [
        { value: 6, label: 'Dr. Sánchez' },
        { value: 7, label: 'Dra. Ruiz' },
        { value: 8, label: 'Dr. Morales' },
      ],
      pediatrics: [
        { value: 9, label: 'Dra. Torres' },
        { value: 10, label: 'Dr. Vargas' },
      ],
      psychiatry: [
        { value: 11, label: 'Dr. Castro' },
        { value: 12, label: 'Dra. Herrera' },
      ],
      surgery: [
        { value: 13, label: 'Dr. Mendoza' },
        { value: 14, label: 'Dra. Silva' },
        { value: 15, label: 'Dr. Reyes' },
      ],
    };

    const currentDoctors = doctorsBySpecialty[selectedSpecialty] || [];

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ marginTop: 0, color: '#1e40af' }}>Programar Cita Médica</h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
              Especialidad:
            </label>
            <Dropdown
              options={specialtyOptions}
              selected={selectedSpecialty}
              onSelected={(value) => {
                setSelectedSpecialty(value);
                // Reset doctor selection when specialty changes
                setSelectedDoctor(doctorsBySpecialty[value]?.[0]?.value || 0);
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
              Médico:
            </label>
            <Dropdown options={currentDoctors} selected={selectedDoctor} onSelected={setSelectedDoctor} />
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '250px' }}>
          <div
            style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', color: '#475569' }}>📋 Resumen de la Cita</h4>

            <div style={{ marginBottom: '12px' }}>
              <strong>Especialidad:</strong>
              <br />
              <span style={{ color: '#1e40af' }}>
                {specialtyOptions.find((s) => s.value === selectedSpecialty)?.label}
              </span>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <strong>Médico:</strong>
              <br />
              <span style={{ color: '#1e40af' }}>
                {currentDoctors.find((d) => d.value === selectedDoctor)?.label || 'No seleccionado'}
              </span>
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: '#dcfce7',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#166534',
              }}
            >
              <strong>✅ Médico disponible</strong>
              <br />
              Horarios: Lun-Vie 9:00-17:00
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Dropdown sin opciones
export const Empty: Story = {
  args: {
    options: [],
  },
};

// Dropdown con una sola opción
export const SingleOption: Story = {
  args: {
    options: [{ value: 'unico', label: 'Única opción' }],
  },
};

// Múltiples dropdowns en grupo
export const DateSelector = {
  render: () => {
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [selectedMonth, setSelectedMonth] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number>(2024);

    const dayOptions: DropdownOption<number>[] = Array.from({ length: 31 }, (_, i) => ({
      value: i + 1,
      label: (i + 1).toString(),
    }));

    const formatSelectedDate = () => {
      const months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ];
      return `${selectedDay} de ${months[selectedMonth]} de ${selectedYear}`;
    };

    return (
      <div>
        <h3 style={{ marginTop: 0, color: '#1e40af' }}>Selector de Fecha</h3>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600' }}>Día</label>
            <Dropdown options={dayOptions} selected={selectedDay} onSelected={setSelectedDay} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600' }}>Mes</label>
            <Dropdown options={monthOptions} selected={selectedMonth} onSelected={setSelectedMonth} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600' }}>Año</label>
            <Dropdown options={yearOptions} selected={selectedYear} onSelected={setSelectedYear} />
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: '#f0f9ff',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <strong>Fecha seleccionada:</strong>
          <br />
          <span style={{ fontSize: '18px', color: '#1e40af' }}>{formatSelectedDate()}</span>
        </div>
      </div>
    );
  },
};
