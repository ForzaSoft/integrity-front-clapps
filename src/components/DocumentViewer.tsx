import CheckCircleIcon from '@/icons/CheckCircleIcon';
import CloseBoxIcon from '@/icons/CloseBoxIcon';
import DocumentBoxIcon from '@/icons/DocumentBoxIcon';
import ErrorCircleIcon from '@/icons/ErrorCircleIcon';
import InformacionIcon from '@/icons/InformacionIcon';
import RefrescarIcon from '@/icons/RefrescarIcon';
import SubirIcon from '@/icons/SubirIcon';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import Button from './Button';
import styles from './DocumentViewer.module.css';

export type DocumentStatus = 'pending' | 'completed' | 'uploading';

export type DocumentType = 'orden-medica' | 'autorizacion' | 'consentimiento-informado';

export interface DocumentSection {
  id: DocumentType;
  name: string;
  status: DocumentStatus;
  url?: string;
  selected?: boolean;
}

interface DocumentViewerProps {
  title?: string;
  sections: DocumentSection[];
  currentDocumentUrl?: string;
  isLoading?: boolean;
  onUpload?: (file: File, sectionId: DocumentType) => Promise<DocumentSection> | DocumentSection;
  onSelectSection?: (section: DocumentSection) => void;
  onViewSection?: (section: DocumentSection) => void;
  onDeleteSection?: (section: DocumentSection) => void;
  onSectionUpdated?: (section: DocumentSection) => void;
  onCurrentDocumentChange?: (url: string) => void;
  className?: string;
}

const DocumentHeader = ({
  title,
  sections,
  selectedSection,
  onUpload,
  isUploading,
}: {
  title: string;
  sections: DocumentSection[];
  selectedSection?: DocumentSection;
  onUpload?: () => void;
  isUploading?: boolean;
}) => {
  const completedSections = sections.filter((section) => section.status === 'completed');
  const allCompleted = completedSections.length === 3;

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        {allCompleted ? <CheckCircleIcon size={20} color="#28a745" /> : <ErrorCircleIcon size={20} color="#ff0000" />}
        <h2 className={clsx(styles.headerTitle, allCompleted && styles.headerTitleCompleted)}>{title}</h2>
      </div>
      {selectedSection && selectedSection.status === 'pending' && (
        <Button
          variant="info"
          appearance="outline"
          size="sm"
          shape="round"
          icon={SubirIcon}
          onClick={onUpload}
          disabled={isUploading}
        >
          {isUploading ? 'Subiendo...' : 'Subir'}
        </Button>
      )}
    </div>
  );
};

const PDFViewer = ({
  url,
  isLoading,
  selectedSection,
  isUploading,
  uploadingSection,
  sections,
}: {
  url?: string;
  isLoading?: boolean;
  selectedSection?: DocumentSection;
  isUploading?: boolean;
  uploadingSection?: DocumentType | null;
  sections?: DocumentSection[];
}) => {
  const [internalLoading, setInternalLoading] = useState(false);

  const getPDFUrlWithControls = (pdfUrl: string) => {
    const separator = pdfUrl.includes('#') ? '&' : '#';
    const controls = ['toolbar=1', 'navpanes=1', 'scrollbar=1', 'page=1', 'zoom=FitH', 'view=Fit'].join('&');
    return `${pdfUrl}${separator}${controls}`;
  };

  const showLoading = isLoading || internalLoading;

  const getEmptyStateMessage = () => {
    if (isUploading && uploadingSection) {
      const uploadingSectionName = sections?.find((s) => s.id === uploadingSection)?.name || 'documento';
      return {
        title: 'Subiendo archivo...',
        subtitle: `Se está subiendo el documento para "${uploadingSectionName}"`,
      };
    }

    if (!selectedSection) {
      return {
        title: 'No hay documento seleccionado',
        subtitle: 'Selecciona una sección de la lista para visualizar su documento',
      };
    }

    if (selectedSection.status === 'pending') {
      return {
        title: 'Documento pendiente',
        subtitle: `Sube un PDF para la sección "${selectedSection.name}"`,
      };
    }

    return {
      title: 'No hay documento seleccionado',
      subtitle: 'Selecciona una sección de la lista para visualizar su documento',
    };
  };

  return (
    <div className={styles.pdfContainer}>
      {url && !isUploading ? (
        <>
          {showLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
              <p>Cargando documento...</p>
            </div>
          )}
          <iframe
            key={url}
            src={getPDFUrlWithControls(url)}
            className={styles.pdfViewer}
            title="Document Viewer"
            allow="fullscreen"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={() => setInternalLoading(false)}
            onLoadStart={() => setInternalLoading(true)}
            style={{
              opacity: showLoading ? 0.1 : 1,
              pointerEvents: showLoading ? 'none' : 'auto',
            }}
          />
        </>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>
            <InformacionIcon size={48} />
          </div>
          <p className={styles.emptyStateText}>{getEmptyStateMessage().title}</p>
          <p className={styles.emptyStateSubtext}>{getEmptyStateMessage().subtitle}</p>
          {isUploading && uploadingSection && (
            <div className={styles.uploadingIndicator}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DocumentListItem = ({
  document,
  onSelect,
  onView,
  onRefresh,
  onDelete,
  isUploadingThisSection = false,
  isGlobalUploading = false,
}: {
  document: DocumentSection;
  onSelect?: (document: DocumentSection) => void;
  onView?: (document: DocumentSection) => void;
  onRefresh?: (document: DocumentSection) => void;
  onDelete?: (document: DocumentSection) => void;
  isUploadingThisSection?: boolean;
  isGlobalUploading?: boolean;
}) => {
  const isUploading = document.status === 'uploading' || isUploadingThisSection;
  const isDisabled = isUploading || isGlobalUploading;
  const hasDocument = document.status === 'completed' && document.url;
  const actionsDisabled = isDisabled || !hasDocument;

  return (
    <div
      className={clsx(
        styles.documentItem,
        styles[document.status],
        document.selected && styles.selected,
        isUploading && styles.uploading,
        isDisabled && styles.disabled,
      )}
    >
      <div className={styles.documentItemLeft} onClick={() => !isDisabled && onSelect?.(document)}>
        <span className={styles.documentItemText}>{document.name}</span>
        {isUploading && <span className={styles.uploadingText}>(Subiendo...)</span>}
      </div>
      <div className={styles.documentItemActions}>
        <Button
          size="sm"
          variant="info"
          appearance="outline"
          shape="square"
          icon={DocumentBoxIcon}
          iconInputSize={24}
          onClick={() => onView?.(document)}
          title={hasDocument ? `Ver documento: ${document.name}` : 'No hay documento para ver'}
          disabled={actionsDisabled}
        />
        <Button
          size="sm"
          variant="info"
          appearance="outline"
          shape="square"
          icon={RefrescarIcon}
          iconInputSize={24}
          onClick={() => onRefresh?.(document)}
          title={hasDocument ? `Refrescar documento: ${document.name}` : 'No hay documento para refrescar'}
          disabled={actionsDisabled}
        />
        <Button
          size="sm"
          variant="danger"
          appearance="outline"
          shape="square"
          icon={CloseBoxIcon}
          iconInputSize={60}
          onClick={() => {
            onDelete?.(document);
          }}
          title={
            hasDocument ? `Eliminar documento: ${document.name} (ID: ${document.id})` : 'No hay documento para eliminar'
          }
          disabled={actionsDisabled}
        />
      </div>
    </div>
  );
};

const DocumentList = ({
  documents,
  onSelect,
  onView,
  onRefresh,
  onDelete,
  uploadingSection,
  isGlobalUploading = false,
}: {
  documents: DocumentSection[];
  onSelect?: (document: DocumentSection) => void;
  onView?: (document: DocumentSection) => void;
  onRefresh?: (document: DocumentSection) => void;
  onDelete?: (document: DocumentSection) => void;
  uploadingSection?: DocumentType | null;
  isGlobalUploading?: boolean;
}) => {
  return (
    <div className={styles.documentList}>
      {documents.map((document) => {
        return (
          <DocumentListItem
            key={document.id}
            document={document}
            onSelect={onSelect}
            onView={onView}
            onRefresh={onRefresh}
            onDelete={onDelete}
            isUploadingThisSection={uploadingSection === document.id}
            isGlobalUploading={isGlobalUploading}
          />
        );
      })}
    </div>
  );
};

const DocumentViewer = ({
  title = 'Documentos del turno',
  sections,
  currentDocumentUrl,
  isLoading = false,
  onUpload,
  onSelectSection,
  onViewSection,
  onDeleteSection,
  onSectionUpdated,
  onCurrentDocumentChange,
  className,
}: DocumentViewerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [replacingSection, setReplacingSection] = useState<DocumentType | null>(null);
  const [uploadingSection, setUploadingSection] = useState<DocumentType | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleReplaceDocument = (section: DocumentSection) => {
    if (section.status !== 'completed') return;

    setReplacingSection(section.id);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Por favor selecciona un archivo PDF válido');
      return;
    }

    if (!onUpload) return;

    let targetSectionId: DocumentType;
    const currentSelectedSection = sections.find((section) => section.selected);

    if (replacingSection) {
      targetSectionId = replacingSection;
    } else {
      if (!currentSelectedSection || currentSelectedSection.status !== 'pending') {
        alert('Por favor selecciona una sección pendiente para subir el documento');
        return;
      }
      targetSectionId = currentSelectedSection.id;
    }

    setIsUploading(true);
    setUploadingSection(targetSectionId);
    try {
      const updatedSection = await onUpload(file, targetSectionId);
      onSectionUpdated?.(updatedSection);

      const wasSelectedSection = currentSelectedSection?.id === targetSectionId;
      if (wasSelectedSection && updatedSection.url && onCurrentDocumentChange) {
        onCurrentDocumentChange(updatedSection.url);
      }
    } catch (error) {
      console.error('Error al subir el documento:', error);
      alert('Error al subir el documento. Por favor intenta nuevamente.');
    } finally {
      setIsUploading(false);
      setUploadingSection(null);
      setReplacingSection(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const selectedSection = sections.find((section) => section.selected);

  const canSelectSection = (section: DocumentSection) => {
    if (isUploading) return false;
    if (uploadingSection === section.id) return false;
    return true;
  };

  const handleSelectSection = (section: DocumentSection) => {
    if (!canSelectSection(section)) return;
    onSelectSection?.(section);
  };

  return (
    <div className={clsx(styles.container, className)}>
      <DocumentHeader
        title={title}
        sections={sections}
        selectedSection={selectedSection}
        onUpload={handleUploadClick}
        isUploading={isUploading}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <div className={styles.content}>
        <PDFViewer
          url={currentDocumentUrl}
          isLoading={isLoading}
          selectedSection={selectedSection}
          isUploading={isUploading}
          uploadingSection={uploadingSection}
          sections={sections}
        />
        <DocumentList
          documents={sections}
          onSelect={handleSelectSection}
          onView={onViewSection}
          onRefresh={handleReplaceDocument}
          onDelete={onDeleteSection}
          uploadingSection={uploadingSection}
          isGlobalUploading={isUploading}
        />
      </div>
    </div>
  );
};

export default DocumentViewer;
