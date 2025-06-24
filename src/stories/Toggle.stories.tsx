import Toggle from '@/components/Toggle';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente Toggle/Switch personalizado basado en checkbox HTML. Incluye animaciones suaves y diseño moderno.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Estado del toggle',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado deshabilitado',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <h4>Toggle Interactivo</h4>
        <Toggle checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
        <p style={{ fontSize: '14px', color: '#666' }}>Estado: {isChecked ? 'Activado' : 'Desactivado'}</p>
      </div>
    );
  },
};

export const MedicalSettings: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      autoSave: false,
      urgentAlerts: true,
      emailReminders: false,
      smsNotifications: true,
    });

    const handleToggle = (key: keyof typeof settings) => {
      setSettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    return (
      <div
        style={{
          width: '400px',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
        }}
      >
        <h3 style={{ margin: '0 0 1.5rem 0' }}>Configuraciones del Sistema Médico</h3>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Notificaciones</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>
                Recibir notificaciones generales del sistema
              </p>
            </div>
            <Toggle checked={settings.notifications} onChange={() => handleToggle('notifications')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Guardado Automático</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>
                Guardar cambios automáticamente
              </p>
            </div>
            <Toggle checked={settings.autoSave} onChange={() => handleToggle('autoSave')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Alertas Urgentes</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>
                Notificaciones para casos urgentes
              </p>
            </div>
            <Toggle checked={settings.urgentAlerts} onChange={() => handleToggle('urgentAlerts')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Recordatorios por Email</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>
                Enviar recordatorios de citas por email
              </p>
            </div>
            <Toggle checked={settings.emailReminders} onChange={() => handleToggle('emailReminders')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Notificaciones SMS</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>Enviar notificaciones por SMS</p>
            </div>
            <Toggle checked={settings.smsNotifications} onChange={() => handleToggle('smsNotifications')} />
          </div>
        </div>

        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          <strong>Configuración Actual:</strong>
          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
            {Object.entries(settings).map(([key, value]) => (
              <li key={key}>
                {key}: {value ? '✅ Activado' : '❌ Desactivado'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        padding: '1rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h4>Desactivado</h4>
        <Toggle checked={false} />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>Estado: OFF</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4>Activado</h4>
        <Toggle checked={true} />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>Estado: ON</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4>Deshabilitado OFF</h4>
        <Toggle checked={false} disabled />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>Deshabilitado</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4>Deshabilitado ON</h4>
        <Toggle checked={true} disabled />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>Deshabilitado</p>
      </div>
    </div>
  ),
};

export const ForTesting: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Toggle />
      <Toggle checked />
      <Toggle disabled />
    </div>
  ),
};
