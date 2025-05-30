import { FC } from 'react';
import styles from './ProgresoAgenda.module.css';

interface ProgresoAgendaProps {
  presentes: number;
  atendidos: number;
  sinLlegar: number;
}

const ProgresoAgenda: FC<ProgresoAgendaProps> = ({ presentes, atendidos, sinLlegar }) => (
  <div className={styles.bar} title={`Presentes: ${presentes}\nAtendidos: ${atendidos}\nSin llegar: ${sinLlegar}`}>
    <div className={styles.presentes} style={{ flexGrow: presentes }} />
    <div className={styles.atendidos} style={{ flexGrow: atendidos }} />
    <div className={styles.sinLlegar} style={{ flexGrow: sinLlegar }} />
  </div>
);

export default ProgresoAgenda;
