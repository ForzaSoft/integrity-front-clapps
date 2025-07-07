import Button from '@/components/Button';
import Stepper from '@/components/Stepper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de navegación por pasos que muestra el progreso a través de una secuencia de pasos lógicos. Ideal para formularios multi-paso, wizards y procesos guiados.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: 'object',
      description: 'Array de pasos a mostrar',
    },
    currentStep: {
      control: 'number',
      description: 'Índice del paso actual (0-based)',
    },
    onStepClick: {
      action: 'clicked',
      description: 'Función ejecutada al hacer clic en un paso',
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { id: 1, label: 'Datos personales' },
  { id: 2, label: 'Información médica' },
  { id: 3, label: 'Confirmación' },
];

export const Basic: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
  },
};

export const Interactive = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
      { id: 1, label: 'Datos personales' },
      { id: 2, label: 'Obra social' },
      { id: 3, label: 'Turno' },
      { id: 4, label: 'Confirmación' },
    ];

    return (
      <div style={{ maxWidth: '100%' }}>
        <Stepper steps={steps} currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            variant="outline"
          >
            Anterior
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
            variant="primary"
          >
            Siguiente
          </Button>
        </div>

        <div
          style={{
            marginTop: '2rem',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0', color: '#4496ff' }}>{steps[currentStep].label}</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d' }}>
            Paso {currentStep + 1} de {steps.length}
          </p>
        </div>
      </div>
    );
  },
};
