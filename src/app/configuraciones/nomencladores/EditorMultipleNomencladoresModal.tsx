import client from '@/api/client';
import { Nomencladores, NomencladorNomencladorRequestDto } from '@/api/types';
import Button from '@/components/Button';
import Modal, { ModalRef } from '@/components/Modal';
import Select from '@/components/Select';
import Toggle from '@/components/Toggle';
import { useEspecialidadesGetAll } from '@/hooks/useEspecialidadesGetAll';
import { useNomencladorTiposGetAll } from '@/hooks/useNomencladorTiposGetAll';
import EliminarIcon from '@/icons/EliminarIcon';
import { ResponseError } from '@/types/api';
import clsx from 'clsx';
import { Fragment, RefObject, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './NomencladoresModal.module.css';

export interface EditorMultipleModalRef {
  open: (nomencladores?: Nomencladores[], onSuccess?: () => void) => void;
  close: () => void;
}

type MultiEditionNomencladoresRequestDto = Omit<NomencladorNomencladorRequestDto, 'codigoNomenclador' | 'descripcion'>;

const mapNomencladorToRequestDTO = (nomenclador: Nomencladores): MultiEditionNomencladoresRequestDto => ({
  idEspecialidad: nomenclador.idEspecialidad,
  idNomencladorTipo: nomenclador.idNomencladorTipo,
  activo: nomenclador.activo,
  requiereOrden: nomenclador.requiereOrden,
  liquidaEnMedico: nomenclador.liquidaEnMedico ?? false,
  esContenedor: nomenclador.esContenedor ?? false,
  liquidaEnObraSocial: nomenclador.liquidaEnObraSocial ?? false,
  seIncluyeContratos: nomenclador.seIncluyeContratos ?? false,
  nomenclado: nomenclador.nomenclado ?? false,
  altaComplejidad: nomenclador.altaComplejidad ?? false,
  controlManual: nomenclador.controlManual ?? false,
  consumeArticulos: nomenclador.consumeArticulos,
});

const calculateFormValues = (nomencladores: Nomencladores[]): MultiEditionNomencladoresRequestDto =>
  nomencladores?.map(mapNomencladorToRequestDTO).reduce((values, nomenclador) => ({
    idEspecialidad: values.idEspecialidad === nomenclador.idEspecialidad ? nomenclador.idEspecialidad : 0,
    idNomencladorTipo: values.idNomencladorTipo === nomenclador.idNomencladorTipo ? nomenclador.idNomencladorTipo : 0,
    activo: !!(values.activo && nomenclador.activo),
    requiereOrden: !!(values.requiereOrden && nomenclador.requiereOrden),
    liquidaEnMedico: !!(values.liquidaEnMedico && nomenclador.liquidaEnMedico),
    esContenedor: !!(values.esContenedor && nomenclador.esContenedor),
    liquidaEnObraSocial: !!(values.liquidaEnObraSocial && nomenclador.liquidaEnObraSocial),
    seIncluyeContratos: !!(values.seIncluyeContratos && nomenclador.seIncluyeContratos),
    nomenclado: !!(values.nomenclado && nomenclador.nomenclado),
    altaComplejidad: !!(values.altaComplejidad && nomenclador.altaComplejidad),
    controlManual: !!(values.controlManual && nomenclador.controlManual),
    consumeArticulos: !!(values.consumeArticulos && nomenclador.consumeArticulos),
  })) ?? {};

interface EditorMultipleNomencladoresModalProps {
  ref: RefObject<EditorMultipleModalRef | null>;
}

const EditorNomencladoresModal = ({ ref }: EditorMultipleNomencladoresModalProps) => {
  const modalRef = useRef<ModalRef | null>(null);
  const [error, setError] = useState<ResponseError[]>();
  const [nomencladores, setNomencladores] = useState<Nomencladores[]>();
  const [successCallback, setSuccessCallback] = useState<() => void>();
  const { data: especialidades } = useEspecialidadesGetAll();
  const { data: nomencladorTipos } = useNomencladorTiposGetAll();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<MultiEditionNomencladoresRequestDto>({
    values: nomencladores && nomencladores.length > 0 ? calculateFormValues(nomencladores) : undefined,
  });

  const open = useCallback(
    (nomencladores?: Nomencladores[], onSuccess?: () => void) => {
      reset();
      setError(undefined);
      if (nomencladores) {
        setNomencladores(nomencladores);
      }
      if (onSuccess) {
        setSuccessCallback(() => onSuccess);
      }
      modalRef.current?.open();
    },
    [reset],
  );

  const close = useCallback(() => {
    reset();
    setError(undefined);
    setNomencladores(undefined);
    setSuccessCallback(undefined);
    modalRef.current?.close();
  }, [reset]);

  useImperativeHandle(ref, () => ({ open, close }), [open, close]);

  const onSubmit = useCallback(
    (body: MultiEditionNomencladoresRequestDto) => {
      const changedFields = Object.fromEntries(Object.entries(body).filter(([key]) => key in dirtyFields));
      const requests =
        nomencladores?.map((nomenclador) =>
          client.PUT(`/Nomencladores/Update`, {
            params: { query: { id: nomenclador.id } },
            body: {
              codigoNomenclador: nomenclador.codigoNomenclador,
              descripcion: nomenclador.descripcion,
              ...mapNomencladorToRequestDTO(nomenclador),
              ...changedFields,
            },
          }),
        ) ?? [];

      Promise.all(requests).then((responses) => {
        const errors = responses.flatMap((response) => response.error as unknown as ResponseError);
        if (errors.length) {
          setError(errors);
        } else {
          successCallback?.();
          close();
        }
      });
    },
    [nomencladores, close, successCallback, dirtyFields],
  );

  useEffect(() => {
    if (!nomencladores?.length) {
      close();
    }
  }, [nomencladores, close]);

  return (
    <Modal
      ref={modalRef}
      className={styles.multiEditor}
      title={<span className={styles.bold}>Código de nomenclador</span>}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.columnsContainer}>
          <div className={styles.fieldColumn}>
            <div className={styles.fields}>
              <label
                htmlFor="idEspecialidad"
                className={clsx(styles.fieldLabel, { [styles.dirtyFieldLabel]: dirtyFields.idEspecialidad })}
              >
                Especialidad:
              </label>
              <div id="idEspecialidad" className={styles.fieldInput}>
                <Select {...register('idEspecialidad')}>
                  <option></option>
                  {especialidades?.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.descripcion}
                    </option>
                  ))}
                </Select>
                {errors.idEspecialidad && <div className={styles.errorMessage}>{errors.idEspecialidad.message}</div>}
              </div>
              <label
                htmlFor="idNomencladorTipo"
                className={clsx(styles.fieldLabel, { [styles.dirtyFieldLabel]: dirtyFields.idNomencladorTipo })}
              >
                Tipo:
              </label>
              <div id="idNomencladorTipo" className={styles.fieldInput}>
                <Select {...register('idNomencladorTipo')}>
                  <option></option>
                  {nomencladorTipos?.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.descripcion}
                    </option>
                  ))}
                </Select>
                {errors.idNomencladorTipo && (
                  <div className={styles.errorMessage}>{errors.idNomencladorTipo.message}</div>
                )}
              </div>
            </div>
            <div className={styles.options}>
              <Toggle id="activo" {...register('activo')} />
              <label htmlFor="activo" className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.activo })}>
                Activo
              </label>
              <div></div>
              <div></div>
              <Toggle id="requiereOrden" {...register('requiereOrden')} />
              <label htmlFor="requiereOrden" className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.requiereOrden })}>
                Requiere orden
              </label>
              <Toggle disabled />
              <label>Lleva preparación</label>
              <Toggle id="liquidaEnMedico" {...register('liquidaEnMedico')} />
              <label
                htmlFor="liquidaEnMedico"
                className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.liquidaEnMedico })}
              >
                Liquida médicos
              </label>
              <Toggle id="esContenedor" {...register('esContenedor')} />
              <label htmlFor="esContenedor" className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.esContenedor })}>
                Es contenedor
              </label>
              <Toggle id="liquidaEnObraSocial" {...register('liquidaEnObraSocial')} />
              <label
                htmlFor="liquidaEnObraSocial"
                className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.liquidaEnObraSocial })}
              >
                Liquida Ob. Soc.
              </label>
              <Toggle id="seIncluyeContratos" {...register('seIncluyeContratos')} />
              <label
                htmlFor="seIncluyeContratos"
                className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.seIncluyeContratos })}
              >
                Añade a contratos
              </label>
              <Toggle id="nomenclado" {...register('nomenclado')} />
              <label htmlFor="nomenclado" className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.nomenclado })}>
                Nomenclado
              </label>
              <Toggle id="controlManual" {...register('controlManual')} />
              <label htmlFor="controlManual" className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.controlManual })}>
                Control manual
              </label>
              <Toggle id="altaComplejidad" {...register('altaComplejidad')} />
              <label
                htmlFor="altaComplejidad"
                className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.altaComplejidad })}
              >
                Alta complejidad
              </label>
              <Toggle id="consumeArticulos" {...register('consumeArticulos')} />
              <label
                htmlFor="consumeArticulos"
                className={clsx({ [styles.dirtyFieldLabel]: dirtyFields.consumeArticulos })}
              >
                Consume artículos
              </label>
            </div>
          </div>
          <div className={styles.editedItemsColumn}>
            <div>
              <div className={styles.bold}>Edición masiva</div>
              Al guardar cambios, se editaran todos los registros listados con la información utilizada.
            </div>
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
              {error.map(({ message, validationErrors }, i) =>
                validationErrors ? (
                  Object.values(validationErrors).flatMap((validationErrorMessage) => (
                    <li key={`error-${i}`}>{validationErrorMessage}</li>
                  ))
                ) : (
                  <li key={`error-${i}`}>{message}</li>
                ),
              )}
            </ul>
          </div>
        )}
        <div className={styles.footer}>
          <Button variant="outline" shape="round" onClick={close} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button variant="primary" shape="round" type="submit" disabled={isSubmitting}>
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditorNomencladoresModal;
