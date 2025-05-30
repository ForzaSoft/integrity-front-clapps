import { InputHTMLAttributes } from 'react';
import styles from './Toggle.module.css';

const Toggle = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" {...props} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default Toggle;
