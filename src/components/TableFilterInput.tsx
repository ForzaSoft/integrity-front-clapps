import BuscarIcon from '@/icons/BuscarIcon';
import VisualizarIcon from '@/icons/VisualizarIcon';
import styles from './TableFilterInput.module.css';

interface TableFilterInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TableFilterInput = ({ value, onChange }: TableFilterInputProps) => {
  return (
    <div className={styles.filter}>
      <BuscarIcon color="white" size={24} />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      <div className={styles.settings}>
        <VisualizarIcon color="white" size={24} />
        <span>▼</span>
      </div>
    </div>
  );
};

export default TableFilterInput;
