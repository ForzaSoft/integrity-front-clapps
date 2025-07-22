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
        component: 'Componente de modal para mostrar contenido emergente.',
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
          <Button onClick={handleClose}>Cerrar</Button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={handleOpen}>Abrir Modal</Button>
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </div>
  );
};

export const Basic = {
  render: () => (
    <ModalWrapper title="Modal Básico">
      <p>Este es el contenido básico del modal.</p>
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
      <Modal ref={modalRef} title="Confirmar Acción">
        <div>
          <p>¿Está seguro que desea cancelar este turno?</p>
          <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>Esta acción no se puede deshacer.</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button variant="success" onClick={handleClose}>
              Confirmar
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    );

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={handleOpen}>Abrir Modal</Button>
        {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
      </div>
    );
  },
};
