import {
  AgendaListAgendasActivasDtoAuxiliaresListAgendasActivasEntradaSalidasDto,
  AgendaListAgendasActivasDtoAuxiliaresListAgendasActivasHorariosDetallesDto,
  AgendaListVistaAgendaDiaDtoAuxiliaresListVistaAgendaDiaEntradaSalidasDto,
  AgendaListVistaAgendaDiaDtoAuxiliaresListVistaAgendaDiaHorariosDetallesDto,
} from './types';

type EntradaSalidaDTOs =
  | AgendaListVistaAgendaDiaDtoAuxiliaresListVistaAgendaDiaEntradaSalidasDto[]
  | AgendaListAgendasActivasDtoAuxiliaresListAgendasActivasEntradaSalidasDto[]
  | null;

type HorarioDetalleDTOs =
  | AgendaListVistaAgendaDiaDtoAuxiliaresListVistaAgendaDiaHorariosDetallesDto[]
  | AgendaListAgendasActivasDtoAuxiliaresListAgendasActivasHorariosDetallesDto[]
  | null;

export const calcularHoraActual = (
  entradaSalidaDtos: EntradaSalidaDTOs = [],
  horarioDetalleDtos: HorarioDetalleDTOs = [],
) => {
  const entradaSalidaActual =
    entradaSalidaDtos?.find(({ horaDesde, horaHasta }) => horaDesde !== null && horaHasta === null) ?? null;

  if (!entradaSalidaActual) return null;

  const horarioDetalleActualId =
    'horarioDetalleId' in entradaSalidaActual
      ? entradaSalidaActual.horarioDetalleId
      : 'idHorarioDetalle' in entradaSalidaActual
        ? entradaSalidaActual.idHorarioDetalle
        : 0;

  return horarioDetalleDtos?.find(({ horarioDetalleId }) => horarioDetalleId === horarioDetalleActualId) ?? null;
};
