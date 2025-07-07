import clsx from 'clsx';
import styles from './Timeline.module.css';

export type StepStatus = 'completed' | 'active' | 'pending';

export interface StepData {
  id: string | number;
  title: string;
  subtitle?: string;
  date?: string;
  time?: string;
  status: StepStatus;
  linkText?: string;
  onLinkClick?: () => void;
}

interface TimelineProps {
  steps: StepData[];
  className?: string;
}

const Step = ({ title, subtitle, date, time, status, linkText, onLinkClick }: StepData) => (
  <div className={styles.stepContainer}>
    <div className={styles.stepDateTime}>
      {date && <span className={styles.stepDate}>{date}</span>}
      {time && <span className={styles.stepTime}>{time}</span>}
    </div>
    <div className={styles.stepIndicator}>
      <div className={clsx(styles.stepCircle, styles[status])} />
    </div>
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>{title}</h3>
      {subtitle && <p className={styles.stepSubtitle}>{subtitle}</p>}
      {linkText && onLinkClick && (
        <button className={styles.stepLink} onClick={onLinkClick} type="button">
          {linkText}
        </button>
      )}
    </div>
  </div>
);

const Timeline = ({ steps, className }: TimelineProps) => (
  <div className={clsx(styles.timeline, className)}>
    {steps.map((step) => (
      <Step key={step.id} {...step} />
    ))}
  </div>
);

export default Timeline;
