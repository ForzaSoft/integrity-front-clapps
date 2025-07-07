import CheckCircleIcon from '@/icons/CheckCircleIcon';
import CloseBoxIcon from '@/icons/CloseBoxIcon';
import DocumentBoxIcon from '@/icons/DocumentBoxIcon';
import InformacionIcon from '@/icons/InformacionIcon';
import RefreshBoxIcon from '@/icons/RefreshBoxIcon';
import SubirIcon from '@/icons/SubirIcon';
import clsx from 'clsx';
import Button from './Button';
import styles from './DocumentViewer.module.css';

export type DocumentStatus = 'completed';

export interface DocumentItem {
  id: string | number;
  name: string;
  status: DocumentStatus;
  url: string;
  /**
   * Indica si el documento está seleccionado (muestra fondo azul).
   * COMPORTAMIENTO ESPERADO: Solo un documento debería tener selected=true a la vez.
   */
  selected?: boolean;
}

interface DocumentViewerProps {
  title?: string;
  documents: DocumentItem[];
  currentDocumentUrl?: string;
  onUpload?: () => void;
  /**
   * Función ejecutada cuando se hace clic en un documento para seleccionarlo.
   * IMPORTANTE: La lógica de selección exclusiva (solo un documento seleccionado a la vez)
   * debe implementarse en el componente padre que maneja el estado de los documentos.
   */
  onSelectDocument?: (document: DocumentItem) => void;
  onViewDocument?: (document: DocumentItem) => void;
  onRefreshDocument?: (document: DocumentItem) => void;
  onDeleteDocument?: (document: DocumentItem) => void;
  className?: string;
}

const DocumentHeader = ({ title, onUpload }: { title: string; onUpload?: () => void }) => (
  <div className={styles.header}>
    <div className={styles.headerLeft}>
      <CheckCircleIcon size={20} />
      <h2 className={styles.headerTitle}>{title}</h2>
    </div>
    <Button variant="outline" size="sm" shape="round" icon={SubirIcon} onClick={onUpload}>
      Subir
    </Button>
  </div>
);

const PDFViewer = ({ url }: { url?: string }) => {
  // Función para agregar parámetros de control a la URL del PDF
  const getPDFUrlWithControls = (pdfUrl: string) => {
    // Agregar parámetros para habilitar controles nativos del PDF
    const separator = pdfUrl.includes('#') ? '&' : '#';

    // Parámetros para una experiencia completa del visor PDF:
    // - toolbar=1: Muestra la barra de herramientas con zoom, navegación, etc.
    // - navpanes=1: Habilita el panel de navegación lateral (miniaturas, marcadores)
    // - scrollbar=1: Muestra barras de desplazamiento
    // - page=1: Inicia en la primera página
    // - zoom=FitH: Ajusta el zoom al ancho de la página (FitH = Fit Horizontal)
    // - view=Fit: Vista que se ajusta al contenedor
    const controls = ['toolbar=1', 'navpanes=1', 'scrollbar=1', 'page=1', 'zoom=FitH', 'view=Fit'].join('&');

    return `${pdfUrl}${separator}${controls}`;
  };

  return (
    <div className={styles.pdfContainer}>
      {url ? (
        <iframe
          src={getPDFUrlWithControls(url)}
          className={styles.pdfViewer}
          title="Document Viewer"
          allow="fullscreen"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>
            <InformacionIcon size={48} />
          </div>
          <p className={styles.emptyStateText}>No hay documento seleccionado</p>
          <p className={styles.emptyStateSubtext}>Selecciona un documento de la lista para visualizarlo</p>
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
}: {
  document: DocumentItem;
  onSelect?: (document: DocumentItem) => void;
  onView?: (document: DocumentItem) => void;
  onRefresh?: (document: DocumentItem) => void;
  onDelete?: (document: DocumentItem) => void;
}) => {
  return (
    <div className={clsx(styles.documentItem, styles[document.status], document.selected && styles.selected)}>
      <div className={styles.documentItemLeft} onClick={() => onSelect?.(document)}>
        <span className={styles.documentItemText}>{document.name}</span>
      </div>
      <div className={styles.documentItemActions}>
        <Button
          size="sm"
          variant="outline"
          icon={DocumentBoxIcon}
          onClick={() => onView?.(document)}
          title="Ver documento"
        />
        <Button
          size="sm"
          variant="outline"
          icon={RefreshBoxIcon}
          onClick={() => onRefresh?.(document)}
          title="Refrescar documento"
        />
        <Button
          size="sm"
          variant="secondary"
          color="negative"
          icon={CloseBoxIcon}
          onClick={() => onDelete?.(document)}
          title="Eliminar documento"
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
}: {
  documents: DocumentItem[];
  onSelect?: (document: DocumentItem) => void;
  onView?: (document: DocumentItem) => void;
  onRefresh?: (document: DocumentItem) => void;
  onDelete?: (document: DocumentItem) => void;
}) => (
  <div className={styles.documentList}>
    {documents.map((document) => (
      <DocumentListItem
        key={document.id}
        document={document}
        onSelect={onSelect}
        onView={onView}
        onRefresh={onRefresh}
        onDelete={onDelete}
      />
    ))}
  </div>
);

const DocumentViewer = ({
  title = 'Documentos del turno',
  documents,
  currentDocumentUrl,
  onUpload,
  onSelectDocument,
  onViewDocument,
  onRefreshDocument,
  onDeleteDocument,
  className,
}: DocumentViewerProps) => (
  <div className={clsx(styles.container, className)}>
    <DocumentHeader title={title} onUpload={onUpload} />
    <div className={styles.content}>
      <PDFViewer url={currentDocumentUrl} />
      <DocumentList
        documents={documents}
        onSelect={onSelectDocument}
        onView={onViewDocument}
        onRefresh={onRefreshDocument}
        onDelete={onDeleteDocument}
      />
    </div>
  </div>
);

export default DocumentViewer;
