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
          'Sliding side panel that opens from the right. Uses useImperativeHandle to control opening and closing via ref. Includes header, content and optional footer.',
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
          header="Basic Panel"
          footer={
            <>
              <Button onClick={() => panelRef.current?.close()} variant="success">
                Accept
              </Button>
              <Button onClick={() => panelRef.current?.close()} variant="danger">
                Cancel
              </Button>
            </>
          }
        >
          <p>This is the basic panel content.</p>
        </Panel>
      </div>
    );

    return (
      <div style={{ padding: '2rem', height: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Basic Panel</h1>
        <Button onClick={() => panelRef.current?.open()} variant="primary">
          Open Panel
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
          header="Medical History"
          footer={
            <Button onClick={() => panelRef.current?.close()} variant="primary">
              Close
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
                  Appointment #{i + 1} - {new Date(2024, 0, i + 1).toLocaleDateString('en-US')}
                </h4>
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  <strong>Specialty:</strong>{' '}
                  {i % 3 === 0 ? 'Cardiology' : i % 3 === 1 ? 'Dermatology' : 'General Medicine'}
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  Routine checkup - No significant findings.
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );

    return (
      <div style={{ padding: '2rem', height: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Panel with Scroll</h1>
        <Button onClick={() => panelRef.current?.open()} variant="primary">
          Open
        </Button>
        {typeof document !== 'undefined' && createPortal(panelContent, document.body)}
      </div>
    );
  },
};
