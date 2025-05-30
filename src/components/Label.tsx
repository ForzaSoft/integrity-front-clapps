import React, { FC } from 'react';
import styles from './Label.module.css';

interface LabelProps {
  children: React.ReactNode;
}

const Label: FC<LabelProps> = ({ children }) => <div className={styles.label}>{children}</div>;

export default Label;
