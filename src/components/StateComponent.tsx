import { TurnoEstadoId, TurnoEstadoTipo } from '@/types/api';
import styled from 'styled-components';

interface LabelProps {
  background: string;
  color: string;
  borderColor: string;
}

const State = styled.div<{ $background: string; $color: string; $borderColor: string }>`
  height: 22.35px;
  min-height: 22.35px;
  max-height: 22.35px;
  width: 85.35px;
  min-width: 85.35px;
  max-width: 85.35px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: normal;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $borderColor }) => $borderColor};
`;

interface StateComponentProps {
  idEstado: TurnoEstadoId;
  // estadoNombre: string;
}

const StateComponent = ({ idEstado }: StateComponentProps) => {
  if (!idEstado) {
    return;
  }

  let buttonProps: LabelProps | undefined;
  let label = '';

  // Vacio: 0,
  // Cancelado: 1,
  // Atendido: 2,
  // Atendiendo: 3,
  // Presente: 4,
  // Confirmado: 5,
  // Controlado: 6,
  // Llamado: 7,
  // Bloqueado: 8,
  // Asignado: 9,

  switch (idEstado) {
    case TurnoEstadoTipo.Cancelado:
      buttonProps = {
        background: '#FFEDED',
        color: '#E10000',
        borderColor: '#FFB5B5',
      };
      label = 'Cancelado';
      break;
    case TurnoEstadoTipo.Atendido:
      buttonProps = {
        background: '#E4F9D7',
        color: '#62B72D',
        borderColor: '#BDE1A7',
      };
      label = 'Atendido';
      break;
    case TurnoEstadoTipo.Atendiendo:
      buttonProps = {
        background: '#E4F9D7',
        color: '#62B72D',
        borderColor: '#BDE1A7',
      };
      label = 'Atendiendo';
      break;
    case TurnoEstadoTipo.Controlado:
      buttonProps = {
        background: '#E4F9D7',
        color: '#62B72D',
        borderColor: '#BDE1A7',
      };
      label = 'Controlado';
      break;
    case TurnoEstadoTipo.Presente:
      buttonProps = {
        background: '#E4F9D7',
        color: '#62B72D',
        borderColor: '#BDE1A7',
      };
      label = 'Presente';
      break;
    case TurnoEstadoTipo.Llamado:
      buttonProps = {
        background: '#DDE1FE',
        color: '#1530BB',
        borderColor: '#A8C6FF',
      };
      label = 'Llamado';
      break;
    case TurnoEstadoTipo.Confirmado:
      buttonProps = {
        background: '#DFF6FF',
        color: '#46CDFF',
        borderColor: '#46CDFF',
      };
      label = 'Confirmado';
      break;
    case TurnoEstadoTipo.Bloqueado:
      buttonProps = {
        background: '#FFEDED',
        color: '#E10000',
        borderColor: '#FFB5B5',
      };
      label = 'Bloqueado';
      break;
    case TurnoEstadoTipo.Asignado:
      buttonProps = {
        background: '#DDE1FE',
        color: '#1530BB',
        borderColor: '#A8C6FF',
      };
      label = 'Asignado';
      break;
    default:
      buttonProps = {
        background: '#DFF6FF',
        color: '#46CDFF',
        borderColor: '#46CDFF',
      };
      label = 'Vacio';
      break;
  }

  if (buttonProps) {
    return (
      <State $background={buttonProps.background} $color={buttonProps.color} $borderColor={buttonProps.borderColor}>
        {label}
      </State>
    );
  }
};

export default StateComponent;
