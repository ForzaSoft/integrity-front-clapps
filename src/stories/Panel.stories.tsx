import Button from '@/components/Button';
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
          header="Panel Básico"
          footer={
            <>
              <Button onClick={() => panelRef.current?.close()} variant="success">
                Aceptar
              </Button>
              <Button onClick={() => panelRef.current?.close()} variant="danger">
                Cancelar
              </Button>
            </>
          }
        >
          <p>Este es el contenido del panel básico.</p>
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

export const WithLongContent: Story = {
  render: () => {
    const panelRef = useRef<PanelRef>(null);

    const panelContent = (
      <div style={{ position: 'relative', zIndex: 10000 }}>
        <Panel
          ref={panelRef}
          header="Historial Médico"
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
          Abrir
        </Button>
        {typeof document !== 'undefined' && createPortal(panelContent, document.body)}
      </div>
    );
  },
};
