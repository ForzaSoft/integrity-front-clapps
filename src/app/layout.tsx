import StyledComponentsRegistry from '@/lib/registry';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import React from 'react';
import './globals.css';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '600', '500', '700'],
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'Integrity',
  description: 'Integrity by Forza',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
