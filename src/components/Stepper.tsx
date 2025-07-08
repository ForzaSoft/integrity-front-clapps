import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Stepper.module.css';

export interface Step {
  id: string | number;
  label: string;
}

export interface StepperProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Array de pasos a mostrar
   */
  steps: Step[];
  /**
   * Paso actual (0-based)
   */
  currentStep: number;
  /**
   * Callback cuando se hace clic en un paso
   */
  onStepClick?: (stepIndex: number) => void;
}

const Stepper = ({ steps, currentStep, onStepClick, className, ...rest }: StepperProps) => {
  return (
    <div className={clsx(styles.stepper, className)} {...rest}>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div
              key={step.id}
              className={clsx(styles.step, {
                [styles.completed]: isCompleted,
                [styles.active]: isActive,
              })}
              onClick={() => onStepClick?.(index)}
            >
              <div className={styles.stepCircle}>{index + 1}</div>
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.linesContainer}>
        {steps.slice(0, -1).map((_, index) => (
          <div key={index} className={styles.line} />
        ))}
      </div>
    </div>
  );
};

export default Stepper;
