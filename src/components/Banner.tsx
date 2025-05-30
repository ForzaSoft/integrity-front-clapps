import CheckIcon from '@/icons/CheckIcon';
import InformacionIcon from '@/icons/InformacionIcon';
import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './Banner.module.css';

interface BannerProps {
  type: 'success' | 'error' | 'warning' | 'info';
  children: ReactNode;
}

const BannerIcon = {
  success: () => <CheckIcon color="#62b72d" />,
  error: () => <InformacionIcon color="#ff0000" />,
  warning: () => <InformacionIcon color="#ffee00" />,
  info: () => <InformacionIcon color="#cccccc" />,
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
