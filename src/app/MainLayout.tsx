'use client';

import NavBar from '@/components/Navbar';
import { ReactNode } from 'react';
import styles from './MainLayout.module.css';

interface Props {
  children: ReactNode;
  leftPanel?: ReactNode;
}

export default function MainLayout({ children, leftPanel }: Props) {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <NavBar />
      </aside>
      {leftPanel}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
