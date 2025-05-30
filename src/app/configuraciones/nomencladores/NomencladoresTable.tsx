'use client';

import { Nomencladores } from '@/api/types';
import Button from '@/components/Button';
import Table from '@/components/Table';
import { useNomencladoresGetAll } from '@/hooks/useNomencladoresGetAll';
import AgregarIcon from '@/icons/AgregarIcon';
import EditarIcon from '@/icons/EditarIcon';
import EliminarIcon from '@/icons/EliminarIcon';
import { useMemo, useRef, useState } from 'react';
import EditorMultipleNomencladoresModal, { EditorMultipleModalRef } from './EditorMultipleNomencladoresModal';
import EditorNomencladoresModal, { EditorModalRef } from './EditorNomencladoresModal';
import InactivarNomencladoresModal, { InactivarModalRef } from './InactivarNomencladoresModal';
import styles from './NomencladoresTable.module.css';

const Checkmark = ({ checked }: { checked: boolean }) => (checked ? <>&#x2714;</> : <></>);

const NomencladoresTable = () => {
  const [itemsSeleccionados, setItemsSeleccionado] = useState<number[]>([]);
  const { data: nomencladores, refetch } = useNomencladoresGetAll();
  const editorModalRef = useRef<EditorModalRef>(null);
  const editorMultipleModalRef = useRef<EditorMultipleModalRef>(null);
  const inactivarModalRef = useRef<InactivarModalRef>(null);

  const itemsSeleccionadosSet = useMemo(() => new Set(itemsSeleccionados), [itemsSeleccionados]);

  const openEditorModal = (nomenclador?: Nomencladores, onSuccess?: () => void) => {
    editorModalRef.current?.open(nomenclador, onSuccess);
  };

  const openEditorMultipleModal = (nomencladores?: Nomencladores[], onSuccess?: () => void) => {
    editorMultipleModalRef.current?.open(nomencladores, onSuccess);
  };

  const openInactivarModal = (nomencladores?: Nomencladores[], onSuccess?: () => void) => {
    inactivarModalRef.current?.open(nomencladores, onSuccess);
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Button
          icon={AgregarIcon}
          variant="outline"
          size="sm"
          shape="round"
          onClick={() => {
            openEditorModal(undefined, refetch);
          }}
        >
          Agregar
        </Button>
        <Button
          icon={EditarIcon}
          variant="outline"
          size="sm"
          shape="round"
          disabled={!itemsSeleccionados.length}
          onClick={() => {
            const nomencladoresSeleccionados = itemsSeleccionados.map((index) => nomencladores[index]);
            if (nomencladoresSeleccionados.length > 1) {
              openEditorMultipleModal(nomencladoresSeleccionados, refetch);
            } else {
              openEditorModal(nomencladoresSeleccionados[0], refetch);
            }
          }}
        >
          Editar
        </Button>
        <Button
          icon={EliminarIcon}
          variant="outline"
          size="sm"
          shape="round"
          disabled={!itemsSeleccionados.length}
          onClick={() => {
            const nomencladoresSeleccionados = itemsSeleccionados.map((index) => nomencladores[index]);
            openInactivarModal(nomencladoresSeleccionados, refetch);
          }}
        >
          Inactivar
        </Button>
      </div>
      <Table
        headers={[
          {
            title: (
              <input
                type="checkbox"
                checked={itemsSeleccionados.length === (nomencladores?.length ?? 0)}
                onChange={(event) => {
                  setItemsSeleccionado(event.currentTarget.checked ? nomencladores.map((_, i) => i) : []);
                }}
              />
            ),
            align: 'center',
            renderer: (_, rowIndex) => (
              <input type="checkbox" checked={itemsSeleccionadosSet.has(rowIndex)} onChange={() => {}} />
            ),
          },
          { title: 'Código', value: 'codigoNomenclador' },
          { title: 'Descripción', value: 'descripcion' },
          {
            title: 'Especialidad',
            renderer: ({ idEspecialidadNavigation }) => <>{idEspecialidadNavigation?.descripcion}</>,
          },
          {
            title: 'Tipo',
            renderer: ({ idNomencladorTipoNavigation }) => <>{idNomencladorTipoNavigation?.descripcion}</>,
          },
          {
            title: 'Es contenedor',
            align: 'center',
            renderer: ({ esContenedor }) => <Checkmark checked={!!esContenedor} />,
          },
          {
            title: 'Control manual',
            align: 'center',
            renderer: ({ controlManual }) => <Checkmark checked={!!controlManual} />,
          },
          {
            title: 'Requiere orden',
            align: 'center',
            renderer: ({ requiereOrden }) => <Checkmark checked={!!requiereOrden} />,
          },
          {
            title: 'En contratos',
            align: 'center',
            renderer: ({ seIncluyeContratos }) => <Checkmark checked={!!seIncluyeContratos} />,
          },
          { title: 'Activo', align: 'center', renderer: ({ activo }) => <Checkmark checked={!!activo} /> },
        ]}
        items={nomencladores}
        highlightedRows={itemsSeleccionados}
        onRowClick={(_, rowIndex) => {
          setItemsSeleccionado((prevItemsSeleccionados) => {
            if (itemsSeleccionadosSet.has(rowIndex)) {
              return prevItemsSeleccionados.filter((index) => index !== rowIndex);
            }
            return [...prevItemsSeleccionados, rowIndex];
          });
        }}
      />
      <EditorNomencladoresModal ref={editorModalRef} />
      <EditorMultipleNomencladoresModal ref={editorMultipleModalRef} />
      <InactivarNomencladoresModal ref={inactivarModalRef} />
    </div>
  );
};

export default NomencladoresTable;
