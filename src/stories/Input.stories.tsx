import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { fn } from 'storybook/test';

import Input from '@/components/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de input que extiende las propiedades nativas de HTML input con variantes de tamaño y estilos personalizados.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variantSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del input',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
      description: 'Tipo de input HTML',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto de placeholder',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado deshabilitado',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Campo requerido',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Ingrese su texto aquí...',
    variantSize: 'md',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Input pequeño',
    variantSize: 'sm',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Input mediano',
    variantSize: 'md',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Input grande',
    variantSize: 'lg',
  },
};

export const SizeComparison = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
          Pequeño (sm)
        </label>
        <Input variantSize="sm" placeholder="Input pequeño" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
          Mediano (md) - Default
        </label>
        <Input variantSize="md" placeholder="Input mediano" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
          Grande (lg)
        </label>
        <Input variantSize="lg" placeholder="Input grande" />
      </div>
    </div>
  ),
};

export const InputTypes = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Texto</label>
        <Input type="text" placeholder="Ingrese texto" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Email</label>
        <Input type="email" placeholder="ejemplo@correo.com" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Contraseña</label>
        <Input type="password" placeholder="••••••••" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Número</label>
        <Input type="number" placeholder="123" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Teléfono</label>
        <Input type="tel" placeholder="+54 11 1234-5678" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Fecha</label>
        <Input type="date" />
      </div>
    </div>
  ),
};

export const InputStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Normal</label>
        <Input placeholder="Input normal" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Con valor</label>
        <Input defaultValue="Texto ingresado" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
          Deshabilitado
        </label>
        <Input placeholder="Input deshabilitado" disabled />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
          Solo lectura
        </label>
        <Input defaultValue="Solo lectura" readOnly />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Requerido</label>
        <Input placeholder="Campo requerido" required />
      </div>
    </div>
  ),
};

export const InteractiveForm = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      age: '',
    });

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ marginTop: 0, color: '#1e40af' }}>Formulario Interactivo</h3>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Nombre completo *
            </label>
            <Input
              type="text"
              placeholder="Ingrese su nombre"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Email *
            </label>
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Teléfono
            </label>
            <Input
              type="tel"
              placeholder="+54 11 1234-5678"
              value={formData.phone}
              onChange={handleInputChange('phone')}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Edad</label>
            <Input
              type="number"
              placeholder="25"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleInputChange('age')}
            />
          </div>
        </form>

        <div
          style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', color: '#475569' }}>Datos del formulario:</h4>
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '12px', color: '#64748b' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const MedicalSystem = {
  render: () => {
    const [patientData, setPatientData] = useState({
      dni: '',
      lastName: '',
      firstName: '',
      birthDate: '',
      phone: '',
      email: '',
      address: '',
      emergencyContact: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPatientData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

    const isFormValid = patientData.dni && patientData.lastName && patientData.firstName && patientData.birthDate;

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3 style={{ marginTop: 0, color: '#1e40af' }}>📋 Registro de Paciente</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>DNI *</label>
            <Input
              type="text"
              placeholder="12345678"
              value={patientData.dni}
              onChange={handleChange('dni')}
              maxLength={8}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Apellido *
            </label>
            <Input
              type="text"
              placeholder="García"
              value={patientData.lastName}
              onChange={handleChange('lastName')}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Nombre *
            </label>
            <Input
              type="text"
              placeholder="Juan"
              value={patientData.firstName}
              onChange={handleChange('firstName')}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Fecha de Nacimiento *
            </label>
            <Input type="date" value={patientData.birthDate} onChange={handleChange('birthDate')} required />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Teléfono
            </label>
            <Input type="tel" placeholder="11 1234-5678" value={patientData.phone} onChange={handleChange('phone')} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Email</label>
            <Input
              type="email"
              placeholder="juan.garcia@email.com"
              value={patientData.email}
              onChange={handleChange('email')}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Dirección
            </label>
            <Input
              type="text"
              placeholder="Av. Corrientes 1234, CABA"
              value={patientData.address}
              onChange={handleChange('address')}
              variantSize="lg"
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Contacto de Emergencia
            </label>
            <Input
              type="tel"
              placeholder="Nombre y teléfono del contacto"
              value={patientData.emergencyContact}
              onChange={handleChange('emergencyContact')}
              variantSize="lg"
            />
          </div>
        </div>

        <div
          style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: isFormValid ? '#dcfce7' : '#fee2e2',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '18px' }}>{isFormValid ? '✅' : '❌'}</span>
          <span
            style={{
              fontWeight: '600',
              color: isFormValid ? '#166534' : '#dc2626',
            }}
          >
            {isFormValid ? 'Formulario válido - Listo para guardar' : 'Complete los campos obligatorios'}
          </span>
        </div>
      </div>
    );
  },
};

export const WithValidation = {
  render: () => {
    const [values, setValues] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });

    const [errors, setErrors] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValues((prev) => ({ ...prev, email: value }));

      if (value && !validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: 'Email inválido' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValues((prev) => ({ ...prev, password: value }));

      if (value && value.length < 6) {
        setErrors((prev) => ({ ...prev, password: 'La contraseña debe tener al menos 6 caracteres' }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValues((prev) => ({ ...prev, confirmPassword: value }));

      if (value && value !== values.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ marginTop: 0, color: '#1e40af' }}>Formulario con Validación</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Email</label>
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              value={values.email}
              onChange={handleEmailChange}
              style={{ borderColor: errors.email ? '#ef4444' : undefined }}
            />
            {errors.email && <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.email}</p>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={values.password}
              onChange={handlePasswordChange}
              style={{ borderColor: errors.password ? '#ef4444' : undefined }}
            />
            {errors.password && (
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.password}</p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
              Confirmar Contraseña
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{ borderColor: errors.confirmPassword ? '#ef4444' : undefined }}
            />
            {errors.confirmPassword && (
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      </div>
    );
  },
};
