import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal, { ModalRef } from '../components/Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Hook personalizado para manejar el modal en stories
const ModalWithButton = ({
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

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={handleOpen}>Abrir Modal</Button>
      <Modal ref={modalRef} title={title} className={className}>
        <div>
          {children}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose}>Cerrar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Basic: Story = {
  render: () => (
    <ModalWithButton title="Modal Básico">
      <p>Este es el contenido básico del modal.</p>
    </ModalWithButton>
  ),
};

export const WithForm: Story = {
  render: () => (
    <ModalWithButton title="Formulario de Paciente">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input placeholder="Nombre completo" />
        <Input placeholder="DNI" />
        <Input placeholder="Teléfono" />
        <Input placeholder="Email" />
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Complete todos los campos requeridos para registrar al paciente.
        </p>
      </div>
    </ModalWithButton>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <ModalWithButton title="Confirmar Acción">
      <div>
        <p>¿Está seguro que desea cancelar este turno?</p>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>Esta acción no se puede deshacer.</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <Button>Cancelar</Button>
          <Button style={{ backgroundColor: '#ef4444', borderColor: '#ef4444' }}>Confirmar</Button>
        </div>
      </div>
    </ModalWithButton>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalWithButton title="Información Detallada">
      <div>
        <h3>Historia Clínica del Paciente</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h4>Antecedentes</h4>
        <ul>
          <li>Hipertensión arterial</li>
          <li>Diabetes tipo 2</li>
          <li>Alergia a penicilina</li>
        </ul>
        <h4>Medicación Actual</h4>
        <ul>
          <li>Enalapril 10mg - 1 vez al día</li>
          <li>Metformina 850mg - 2 veces al día</li>
          <li>Aspirina 100mg - 1 vez al día</li>
        </ul>
      </div>
    </ModalWithButton>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <ModalWithButton title="Modal Personalizado" className="custom-modal-width">
      <div>
        <p>Este modal tiene un ancho personalizado aplicado via className.</p>
        <style>{`
          .custom-modal-width {
            width: 40rem !important;
          }
        `}</style>
      </div>
    </ModalWithButton>
  ),
};

export const AppointmentDetails: Story = {
  render: () => (
    <ModalWithButton title="Detalles del Turno">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <strong>Paciente:</strong>
            <p>María González</p>
          </div>
          <div>
            <strong>DNI:</strong>
            <p>12.345.678</p>
          </div>
          <div>
            <strong>Especialidad:</strong>
            <p>Cardiología</p>
          </div>
          <div>
            <strong>Médico:</strong>
            <p>Dr. Juan Pérez</p>
          </div>
          <div>
            <strong>Fecha:</strong>
            <p>15/03/2024</p>
          </div>
          <div>
            <strong>Hora:</strong>
            <p>14:30</p>
          </div>
        </div>
        <div>
          <strong>Observaciones:</strong>
          <p style={{ backgroundColor: '#f5f5f5', padding: '0.75rem', borderRadius: '0.25rem', margin: '0.5rem 0' }}>
            Control de rutina. Traer estudios recientes.
          </p>
        </div>
      </div>
    </ModalWithButton>
  ),
};

export const MultipleActions: Story = {
  render: () => (
    <ModalWithButton title="Gestión de Usuario">
      <div>
        <p>
          <strong>Usuario:</strong> admin@hospital.com
        </p>
        <p>
          <strong>Rol:</strong> Administrador
        </p>
        <p>
          <strong>Estado:</strong> Activo
        </p>

        <div
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button size="sm">Editar</Button>
          <Button size="sm" style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b' }}>
            Suspender
          </Button>
          <Button size="sm" style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}>
            Reactivar
          </Button>
          <Button size="sm" style={{ backgroundColor: '#ef4444', borderColor: '#ef4444' }}>
            Eliminar
          </Button>
        </div>
      </div>
    </ModalWithButton>
  ),
};

export const SimpleMessage: Story = {
  render: () => (
    <ModalWithButton title="Información">
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Operación completada exitosamente</p>
        <p style={{ color: '#666', fontSize: '0.875rem' }}>Los cambios han sido guardados correctamente.</p>
      </div>
    </ModalWithButton>
  ),
};

export const ErrorMessage: Story = {
  render: () => (
    <ModalWithButton title="Error">
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
        <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: '#ef4444' }}>Error al procesar la solicitud</p>
        <p style={{ color: '#666', fontSize: '0.875rem' }}>
          No se pudo conectar con el servidor. Intente nuevamente más tarde.
        </p>
        <p
          style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            marginTop: '1rem',
            fontFamily: 'monospace',
          }}
        >
          Error 500: Internal Server Error
        </p>
      </div>
    </ModalWithButton>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <ModalWithButton title="Procesando...">
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div
          style={{
            display: 'inline-block',
            width: '2rem',
            height: '2rem',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem',
          }}
        ></div>
        <p>Guardando información del paciente...</p>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>Por favor, no cierre esta ventana.</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </ModalWithButton>
  ),
};
