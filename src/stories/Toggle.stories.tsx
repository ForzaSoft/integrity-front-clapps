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
          'Custom Toggle/Switch component based on HTML checkbox. Includes smooth animations and modern design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Toggle state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
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
        <h4>Interactive Toggle</h4>
        <Toggle checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
        <p style={{ fontSize: '14px', color: '#666' }}>State: {isChecked ? 'Enabled' : 'Disabled'}</p>
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
        <h3 style={{ margin: '0 0 1.5rem 0' }}>Medical System Settings</h3>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Notifications</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>
                Receive general system notifications
              </p>
            </div>
            <Toggle checked={settings.notifications} onChange={() => handleToggle('notifications')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Auto Save</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>Save changes automatically</p>
            </div>
            <Toggle checked={settings.autoSave} onChange={() => handleToggle('autoSave')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Urgent Alerts</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>Notifications for urgent cases</p>
            </div>
            <Toggle checked={settings.urgentAlerts} onChange={() => handleToggle('urgentAlerts')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Email Reminders</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>
                Send appointment reminders via email
              </p>
            </div>
            <Toggle checked={settings.emailReminders} onChange={() => handleToggle('emailReminders')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>SMS Notifications</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#666' }}>Send SMS notifications</p>
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
          <strong>Current Settings:</strong>
          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
            {Object.entries(settings).map(([key, value]) => (
              <li key={key}>
                {key}: {value ? '✅ Enabled' : '❌ Disabled'}
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
        <h4>Disabled</h4>
        <Toggle checked={false} />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>State: OFF</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4>Enabled</h4>
        <Toggle checked={true} />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>State: ON</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4>Disabled OFF</h4>
        <Toggle checked={false} disabled />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>Disabled</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4>Disabled ON</h4>
        <Toggle checked={true} disabled />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>Disabled</p>
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
