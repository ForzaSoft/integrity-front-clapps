import Card from '@/components/Card';
import BuscarIcon from '@/icons/BuscarIcon';
import NotificacionesIcon from '@/icons/NotificacionesIcon';
import NuevoTurnoIcon from '@/icons/NuevoTurnoIcon';
import styled from 'styled-components';
import Button from '../../../components/Button';

const NextPatientRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Text1 = styled.div`
  font-size: 14px;
  line-height: 16.59px;
  letter-spacing: 0%;
  color: #4c5260;
`;

const Text2 = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 18.96px;
  letter-spacing: 0%;
  color: #4c5260;
`;

const Text2a = styled.span`
  font-size: 14px;
  line-height: 16.59px;
  padding-left: 10px;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const NextPatientComponent = () => {
  return (
    <Card variant="flat">
      <NextPatientRoot>
        <Text1>Próximo paciente:</Text1>
        <Text2>
          Garcia Miguel Angel <Text2a>(09:45)</Text2a>
        </Text2>
        <ButtonGroup>
          <Button icon={NotificacionesIcon} variant="outline" shape="round" />
          <Button icon={BuscarIcon} variant="outline" shape="round" />
          <Button icon={NuevoTurnoIcon} shape="round">
            Llamar
          </Button>
        </ButtonGroup>
      </NextPatientRoot>
    </Card>
  );
};

export default NextPatientComponent;
