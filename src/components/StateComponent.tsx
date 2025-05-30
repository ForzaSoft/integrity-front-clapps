import { TurnoEstadoId, TurnoEstadoTipo } from '@/types/api';
import styled from 'styled-components';

interface LabelProps {
  background: string;
  color: string;
  borderColor: string;
}

const State = styled.div<{ $background: string; $color: string; $borderColor: string }>`
  height: 22px;
  width: 85px;
  min-width: 85px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
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
  estadoNombre: string;
}

const StateComponent = ({ idEstado, estadoNombre }: StateComponentProps) => {
  if (!idEstado) {
    return;
  }

  let buttonProps: LabelProps | undefined;

  switch (idEstado) {
    case TurnoEstadoTipo.Cancelado:
      buttonProps = {
        background: '#FFEDED',
        color: '#E10000',
        borderColor: '#FFB5B5',
      };
      break;
    case TurnoEstadoTipo.Atendido:
    case TurnoEstadoTipo.Atendiendo:
    case TurnoEstadoTipo.Controlado:
      buttonProps = {
        background: '#E4F9D7',
        color: '#62B72D',
        borderColor: '#BDE1A7',
      };
      break;
    case TurnoEstadoTipo.Presente:
    case TurnoEstadoTipo.Llamado:
      buttonProps = {
        background: '#DDE1FE',
        color: '#1530BB',
        borderColor: '#A8C6FF',
      };
      break;
    case TurnoEstadoTipo.Confirmado:
      buttonProps = {
        background: '#DFF6FF',
        color: '#46CDFF',
        borderColor: '#46CDFF',
      };
      break;
  }

  if (buttonProps) {
    return (
      <State $background={buttonProps.background} $color={buttonProps.color} $borderColor={buttonProps.borderColor}>
        {estadoNombre}
      </State>
    );
  }
};

export default StateComponent;
