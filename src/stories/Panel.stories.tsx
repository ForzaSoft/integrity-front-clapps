import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Panel, { PanelRef } from '@/components/Panel';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

const meta: Meta<typeof Panel> = {
  title: 'Components/Panel',
  component: Panel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Panel lateral deslizable que se abre desde la derecha. Utiliza useImperativeHandle para controlar su apertura y cierre mediante ref. Incluye header, contenido y footer opcional.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const panelRef = useRef<PanelRef>(null);

    const panelContent = (
      <div style={{ position: 'relative', zIndex: 10000 }}>
        <Panel
          ref={panelRef}
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <h3 style={{ margin: 0 }}>Panel Básico</h3>
              <Button onClick={() => panelRef.current?.close()} variant="flat-inverted" size="sm">
                ✕
              </Button>
            </div>
          }
        >
          <div style={{ padding: '1rem 0' }}>
            <p>Este es el contenido del panel básico.</p>
          </div>
        </Panel>
      </div>
    );

    return (
      <div style={{ padding: '2rem', height: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Panel Básico</h1>
        <Button onClick={() => panelRef.current?.open()} variant="primary">
          Abrir Panel
        </Button>
        {typeof document !== 'undefined' && createPortal(panelContent, document.body)}
      </div>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const panelRef = useRef<PanelRef>(null);

    const panelContent = (
      <div style={{ position: 'relative', zIndex: 10000 }}>
        <Panel
          ref={panelRef}
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <h3 style={{ margin: 0 }}>Configuración</h3>
              <Button onClick={() => panelRef.current?.close()} variant="flat-inverted" size="sm">
                ✕
              </Button>
            </div>
          }
          footer={
            <>
              <Button onClick={() => panelRef.current?.close()} variant="outline">
                Cancelar
              </Button>
              <Button onClick={() => panelRef.current?.close()} variant="primary">
                Guardar
              </Button>
            </>
          }
        >
          <div style={{ padding: '1rem 0' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nombre:</label>
              <Input placeholder="Ingresa tu nombre" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
              <Input placeholder="Ingresa tu email" type="email" />
            </div>
          </div>
        </Panel>
      </div>
    );

    return (
      <div style={{ padding: '2rem', height: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Panel con Footer</h1>
        <Button onClick={() => panelRef.current?.open()} variant="primary">
          Abrir Panel con Footer
        </Button>
        {typeof document !== 'undefined' && createPortal(panelContent, document.body)}
      </div>
    );
  },
};

export const MedicalForm: Story = {
  render: () => {
    const panelRef = useRef<PanelRef>(null);

    const panelContent = (
      <div style={{ position: 'relative', zIndex: 10000 }}>
        <Panel
          ref={panelRef}
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <h3 style={{ margin: 0 }}>Registro de Paciente</h3>
              <Button onClick={() => panelRef.current?.close()} variant="flat-inverted" size="sm">
                ✕
              </Button>
            </div>
          }
          footer={
            <>
              <Button onClick={() => panelRef.current?.close()} variant="outline">
                Cancelar
              </Button>
              <Button onClick={() => panelRef.current?.close()} variant="primary">
                Registrar Paciente
              </Button>
            </>
          }
        >
          <div style={{ padding: '1rem 0' }}>
            <h4>Datos Personales</h4>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Nombre Completo *
                </label>
                <Input placeholder="Ingresa el nombre completo" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>DNI *</label>
                  <Input placeholder="12345678" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Fecha de Nacimiento *
                  </label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Obra Social</label>
                <Input placeholder="Nombre de la obra social" />
              </div>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #e9ecef',
              }}
            >
              <Label>Información Importante</Label>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '14px', color: '#666' }}>
                Los campos marcados con * son obligatorios.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    );

    return (
      <div style={{ padding: '2rem', height: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Sistema Médico INTEGRITY</h1>
        <Button onClick={() => panelRef.current?.open()} variant="primary">
          Nuevo Paciente
        </Button>
        {typeof document !== 'undefined' && createPortal(panelContent, document.body)}
      </div>
    );
  },
};

export const WithLongContent: Story = {
  render: () => {
    const panelRef = useRef<PanelRef>(null);

    const panelContent = (
      <div style={{ position: 'relative', zIndex: 10000 }}>
        <Panel
          ref={panelRef}
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <h3 style={{ margin: 0 }}>Historial Médico</h3>
              <Button onClick={() => panelRef.current?.close()} variant="flat-inverted" size="sm">
                ✕
              </Button>
            </div>
          }
          footer={
            <Button onClick={() => panelRef.current?.close()} variant="primary">
              Cerrar
            </Button>
          }
        >
          <div style={{ padding: '1rem 0' }}>
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  border: '1px solid #e9ecef',
                }}
              >
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0066cc' }}>
                  Consulta #{i + 1} - {new Date(2024, 0, i + 1).toLocaleDateString('es-ES')}
                </h4>
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  <strong>Especialidad:</strong>{' '}
                  {i % 3 === 0 ? 'Cardiología' : i % 3 === 1 ? 'Dermatología' : 'Clínica Médica'}
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  Control rutinario - Sin novedades significativas.
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );

    return (
      <div style={{ padding: '2rem', height: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Panel con Scroll</h1>
        <Button onClick={() => panelRef.current?.open()} variant="primary">
          Abrir Panel con Contenido Largo
        </Button>
        {typeof document !== 'undefined' && createPortal(panelContent, document.body)}
      </div>
    );
  },
};

export const ForTesting: Story = {
  render: () => {
    const panelRef = useRef<PanelRef>(null);

    const panelContent = (
      <div style={{ position: 'relative', zIndex: 10000 }}>
        <Panel
          ref={panelRef}
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span>Test Panel</span>
              <Button onClick={() => panelRef.current?.close()} variant="flat-inverted" size="sm">
                ✕
              </Button>
            </div>
          }
        >
          <div>
            <p>Panel de prueba</p>
            <p>Ancho: 50rem</p>
            <p>Posición: Derecha</p>
          </div>
        </Panel>
      </div>
    );

    return (
      <div style={{ padding: '1rem', height: '100vh', backgroundColor: '#f0f0f0' }}>
        <Button onClick={() => panelRef.current?.open()} variant="primary" size="sm">
          Abrir Panel
        </Button>
        {typeof document !== 'undefined' && createPortal(panelContent, document.body)}
      </div>
    );
  },
};
