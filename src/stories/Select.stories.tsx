import Select from '@/components/Select';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente Select personalizado que extiende el elemento HTML select nativo. Incluye variantes de tamaño (sm, md, lg) y estilos consistentes con el sistema de diseño.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variantSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del select',
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
    children: (
      <>
        <option value="">Selecciona una opción</option>
        <option value="option1">Opción 1</option>
        <option value="option2">Opción 2</option>
        <option value="option3">Opción 3</option>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    variantSize: 'sm',
    children: (
      <>
        <option value="">Selecciona</option>
        <option value="small1">Pequeño 1</option>
        <option value="small2">Pequeño 2</option>
      </>
    ),
  },
};

export const Medium: Story = {
  args: {
    variantSize: 'md',
    children: (
      <>
        <option value="">Selecciona una opción</option>
        <option value="medium1">Mediano 1</option>
        <option value="medium2">Mediano 2</option>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    variantSize: 'lg',
    children: (
      <>
        <option value="">Selecciona una opción</option>
        <option value="large1">Grande 1</option>
        <option value="large2">Grande 2</option>
      </>
    ),
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
          Small (sm)
        </label>
        <Select variantSize="sm">
          <option value="">Selecciona</option>
          <option value="1">Opción 1</option>
          <option value="2">Opción 2</option>
        </Select>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
          Medium (md) - Default
        </label>
        <Select variantSize="md">
          <option value="">Selecciona una opción</option>
          <option value="1">Opción 1</option>
          <option value="2">Opción 2</option>
        </Select>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
          Large (lg)
        </label>
        <Select variantSize="lg">
          <option value="">Selecciona una opción</option>
          <option value="1">Opción 1</option>
          <option value="2">Opción 2</option>
        </Select>
      </div>
    </div>
  ),
};

export const WithManyOptions: Story = {
  args: {
    variantSize: 'md',
    children: (
      <>
        <option value="">Selecciona un país</option>
        <option value="ar">Argentina</option>
        <option value="br">Brasil</option>
        <option value="cl">Chile</option>
        <option value="co">Colombia</option>
        <option value="ec">Ecuador</option>
        <option value="pe">Perú</option>
        <option value="uy">Uruguay</option>
        <option value="ve">Venezuela</option>
        <option value="mx">México</option>
        <option value="es">España</option>
        <option value="us">Estados Unidos</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <option value="">No disponible</option>
        <option value="option1">Opción 1</option>
        <option value="option2">Opción 2</option>
      </>
    ),
  },
};

export const WithPreselected: Story = {
  args: {
    defaultValue: 'option2',
    children: (
      <>
        <option value="">Selecciona una opción</option>
        <option value="option1">Opción 1</option>
        <option value="option2">Opción 2 (Preseleccionada)</option>
        <option value="option3">Opción 3</option>
      </>
    ),
  },
};

export const MedicalSpecialties: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
        Especialidad Médica
      </label>
      <Select variantSize="md">
        <option value="">Selecciona una especialidad</option>
        <option value="cardiologia">Cardiología</option>
        <option value="dermatologia">Dermatología</option>
        <option value="endocrinologia">Endocrinología</option>
        <option value="gastroenterologia">Gastroenterología</option>
        <option value="ginecologia">Ginecología</option>
        <option value="neurologia">Neurología</option>
        <option value="oftalmologia">Oftalmología</option>
        <option value="pediatria">Pediatría</option>
        <option value="traumatologia">Traumatología</option>
        <option value="urologia">Urología</option>
      </Select>
    </div>
  ),
};

export const MedicalForm: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
      }}
    >
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#333' }}>Registro de Cita Médica</h3>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
            Especialidad *
          </label>
          <Select variantSize="md">
            <option value="">Selecciona una especialidad</option>
            <option value="cardiologia">Cardiología</option>
            <option value="dermatologia">Dermatología</option>
            <option value="clinica">Clínica Médica</option>
            <option value="pediatria">Pediatría</option>
          </Select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
            Médico
          </label>
          <Select variantSize="md">
            <option value="">Selecciona un médico</option>
            <option value="garcia">Dr. García, Juan</option>
            <option value="rodriguez">Dra. Rodríguez, María</option>
            <option value="martinez">Dr. Martínez, Carlos</option>
          </Select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
              Horario
            </label>
            <Select variantSize="sm">
              <option value="">Horario</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
            </Select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
              Duración
            </label>
            <Select variantSize="sm">
              <option value="">Duración</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">60 min</option>
            </Select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
            Tipo de Consulta
          </label>
          <Select variantSize="lg">
            <option value="">Selecciona el tipo de consulta</option>
            <option value="primera">Primera Consulta</option>
            <option value="control">Control</option>
            <option value="urgente">Consulta Urgente</option>
            <option value="seguimiento">Seguimiento</option>
          </Select>
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
        <strong>Nota:</strong> Los campos marcados con * son obligatorios para completar la reserva.
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log('Selected:', event.target.value);
    };

    return (
      <div style={{ width: '300px' }}>
        <h4>Select Interactivo</h4>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '1rem' }}>
          Abre la consola del navegador para ver los valores seleccionados.
        </p>

        <Select variantSize="md" onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
          <option value="opcion4">Opción 4</option>
        </Select>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      <div>
        <h4>Estado Normal</h4>
        <Select variantSize="md">
          <option value="">Selecciona una opción</option>
          <option value="1">Opción 1</option>
          <option value="2">Opción 2</option>
        </Select>
      </div>

      <div>
        <h4>Estado Deshabilitado</h4>
        <Select variantSize="md" disabled>
          <option value="">No disponible</option>
          <option value="1">Opción 1</option>
          <option value="2">Opción 2</option>
        </Select>
      </div>

      <div>
        <h4>Con Valor Preseleccionado</h4>
        <Select variantSize="md" defaultValue="2">
          <option value="">Selecciona una opción</option>
          <option value="1">Opción 1</option>
          <option value="2">Opción 2 (Preseleccionada)</option>
        </Select>
      </div>

      <div>
        <h4>Con Clase Personalizada</h4>
        <Select variantSize="md" className="custom-select" style={{ borderColor: '#28a745' }}>
          <option value="">Selecciona una opción</option>
          <option value="1">Opción 1</option>
          <option value="2">Opción 2</option>
        </Select>
      </div>
    </div>
  ),
};

export const ForTesting: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <Select variantSize="md">
        <option value="">Test Select</option>
        <option value="test1">Test 1</option>
        <option value="test2">Test 2</option>
      </Select>
    </div>
  ),
};
