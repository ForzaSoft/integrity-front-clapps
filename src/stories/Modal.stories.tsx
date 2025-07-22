import type { Meta } from '@storybook/nextjs-vite';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from '../components/Button';
import Modal, { ModalRef } from '../components/Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Title of the modal',
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal component for displaying popup content.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

const ModalWrapper = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const modalRef = useRef<ModalRef>(null);

  const handleOpen = () => {
    modalRef.current?.open();
  };

  const handleClose = () => {
    modalRef.current?.close();
  };

  const modalContent = (
    <Modal ref={modalRef} title={title} className={className}>
      <div>
        {children}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={handleOpen}>Open Modal</Button>
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </div>
  );
};

export const Basic = {
  render: () => (
    <ModalWrapper title="Basic Modal">
      <p>This is the basic modal content.</p>
    </ModalWrapper>
  ),
};

export const Confirmation = {
  render: () => {
    const modalRef = useRef<ModalRef>(null);

    const handleOpen = () => {
      modalRef.current?.open();
    };

    const handleClose = () => {
      modalRef.current?.close();
    };

    const modalContent = (
      <Modal ref={modalRef} title="Turnos del paciente">
        <div>
          <p style={{ fontSize: '14px', color: '#666' }}>No se encontró un paciente con los datos ingresados</p>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '0.5rem' }}>
            Numero de documento: <b>41938992</b>
          </p>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '0.5rem' }}>
            ¿Desea buscar nuevamente o dar de alta un nuevo paciente?
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button variant="info" appearance="outline" onClick={handleClose}>
              Buscar Nuevamente
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Crear
            </Button>
          </div>
        </div>
      </Modal>
    );

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={handleOpen}>Open Modal</Button>
        {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
      </div>
    );
  },
};
