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
          'Step navigation component that shows progress through a logical sequence of steps. Ideal for multi-step forms, wizards and guided processes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: 'object',
      description: 'Array of steps to display',
    },
    currentStep: {
      control: 'number',
      description: 'Current step index (0-based)',
    },
    onStepClick: {
      action: 'clicked',
      description: 'Function executed when clicking on a step',
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { id: 1, label: 'Personal data' },
  { id: 2, label: 'Medical information' },
  { id: 3, label: 'Confirmation' },
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
      { id: 1, label: 'Personal data' },
      { id: 2, label: 'Insurance' },
      { id: 3, label: 'Appointment' },
      { id: 4, label: 'Confirmation' },
    ];

    return (
      <div style={{ maxWidth: '100%' }}>
        <Stepper steps={steps} currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
            variant="primary"
          >
            Next
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
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    );
  },
};
