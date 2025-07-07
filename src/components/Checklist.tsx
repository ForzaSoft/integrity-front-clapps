import CheckCircleIcon from '@/icons/CheckCircleIcon';
import ErrorCircleIcon from '@/icons/ErrorCircleIcon';
import clsx from 'clsx';
import styles from './Checklist.module.css';

export type ChecklistItemStatus = 'completed' | 'error';

export interface ChecklistItem {
  id: string | number;
  text: string;
  status: ChecklistItemStatus;
}

interface ChecklistProps {
  title: string;
  items: ChecklistItem[];
  className?: string;
}

const ChecklistItemComponent = ({ text, status }: ChecklistItem) => {
  const Icon = status === 'completed' ? CheckCircleIcon : ErrorCircleIcon;
  const iconColor = status === 'completed' ? '#62b72d' : '#e10000';

  return (
    <div className={clsx(styles.checklistItem, styles[status])}>
      <div className={styles.checklistIcon}>
        <Icon color={iconColor} size={16} />
      </div>
      <span className={styles.checklistText}>{text}</span>
    </div>
  );
};

const Checklist = ({ title, items, className }: ChecklistProps) => {
  const isCompleted = items.length > 0 && items.every((item) => item.status === 'completed');

  return (
    <div className={clsx(styles.checklist, { [styles.completed]: isCompleted }, className)}>
      <h3 className={styles.checklistTitle}>{title}</h3>
      <div className={styles.checklistItems}>
        {items.map((item) => (
          <ChecklistItemComponent key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Checklist;
