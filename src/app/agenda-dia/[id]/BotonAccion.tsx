import Button from '@/components/Button';
import CampanaIcon from '@/icons/CampanaIcon';
import CandadoDesbloqueadoIcon from '@/icons/CandadoDesbloqueadoIcon';
import NuevoTurnoIcon from '@/icons/NuevoTurnoIcon';
import { ButtonsGroup2Props } from './adm/page';
import style from './BotonAccion.module.css';

const BotonAccion = ({ estado }: Pick<ButtonsGroup2Props, 'estado'>) => {
  switch (estado) {
    case 'Vacío':
      return (
        <Button className={style.fixedWidth} variant="secondary" size="sm" shape="round" icon={NuevoTurnoIcon}>
          Asignar
        </Button>
      );
    case 'Bloqueado':
      return (
        <Button className={style.fixedWidth} variant="secondary" size="sm" shape="round" icon={CandadoDesbloqueadoIcon}>
          Habilitar
        </Button>
      );
    default:
      return (
        <Button className={style.fixedWidth} variant="secondary" size="sm" shape="round" icon={CampanaIcon}>
          Recepcionar
        </Button>
      );
  }
};

export default BotonAccion;
