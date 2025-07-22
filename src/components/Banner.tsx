import AlertTriangleOutlineIcon from '@/icons/AlertTriangleOutlineIcon';
import CheckIcon from '@/icons/CheckIcon';
import ErrorCircleOutlineIcon from '@/icons/ErrorCircleOutlineIcon';
import InfoCircleIcon from '@/icons/InfoCircleIcon';
import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './Banner.module.css';

interface BannerProps {
  type: 'success' | 'error' | 'warning' | 'info';
  children: ReactNode;
}

const BannerIcon = {
  success: () => <CheckIcon color="#62b72d" />,
  error: () => <ErrorCircleOutlineIcon color="#dc3545" />,
  warning: () => <AlertTriangleOutlineIcon color="#ffc107" />,
  info: () => <InfoCircleIcon color="#6c757d" />,
};

const Banner = ({ type = 'info', children }: BannerProps) => {
  const Icon = BannerIcon[type];

  return (
    <div className={clsx(styles.banner, styles[type])}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span>{children}</span>
    </div>
  );
};

export default Banner;
