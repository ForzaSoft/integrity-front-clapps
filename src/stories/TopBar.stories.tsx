import TopBar from '@/components/TopBar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Top bar of the INTEGRITY medical system. Includes title, current date, notifications, search and main actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Title displayed in the top bar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Medical Dashboard',
  },
};

export const InMedicalLayout: Story = {
  render: (args) => (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopBar {...args} />
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: 'white',
          margin: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2>Main Content</h2>
        <p>This is a demonstration of how the TopBar looks in the complete medical application context.</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <h3>Today's Appointments</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0066cc' }}>24</p>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <h3>Patients Seen</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>18</p>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <h3>Waiting</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>6</p>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <h3>Urgent</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>2</p>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    title: 'INTEGRITY Medical Dashboard',
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopBar
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#0066cc',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              I
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>INTEGRITY Medical System</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Comprehensive Medical Management System</div>
            </div>
          </div>
        }
      />

      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: 'white',
          margin: '1rem',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { title: 'New Appointment', desc: 'Schedule new appointment', color: '#28a745' },
            { title: 'Search Patient', desc: 'Find information', color: '#17a2b8' },
            { title: 'View Schedule', desc: 'Check schedules', color: '#ffc107' },
            { title: 'Notifications', desc: '3 new alerts', color: '#dc3545' },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: item.color,
                  borderRadius: '50%',
                  margin: '0 auto 1rem auto',
                }}
              />
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h4>
              <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Full Screen (Desktop)</h4>
        <div style={{ width: '100%', border: '1px solid #ccc' }}>
          <TopBar title="Medical Dashboard - Desktop View" />
        </div>
      </div>

      <div>
        <h4>Tablet (768px)</h4>
        <div style={{ width: '768px', border: '1px solid #ccc' }}>
          <TopBar title="Dashboard - Tablet" />
        </div>
      </div>
    </div>
  ),
};
