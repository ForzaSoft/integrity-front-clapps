import { AgendaListAgendasActivasListAgendasActivasResponseDto } from '@/api/types';
import Button from '@/components/Button';
import AperturaConsultorioIcon from '@/icons/AperturaConsultorioIcon';
import CierreConsultorioIcon from '@/icons/CierreConsultorioIcon';
import InformacionIcon from '@/icons/InformacionIcon';
import MenuContextualIcon from '@/icons/MenuContextualIcon';
import Link from 'next/link';
import { FC } from 'react';
import styles from './Acciones.module.css';

interface AccionesProps {
  agenda: AgendaListAgendasActivasListAgendasActivasResponseDto;
}

const Acciones: FC<AccionesProps> = ({ agenda }) => (
  <div className={styles.container}>
    <Button variant="outline" size="sm" icon={InformacionIcon} />
    <Button variant="outline" size="sm" icon={AperturaConsultorioIcon} />
    <Button variant="outline" size="sm" color="positive" icon={AperturaConsultorioIcon} />
    <Button variant="outline" size="sm" color="negative" icon={CierreConsultorioIcon} />
    <Link href={`/agenda-dia/${agenda.agendaId}/adm`}>
      <Button variant="secondary" size="sm" shape="round" icon={InformacionIcon}>
        Ingresar
      </Button>
    </Link>
    <Button variant="flat" size="sm" icon={MenuContextualIcon}></Button>
  </div>
);

export default Acciones;
