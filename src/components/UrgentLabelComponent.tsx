import UrgenteIcon from '@/icons/UrgenteIcon';

interface UrgentLabelProps {
  urgente: boolean;
}

const UrgentLabelComponent = ({ urgente }: UrgentLabelProps) => {
  return urgente ? <UrgenteIcon color="#e10000" /> : <></>;
};

export default UrgentLabelComponent;
