import { FC } from 'react';
import styles from './Demora.module.css';

interface DemoraProps {
  value: number;
}

const Demora: FC<DemoraProps> = ({ value }) => (
  <div className={styles.content}>
    <div className={styles.label}>Agenda con demora:</div>
    <div className={styles.value}>{`${value} minutos`}</div>
  </div>
);

export default Demora;
