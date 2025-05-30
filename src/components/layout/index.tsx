import { ReactNode } from 'react';
import styles from './style.module.css';

interface LayoutElementProps {
  children: ReactNode;
}

export const LeftBar = ({ children }: LayoutElementProps) => <div className={styles.leftBar}>{children}</div>;

export const MainContainer = ({ children }: LayoutElementProps) => (
  <div className={styles.mainContainer}>{children}</div>
);

export const SubContent = ({ children }: LayoutElementProps) => <div className={styles.subContent}>{children}</div>;
