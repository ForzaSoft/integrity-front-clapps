import client from '@/api/client';
import { Nomencladores, NomencladorNomencladorRequestDto } from '@/api/types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal, { ModalRef } from '@/components/Modal';
import Select from '@/components/Select';
import Toggle from '@/components/Toggle';
import { useEspecialidadesGetAll } from '@/hooks/useEspecialidadesGetAll';
import { useNomencladorTiposGetAll } from '@/hooks/useNomencladorTiposGetAll';
import { ResponseError } from '@/types/api';
import { RefObject, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './NomencladoresModal.module.css';

export interface EditorModalRef {
  open: (data?: Nomencladores, onSuccess?: () => void) => void;
  close: () => void;
}

const mapNomencladorToRequestDTO = (nomenclador: Nomencladores): NomencladorNomencladorRequestDto => ({
  codigoNomenclador: nomenclador.codigoNomenclador,
  descripcion: nomenclador.descripcion,
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

interface EditorNomencladoresModalProps {
  ref: RefObject<EditorModalRef | null>;
}

const EditorNomencladoresModal = ({ ref }: EditorNomencladoresModalProps) => {
  const modalRef = useRef<ModalRef | null>(null);
  const [error, setError] = useState<ResponseError>();
  const [id, setId] = useState(0);
  const [data, setData] = useState<NomencladorNomencladorRequestDto>();
  const [successCallback, setSuccessCallback] = useState<() => void>();
  const { data: especialidades } = useEspecialidadesGetAll();
  const { data: nomencladorTipos } = useNomencladorTiposGetAll();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NomencladorNomencladorRequestDto>({ values: data });

  const open = useCallback(
    (nomenclador?: Nomencladores, onSuccess?: () => void) => {
      reset();
      setError(undefined);
      if (nomenclador) {
        setId(nomenclador.id ?? 0);
        setData(mapNomencladorToRequestDTO(nomenclador));
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
    setId(0);
    setData(undefined);
    setSuccessCallback(undefined);
    modalRef.current?.close();
  }, [reset]);

  useImperativeHandle(ref, () => ({ open, close }), [open, close]);

  const onSubmit = useCallback(
    (body: NomencladorNomencladorRequestDto) => {
      const request = id
        ? client.PUT(`/Nomencladores/Update`, { params: { query: { id } }, body })
        : client.POST('/Nomencladores/Create', { body });

      request.then(({ error }) => {
        if (error) {
          setError(error);
        } else {
          successCallback?.();
          close();
        }
      });
    },
    [id, successCallback, close],
  );

  return (
    <Modal
      ref={modalRef}
      className={styles.modal}
      title={
        <>
          {id ? 'Editar' : 'Nuevo'} <span className={styles.bold}>Nomenclador</span>
        </>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
          <label htmlFor="codigoNomenclador" className={styles.fieldLabel}>
            Código:
          </label>
          <div id="codigoNomenclador" className={styles.fieldInput}>
            <Input {...register('codigoNomenclador', { required: 'El código es requerido.' })} />
            {errors.codigoNomenclador && <div className={styles.errorMessage}>{errors.codigoNomenclador.message}</div>}
          </div>
          <label htmlFor="descripcion" className={styles.fieldLabel}>
            Descripción:
          </label>
          <div id="descripcion" className={styles.fieldInput}>
            <Input {...register('descripcion', { required: 'La descripción es requerida.' })} />
            {errors.descripcion && <div className={styles.errorMessage}>{errors.descripcion.message}</div>}
          </div>
          <label htmlFor="idEspecialidad" className={styles.fieldLabel}>
            Especialidad:
          </label>
          <div id="idEspecialidad" className={styles.fieldInput}>
            <Select {...register('idEspecialidad', { required: 'La especialidad es requerida.' })}>
              <option></option>
              {especialidades?.map((especialidad) => (
                <option key={especialidad.id} value={especialidad.id}>
                  {especialidad.descripcion}
                </option>
              ))}
            </Select>
            {errors.idEspecialidad && <div className={styles.errorMessage}>{errors.idEspecialidad.message}</div>}
          </div>
          <label htmlFor="idNomencladorTipo" className={styles.fieldLabel}>
            Tipo:
          </label>
          <div id="idNomencladorTipo" className={styles.fieldInput}>
            <Select {...register('idNomencladorTipo', { required: 'El tipo es requerido.' })}>
              <option></option>
              {nomencladorTipos?.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.descripcion}
                </option>
              ))}
            </Select>
            {errors.idNomencladorTipo && <div className={styles.errorMessage}>{errors.idNomencladorTipo.message}</div>}
          </div>
        </div>
        <div className={styles.options}>
          <Toggle id="activo" {...register('activo')} />
          <label htmlFor="activo">Activo</label>
          <div></div>
          <div></div>
          <Toggle id="requiereOrden" {...register('requiereOrden')} />
          <label htmlFor="requiereOrden">Requiere orden</label>
          <Toggle disabled />
          <label>Lleva preparación</label>
          <Toggle id="liquidaEnMedico" {...register('liquidaEnMedico')} />
          <label htmlFor="liquidaEnMedico">Liquida médicos</label>
          <Toggle id="esContenedor" {...register('esContenedor')} />
          <label htmlFor="esContenedor">Es contenedor</label>
          <Toggle id="liquidaEnObraSocial" {...register('liquidaEnObraSocial')} />
          <label htmlFor="liquidaEnObraSocial">Liquida Ob. Soc.</label>
          <Toggle id="seIncluyeContratos" {...register('seIncluyeContratos')} />
          <label htmlFor="seIncluyeContratos">Añade a contratos</label>
          <Toggle id="nomenclado" {...register('nomenclado')} />
          <label htmlFor="nomenclado">Nomenclado</label>
          <Toggle id="controlManual" {...register('controlManual')} />
          <label htmlFor="controlManual">Control manual</label>
          <Toggle id="altaComplejidad" {...register('altaComplejidad')} />
          <label htmlFor="altaComplejidad">Alta complejidad</label>
          <Toggle id="consumeArticulos" {...register('consumeArticulos')} />
          <label htmlFor="consumeArticulos">Consume artículos</label>
        </div>
        {error && (
          <div>
            <ul className={styles.errorMessage}>
              {error.validationErrors &&
                Object.values(error.validationErrors).flatMap((validationError, i) => (
                  <li key={`error-${i}`}>{validationError}</li>
                ))}
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
