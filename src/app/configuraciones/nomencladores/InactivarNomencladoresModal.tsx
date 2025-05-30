import client from '@/api/client';
import { Nomencladores } from '@/api/types';
import Button from '@/components/Button';
import Modal, { ModalRef } from '@/components/Modal';
import EliminarIcon from '@/icons/EliminarIcon';
import { ResponseError } from '@/types/api';
import { Fragment, RefObject, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './NomencladoresModal.module.css';

export interface InactivarModalRef {
  open: (nomencladores?: Nomencladores[], onSuccess?: () => void) => void;
  close: () => void;
}

interface InactivarNomencladoresModalProps {
  ref: RefObject<InactivarModalRef | null>;
}

const EditorNomencladoresModal = ({ ref }: InactivarNomencladoresModalProps) => {
  const modalRef = useRef<ModalRef | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ResponseError[]>();
  const [nomencladores, setNomencladores] = useState<Nomencladores[]>();
  const [successCallback, setSuccessCallback] = useState<() => void>();

  const open = useCallback((nomencladores?: Nomencladores[], onSuccess?: () => void) => {
    setError(undefined);
    if (nomencladores) {
      setNomencladores(nomencladores);
    }
    if (onSuccess) {
      setSuccessCallback(() => onSuccess);
    }
    modalRef.current?.open();
  }, []);

  const close = useCallback(() => {
    setError(undefined);
    setNomencladores(undefined);
    setSuccessCallback(undefined);
    modalRef.current?.close();
  }, []);

  useImperativeHandle(ref, () => ({ open, close }), [open, close]);

  const onConfirm = useCallback(() => {
    const requests =
      nomencladores?.map((nomenclador) =>
        client.DELETE(`/Nomencladores/Delete`, { params: { query: { id: nomenclador.id } } }),
      ) ?? [];

    setIsLoading(true);
    Promise.all(requests)
      .then((responses) => {
        const errors = responses.flatMap((response) => response.error as unknown as ResponseError);
        if (errors.length) {
          setError(errors);
        } else {
          successCallback?.();
          close();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [nomencladores, close, successCallback]);

  useEffect(() => {
    if (!nomencladores?.length) {
      close();
    }
  }, [nomencladores, close]);

  return (
    <Modal ref={modalRef} title={<span className={styles.bold}>Inactivar Nomencladores</span>}>
      <div className={styles.form}>
        <div className={styles.columnsContainer}>
          <div className={styles.editedItemsColumn}>
            <div>Al confirmar, se inactivaran todos los registros listados.</div>
            <div className={styles.editedItemList}>
              {nomencladores?.map((nomenclador) => (
                <Fragment key={nomenclador.id}>
                  <Button
                    size="sm"
                    variant="outline"
                    shape="round"
                    icon={EliminarIcon}
                    onClick={() => {
                      setNomencladores((prev) => prev?.filter(({ id }) => id !== nomenclador.id));
                    }}
                  />
                  <div>{nomenclador.codigoNomenclador}</div>
                  <div className={styles.ellipsed} title={nomenclador.descripcion}>
                    {nomenclador.descripcion}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        {error && (
          <div>
            <ul className={styles.errorMessage}>
              {error.map(({ message }, i) => (
                <li key={`error-${i}`}>{message}</li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.footer}>
          <Button variant="outline" shape="round" onClick={close} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="primary" shape="round" onClick={onConfirm} disabled={isLoading}>
            Inactivar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditorNomencladoresModal;
