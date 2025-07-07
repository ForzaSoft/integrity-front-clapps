import DocumentViewer, { DocumentItem } from '@/components/DocumentViewer';
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
          'Componente para visualizar documentos con lista de documentos y acciones. Utiliza documentos HTML simulados para evitar problemas de CORS en localhost.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título del visualizador de documentos',
    },
    documents: {
      control: 'object',
      description: 'Lista de documentos a mostrar',
    },
    currentDocumentUrl: {
      control: 'text',
      description: 'URL del documento actual a mostrar en el visualizador',
    },
    onUpload: {
      action: 'upload',
      description: 'Función ejecutada al hacer clic en el botón Subir',
    },
    onSelectDocument: {
      action: 'select',
      description: 'Función ejecutada al hacer clic en un documento para seleccionarlo',
    },
    onViewDocument: {
      action: 'view',
      description: 'Función ejecutada al hacer clic en el botón Ver documento',
    },
    onRefreshDocument: {
      action: 'refresh',
      description: 'Función ejecutada al hacer clic en el botón Refrescar documento',
    },
    onDeleteDocument: {
      action: 'delete',
      description: 'Función ejecutada al hacer clic en el botón Eliminar documento',
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
  ordenMedica: createDocumentPreview(
    'ORDEN MÉDICA',
    'Documento de orden médica para procedimiento ambulatorio. Incluye indicaciones específicas del tratamiento a seguir.',
  ),
  autorizacion: createDocumentPreview(
    'AUTORIZACIÓN DE OBRA SOCIAL',
    'Documento de autorización emitido por la obra social para el tratamiento médico solicitado.',
  ),
  consentimiento: createDocumentPreview(
    'CONSENTIMIENTO INFORMADO',
    'Documento donde el paciente otorga su consentimiento informado para el procedimiento médico a realizar.',
  ),
  resultados: createDocumentPreview(
    'RESULTADOS DE LABORATORIO',
    'Informe completo de los resultados de los estudios de laboratorio realizados al paciente.',
  ),
  historial: createDocumentPreview(
    'HISTORIAL CLÍNICO',
    'Historial médico completo del paciente con antecedentes y evolución clínica.',
  ),
  receta: createDocumentPreview(
    'RECETA MÉDICA',
    'Prescripción médica con medicamentos indicados, dosis y duración del tratamiento.',
  ),
};

const sampleDocuments: DocumentItem[] = [
  {
    id: 1,
    name: 'Orden médica',
    status: 'completed',
    url: DOCUMENT_URLS.ordenMedica,
    selected: true,
  },
  {
    id: 2,
    name: 'Autorización',
    status: 'completed',
    url: DOCUMENT_URLS.autorizacion,
  },
  {
    id: 3,
    name: 'Consentimiento informado',
    status: 'completed',
    url: DOCUMENT_URLS.consentimiento,
  },
];

export const Default: Story = {
  args: {
    documents: sampleDocuments,
    currentDocumentUrl: DOCUMENT_URLS.ordenMedica,
  },
};

export const EmptyDocuments: Story = {
  args: {
    documents: [],
    currentDocumentUrl: undefined,
  },
};

export const PillSelectionDemo: Story = {
  render: () => {
    const [documents, setDocuments] = useState<DocumentItem[]>([
      {
        id: 1,
        name: 'Orden médica',
        status: 'completed',
        url: DOCUMENT_URLS.ordenMedica,
        selected: true,
      },
      {
        id: 2,
        name: 'Autorización obra social',
        status: 'completed',
        url: DOCUMENT_URLS.autorizacion,
        selected: false,
      },
      {
        id: 3,
        name: 'Consentimiento informado',
        status: 'completed',
        url: DOCUMENT_URLS.consentimiento,
        selected: false,
      },
    ]);

    const [currentDocumentUrl, setCurrentDocumentUrl] = useState<string>(DOCUMENT_URLS.ordenMedica);

    const handleSelectDocument = (selectedDocument: DocumentItem) => {
      console.log(`🔄 Seleccionando: ${selectedDocument.name}`);

      const updatedDocuments = documents.map((doc) => ({
        ...doc,
        selected: doc.id === selectedDocument.id,
      }));

      setDocuments(updatedDocuments);
      setCurrentDocumentUrl(selectedDocument.url);
    };

    return (
      <DocumentViewer
        title="Documentos del turno"
        documents={documents}
        currentDocumentUrl={currentDocumentUrl}
        onSelectDocument={handleSelectDocument}
        onUpload={() => alert('Subir documento')}
        onViewDocument={(doc) => alert(`Ver: ${doc.name}`)}
        onRefreshDocument={(doc) => alert(`Refrescar: ${doc.name}`)}
        onDeleteDocument={(doc) => alert(`Eliminar: ${doc.name}`)}
      />
    );
  },
  args: {},
};
