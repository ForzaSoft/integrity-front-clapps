import Navbar from '@/components/Navbar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Side navigation bar with icons for main medical system functions. Includes buttons for new appointment, dashboard, schedules, patients, parameterization and user profile.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '80px' }}>
      <Navbar />
    </div>
  ),
};

export const InMedicalApp: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ width: '80px' }}>
        <Navbar />
      </div>
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h1>INTEGRITY Medical System</h1>
        <p>This is the medical system's side navigation bar.</p>
        <div style={{ marginTop: '2rem' }}>
          <h3>Available functions:</h3>
          <ul>
            <li>New Appointment - Create new medical appointments</li>
            <li>Dashboard - System overview</li>
            <li>Schedules - Medical schedule management</li>
            <li>Patients - Patient administration</li>
            <li>Parameterization - System configuration</li>
            <li>User Profile - Personal settings</li>
            <li>Log out - Sign out</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const DifferentHeights: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
      <div style={{ height: '500px', width: '80px' }}>
        <Navbar />
      </div>
      <div style={{ height: '100vh', width: '80px' }}>
        <Navbar />
      </div>
    </div>
  ),
};

export const WithActiveStates: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '80px' }}>
      <Navbar />
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '100px',
          padding: '1rem',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h4>Medical System Navigation</h4>
        <p>Buttons allow navigation between:</p>
        <ul style={{ fontSize: '14px', lineHeight: '1.4' }}>
          <li>Appointment and schedule management</li>
          <li>Main dashboard</li>
          <li>Active schedules</li>
          <li>Patient database</li>
          <li>System configuration</li>
          <li>Profile and personal settings</li>
        </ul>
      </div>
    </div>
  ),
};

export const InFullLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* Navbar */}
      <div style={{ width: '80px' }}>
        <Navbar />
      </div>

      {/* Header */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: '60px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          INTEGRITY System - Medical Management
        </header>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: '2rem',
            backgroundColor: '#f8f9fa',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              height: '100%',
            }}
          >
            <h2>Main Dashboard</h2>
            <p>Main content of the medical application.</p>
            <div style={{ marginTop: '2rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <h3>Today's Appointments</h3>
                  <p style={{ fontSize: '24px', margin: '0.5rem 0' }}>24</p>
                </div>
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#e8f5e8',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <h3>Patients Seen</h3>
                  <p style={{ fontSize: '24px', margin: '0.5rem 0' }}>18</p>
                </div>
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#fff3e0',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <h3>Waiting</h3>
                  <p style={{ fontSize: '24px', margin: '0.5rem 0' }}>6</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
};
