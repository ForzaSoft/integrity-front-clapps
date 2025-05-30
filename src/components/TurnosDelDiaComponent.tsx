import Card from '@/components/Card';
import styled, { css } from 'styled-components';

const Text1 = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 16.59px;
  letter-spacing: 0%;
  color: #4c5260;
`;

const Line = styled.div`
  width: 100%;
  height: 3px;
  background: linear-gradient(90.02deg, #0049a5 16.3%, #0067e9 54.17%, #4d9bff 96.03%);
`;

const NumbersGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15px;
`;

const Number = styled.div<{ $loading: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ $loading }) => {
    if ($loading) {
      return css`
        background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
        background-size: 200% 100%;
        animation: shimmer 3.5s infinite linear;
        border-radius: 4px;
        color: transparent;

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `;
    } else {
      return css`
        color: #4c5260;
      `;
    }
  }}
`;

const NumberText = styled.div<{ $bold: boolean }>`
  font-weight: ${({ $bold }) => ($bold ? '500' : '400')};
  font-size: 36px;
  line-height: 42.66px;
  letter-spacing: 0%;
  margin-bottom: -5px;
`;

const NumberLine = styled.div<{
  $color: string;
}>`
  width: 24px;
  height: 4px;
  background: ${({ $color }) => $color};
`;

const NumberLabel = styled.span`
  padding-top: 15px;

  font-size: 14px;
  line-height: 16.59px;
  letter-spacing: 0%;
`;

export interface TurnosTotalizados {
  total: number;
  sinLlegar: number;
  presentes: number;
  atendidos: number;
}

interface NumberComponentProps {
  value: number;
  label: string;
  bold?: boolean;
  color?: string;
  loading: boolean;
}

const NumberComponent = ({ value, label, bold = false, color = 'transparent', loading }: NumberComponentProps) => (
  <Number $loading={loading}>
    <NumberText $bold={bold}>{value}</NumberText>
    <NumberLine $color={loading ? 'transparent' : color} />
    <NumberLabel>{label}</NumberLabel>
  </Number>
);

const TurnosDelDiaComponent = ({ values }: { values: TurnosTotalizados | undefined }) => {
  const loading = values === undefined;

  return (
    <Card paddingX={20} marginTop={10}>
      <Text1>Turnos del dia</Text1>
      <Line />
      <NumbersGroup>
        <NumberComponent value={values?.total || 0} label={'Total'} loading={loading} bold />
        <NumberComponent value={values?.sinLlegar || 0} label={'Sin llegar'} color={'#B8B8B8'} loading={loading} />
        <NumberComponent value={values?.presentes || 0} label={'Presentes'} color={'#0029FF'} loading={loading} />
        <NumberComponent value={values?.atendidos || 0} label={'Atendidos'} color={'#62B72D'} loading={loading} />
      </NumbersGroup>
    </Card>
  );
};

export default TurnosDelDiaComponent;
