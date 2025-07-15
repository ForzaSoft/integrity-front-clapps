import DocumentViewer, { DocumentSection, DocumentType } from '@/components/DocumentViewer';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta: Meta<typeof DocumentViewer> = {
  title: 'Components/DocumentViewer',
  component: DocumentViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente para visualizar documentos con 3 secciones fijas predefinidas: Orden médica, Autorización y Consentimiento informado. Cada sección puede estar en estado pendiente, subiendo o completada.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título del visualizador de documentos',
    },
    sections: {
      control: 'object',
      description: 'Lista de las 3 secciones de documentos fijas',
    },
    currentDocumentUrl: {
      control: 'text',
      description: 'URL del documento actual a mostrar en el visualizador',
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carga del documento actual',
    },
    onUpload: {
      action: 'upload',
      description: 'Función ejecutada para subir un nuevo archivo PDF a una sección específica',
    },
    onSelectSection: {
      action: 'select',
      description: 'Función ejecutada al hacer clic en una sección para seleccionarla',
    },
    onViewSection: {
      action: 'view',
      description: 'Función ejecutada al hacer clic en el botón Ver documento',
    },
    onDeleteSection: {
      action: 'delete',
      description: 'Función ejecutada al hacer clic en el botón Eliminar documento',
    },
    onSectionUpdated: {
      action: 'sectionUpdated',
      description: 'Función ejecutada cuando se actualiza una sección',
    },
    onCurrentDocumentChange: {
      action: 'currentDocumentChange',
      description: 'Función ejecutada cuando se actualiza el documento actual en el visor',
    },
    className: {
      control: 'text',
      description: 'Clase CSS adicional',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const createDocumentPreview = (title: string, content: string) => {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 40px;
      background: #ffffff;
      margin: 0;
      line-height: 1.6;
      color: #333;
    }
    .document-header {
      text-align: center;
      border-bottom: 3px solid #007bff;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .document-title {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      margin: 0;
    }
    .document-subtitle {
      font-size: 16px;
      color: #666;
      margin: 10px 0 0 0;
    }
    .document-content {
      font-size: 14px;
      margin: 20px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }
    .document-footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
      font-size: 12px;
      color: #6c757d;
      text-align: center;
    }
    .stamp {
      display: inline-block;
      padding: 10px 20px;
      border: 2px solid #28a745;
      color: #28a745;
      font-weight: bold;
      transform: rotate(-5deg);
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="document-header">
    <h1 class="document-title">${title}</h1>
    <p class="document-subtitle">Sistema INTEGRITY - Documentos Médicos</p>
  </div>
  
  <div class="document-content">
    <p><strong>Descripción:</strong> ${content}</p>
    <p><strong>Fecha de generación:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
    <p><strong>Estado:</strong> <span class="stamp">COMPLETADO</span></p>
    <p><strong>Observaciones:</strong> Este es un documento de ejemplo generado para la demostración del componente DocumentViewer en Storybook.</p>
  </div>
  
  <div class="document-content">
    <h3>Información del Sistema</h3>
    <p>Este documento ha sido generado automáticamente por el sistema INTEGRITY para propósitos de demostración.</p>
    <p>En un entorno real, aquí se mostraría el contenido real del documento médico correspondiente.</p>
  </div>
  
  <div class="document-footer">
    <p>© 2024 Sistema INTEGRITY - Gestión de Documentos Médicos</p>
    <p>Este es un documento de ejemplo generado para Storybook</p>
  </div>
</body>
</html>`;

  return `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
};

const DOCUMENT_URLS = {
  'orden-medica': createDocumentPreview(
    'ORDEN MÉDICA',
    'Documento de orden médica para procedimiento ambulatorio. Incluye indicaciones específicas del tratamiento a seguir.',
  ),
  autorizacion: createDocumentPreview(
    'AUTORIZACIÓN DE OBRA SOCIAL',
    'Documento de autorización emitido por la obra social para el tratamiento médico solicitado.',
  ),
  'consentimiento-informado': createDocumentPreview(
    'CONSENTIMIENTO INFORMADO',
    'Documento donde el paciente otorga su consentimiento informado para el procedimiento médico a realizar.',
  ),
};

const createInitialSections = (): DocumentSection[] => [
  {
    id: 'orden-medica',
    name: 'Orden médica',
    status: 'completed',
    url: DOCUMENT_URLS['orden-medica'],
    selected: true,
  },
  {
    id: 'autorizacion',
    name: 'Autorización',
    status: 'pending',
  },
  {
    id: 'consentimiento-informado',
    name: 'Consentimiento informado',
    status: 'pending',
  },
];

export const Default: Story = {
  args: {
    title: 'Documentos del turno',
    sections: [
      {
        id: 'orden-medica',
        name: 'Orden médica',
        status: 'completed',
        url: DOCUMENT_URLS['orden-medica'],
        selected: true,
      },
      {
        id: 'autorizacion',
        name: 'Autorización',
        status: 'pending',
      },
      {
        id: 'consentimiento-informado',
        name: 'Consentimiento informado',
        status: 'pending',
      },
    ],
    currentDocumentUrl: DOCUMENT_URLS['orden-medica'],
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Versión básica del componente controlada por los controles de Storybook. Permite modificar todas las props desde el panel de controles para ver cómo afectan al componente.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [sections, setSections] = useState<DocumentSection[]>(createInitialSections());
    const [currentDocumentUrl, setCurrentDocumentUrl] = useState<string>(DOCUMENT_URLS['orden-medica']);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = async (file: File, sectionId: DocumentType): Promise<DocumentSection> => {
      console.log(`📄 Subiendo archivo: ${file.name} a sección: ${sectionId}`);

      const sectionToUpdate = sections.find((s) => s.id === sectionId);
      if (!sectionToUpdate) throw new Error('Sección no encontrada');

      const uploadingSection: DocumentSection = {
        ...sectionToUpdate,
        status: 'uploading',
      };

      setSections((prev) => prev.map((section) => (section.id === sectionId ? uploadingSection : section)));

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const completedSection: DocumentSection = {
        ...uploadingSection,
        status: 'completed',
        url: DOCUMENT_URLS[sectionId],
      };

      setSections((prev) => prev.map((section) => (section.id === sectionId ? completedSection : section)));

      return completedSection;
    };

    const handleSelectSection = (selectedSection: DocumentSection) => {
      if (selectedSection.status === 'uploading') return;

      console.log(`🔄 Seleccionando sección: ${selectedSection.name}`);

      const updatedSections = sections.map((section) => ({
        ...section,
        selected: section.id === selectedSection.id,
      }));

      setSections(updatedSections);

      if (selectedSection.url) {
        setCurrentDocumentUrl(selectedSection.url);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
      } else {
        setCurrentDocumentUrl('');
      }
    };

    const handleDeleteSection = (sectionToDelete: DocumentSection) => {
      console.log(`🗑️ Eliminando documento de: ${sectionToDelete.name}`);

      const resetSection: DocumentSection = {
        ...sectionToDelete,
        status: 'pending',
        url: undefined,
      };

      setSections((prev) => prev.map((section) => (section.id === sectionToDelete.id ? resetSection : section)));

      if (sectionToDelete.selected) {
        setCurrentDocumentUrl('');
      }
    };

    return (
      <DocumentViewer
        title="Documentos del turno"
        sections={sections}
        currentDocumentUrl={currentDocumentUrl}
        isLoading={isLoading}
        onUpload={handleUpload}
        onSelectSection={handleSelectSection}
        onViewSection={(section) => alert(`Ver: ${section.name}`)}
        onDeleteSection={handleDeleteSection}
        onSectionUpdated={(section) => console.log(`📄 Sección actualizada: ${section.name}`)}
        onCurrentDocumentChange={(url) => {
          console.log('📄 Actualizando documento actual:', url);
          setCurrentDocumentUrl(url);
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Componente completamente interactivo que demuestra todas las funcionalidades: subida de archivos PDF, estados de carga, selección, eliminación y reemplazo de documentos. Las 3 secciones son fijas: Orden médica, Autorización y Consentimiento informado. Funcionalidades destacadas: bloqueo de selección durante subida, botones condicionalmente habilitados según estado del documento, feedback visual mejorado con spinners de carga, y tooltips informativos.',
      },
    },
  },
};
