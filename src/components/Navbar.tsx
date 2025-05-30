import AgendaIcon from '@/icons/AgendaIcon';
import DashboardIcon from '@/icons/DashboardIcon';
import NuevoTurnoIcon from '@/icons/NuevoTurnoIcon';
import PacientesIcon from '@/icons/PacientesIcon';
import ParametrizacionIcon from '@/icons/ParametrizacionIcon';
import PerfilUsuarioIcon from '@/icons/PerfilUsuarioIcon';
import Link from 'next/link';
import Button from './Button';
import styles from './Navbar.module.css';

const NavBar = () => (
  <nav className={styles.container}>
    <div className={styles.buttonGroup}>
      <Button icon={NuevoTurnoIcon} variant="flat-inverted" size="lg" />
      <Button icon={DashboardIcon} variant="flat-inverted" size="lg" />
      <Link href="/agendas-activas">
        <Button icon={AgendaIcon} variant="flat-inverted" size="lg" />
      </Link>
      <Button icon={PacientesIcon} variant="flat-inverted" size="lg" />
      <Link href="/configuraciones/nomencladores">
        <Button icon={ParametrizacionIcon} variant="flat-inverted" size="lg" />
      </Link>
    </div>
    <div className={styles.buttonGroup}>
      <Button icon={PerfilUsuarioIcon} variant="flat-inverted" size="lg" />
      <Button variant="flat-inverted">Log out</Button>
    </div>
  </nav>
);

export default NavBar;
