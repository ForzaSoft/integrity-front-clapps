import { FC } from 'react';
import styles from './Caja.module.css';

interface CajaProps {
  titulo?: string;
  children: React.ReactNode;
}

const Caja: FC<CajaProps> = ({ titulo, children }) => (
  <div className={styles.caja}>
    {titulo ? <div className={styles.header}>{titulo}</div> : null}
    {children}
  </div>
);

export default Caja;
