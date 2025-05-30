export const TurnoEstadoTipo: Record<string, number> = {
  Vacio: 0,
  Cancelado: 1,
  Atendido: 2,
  Atendiendo: 3,
  Presente: 4,
  Confirmado: 5,
  Controlado: 6,
  Llamado: 7,
  Bloqueado: 8,
  Asignado: 9,
};

export type TurnoEstado = keyof typeof TurnoEstadoTipo;

export type TurnoEstadoId = (typeof TurnoEstadoTipo)[keyof typeof TurnoEstadoTipo];

export interface FechasConTurnos {
  fechasConTurnos: Date[];
}

export interface ResponseError {
  message: string;
  validationErrors?: Record<string, string[]>;
}

export interface VistaResponse<T> {
  success: boolean;
  mensaje: string;
  data: T;
  totalCount: number;
  responseOrder: object;
}
