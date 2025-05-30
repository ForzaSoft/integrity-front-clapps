import Button from '@/components/Button';
import AgendaIcon from '@/icons/AgendaIcon';
import BuscarIcon from '@/icons/BuscarIcon';
import NotificacionesIcon from '@/icons/NotificacionesIcon';
import NuevoTurnoIcon from '@/icons/NuevoTurnoIcon';
import { currentDateString } from '@/utils';
import Link from 'next/link';
import { FC, ReactNode, useMemo } from 'react';
import styles from './TopBar.module.css';

interface TopBarProps {
  title: ReactNode;
}

const TopBar: FC<TopBarProps> = ({ title }) => {
  const today = useMemo(() => currentDateString(), []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.controls}>
        <div className={styles.today}>{today}</div>
        <Button variant="outline" shape="round" icon={NotificacionesIcon} />
        <Button variant="outline" shape="round" icon={BuscarIcon} />
        <Link href="/agenda-dia/1/adm?mocked=true">
          <Button variant="outline" shape="round" icon={AgendaIcon}>
            Ir a agenda
          </Button>
        </Link>
        <Button variant="primary" shape="round" icon={NuevoTurnoIcon}>
          Nuevo turno
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
