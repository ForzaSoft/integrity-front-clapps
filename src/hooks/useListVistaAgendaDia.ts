import client from '@/api/client';
import { calcularHoraActual } from '@/api/mappers';
import { AgendaListVistaAgendaDiaListVistaAgendaDiaResponseDto } from '@/api/types';
import { InfoDataAdm, InfoDataMed as MedInfoAgenda } from '@/app/agenda-dia/[id]/InfoAgenda';
import { TurnosTotalizados } from '@/components/TurnosDelDiaComponent';
import { TurnoEstadoTipo } from '@/types/api';
import { formatDate, formatTime } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import listVistaAgendaDiaMock from './mocks/Agendas/listVistaAgendaDiaMock';

const useListVistaAgendaDia = (AgendaId: number, date?: Date, mocked = false) => {
  const [data, setData] = useState<AgendaListVistaAgendaDiaListVistaAgendaDiaResponseDto>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!date || mocked) return;

    const Fecha = formatDate(date);

    client
      .GET('/Agendas/ListVistaAgendaDia', {
        params: {
          query: { AgendaId, Fecha },
        },
      })
      .then(({ data, error }) => {
        if (error) setError(error);
        if (data) setData(data);
      });
  }, [AgendaId, date, mocked]);

  return mocked ? listVistaAgendaDiaMock : { data, error };
};

const dataToAdminInfoAgenda = (data?: AgendaListVistaAgendaDiaListVistaAgendaDiaResponseDto): InfoDataAdm => {
  const horarioActual = calcularHoraActual(data?.entradaSalidaDtos, data?.horarioDetalleDtos);
  const faltaFormatted = calcularEstimadoDeSalida(horarioActual?.horaSalida ?? '');

  return {
    especialidad: data?.especialidadDescripcion ?? '',
    tipo: data?.agendaTipoDescripcion ?? '',
    atencion: data ? 'Con turnos previos' : '', // TODO: pending
    atendiendoEn: data?.consultorioDescripcion ?? '',
    horaInicio: formatTime(horarioActual?.horaEntrada),
    horaCierre: formatTime(horarioActual?.horaSalida),
    usaMinutosDinamicos: data?.usaMinutosDinamicos ?? false,
    minutosTurno: data?.minutosTurno ?? 0,
    usuario: 'GSPI', // TODO: pending
    faltan: data ? faltaFormatted : '',
  };
};

const MS_IN_A_SECOND = 60 * 1000;
const MS_IN_AN_HOUR = 60 * 60 * 1000;

function calcularEstimadoDeSalida(horarioSalidaAcordado: string) {
  // será la diferencia entre la hora actual y la hora de salida del horarioActual.horaSalida
  const [horaSalida, minutosSalida] = horarioSalidaAcordado.split(':') ?? [];
  const horaSalidaDate = new Date();
  horaSalidaDate.setHours(Number(horaSalida), Number(minutosSalida));

  const now = new Date();
  const falta = horaSalidaDate.getTime() - now.getTime();
  return `${Math.floor(falta / MS_IN_AN_HOUR)}h ${Math.floor((falta % MS_IN_AN_HOUR) / MS_IN_A_SECOND)}m`;
}

const dataToMedInfoAgenda = (data?: AgendaListVistaAgendaDiaListVistaAgendaDiaResponseDto): MedInfoAgenda => ({
  especialidad: data?.especialidadDescripcion ?? '',
  atendiendoEn: data?.consultorioDescripcion ?? '',
  horaInicio: formatTime(data?.horarioDetalleDtos?.[0].horaEntrada),
  horaCierre: formatTime(data?.horarioDetalleDtos?.[0].horaSalida),
});

export interface AgendaDiaTurno {
  urgente: boolean;
  hora: string;
  paciente: string;
  obraSocial: string;
  plan: string;
  tipo: string;
  idTurno: number;
  idEstado: number;
  estado: string;
  bloqueado: boolean;
  motivoBloqueo: string;
  minutos: number;
}

const dataToTurnos = (data?: AgendaListVistaAgendaDiaListVistaAgendaDiaResponseDto) => {
  if (!data) return [];

  return data.turnosDTO?.map((turno) => ({
    urgente: !!turno.urgente,
    hora: turno.horaTurno ?? '',
    paciente: turno.pacienteNombreApellido ?? '',
    obraSocial: turno.obraSocialNombre ?? '',
    plan: turno.planDescripcion ?? '',
    tipo: turno.turnoTiposDescripcion ?? '',
    idTurno: turno.turnoId ?? 0,
    idEstado: turno.turnoEstadoTipoId ?? 0,
    estado: turno.turnoEstadoTipoDescripcion ?? '',
    bloqueado: turno.turnoEstadoTipoId == 8,
    motivoBloqueo: turno.motivoBloqueo ?? '',
    minutos: turno.minutos ?? 0,
  }));
};

const dataToTurnosTotalizados = (data?: AgendaListVistaAgendaDiaListVistaAgendaDiaResponseDto): TurnosTotalizados => {
  const turnosTotalizados = {
    total: 0,
    sinLlegar: 0,
    presentes: 0,
    atendidos: 0,
  };

  data?.turnosDTO?.forEach(({ pacienteId, turnoEstadoTipoId }) => {
    if (pacienteId) {
      turnosTotalizados.total += 1;
    }

    switch (turnoEstadoTipoId) {
      case TurnoEstadoTipo.Asignado:
      case TurnoEstadoTipo.Confirmado:
        turnosTotalizados.sinLlegar += 1;
        break;
      case TurnoEstadoTipo.Presente:
      case TurnoEstadoTipo.Llamado:
        turnosTotalizados.presentes += 1;
        break;
      case TurnoEstadoTipo.Atendiendo:
      case TurnoEstadoTipo.Atendido:
      case TurnoEstadoTipo.Controlado:
        turnosTotalizados.atendidos += 1;
        break;
    }
  });

  return turnosTotalizados;
};

const dataToEsperaTotal = (data?: AgendaListVistaAgendaDiaListVistaAgendaDiaResponseDto): number => {
  if (!data) {
    return 0;
  }

  const [presentes, esperaTotal] = data?.turnosDTO
    ?.filter(({ turnoEstadoTipoId = -1 }) =>
      [TurnoEstadoTipo.Presente, TurnoEstadoTipo.Llamado].includes(turnoEstadoTipoId),
    )
    .reduce(([presentes, esperaTotal], { minutos = 0 }) => [presentes + 1, esperaTotal + minutos], [0, 0]) ?? [0, 0];

  return data.usaMinutosDinamicos ? esperaTotal : (data.minutosTurno ?? 0) * presentes;
};

export const useListVistaAgendaDiaAdm = (IdAgenda: string, date?: Date) => {
  const searchParams = useSearchParams();
  const mocked = searchParams.has('mocked');
  const { data } = useListVistaAgendaDia(parseInt(IdAgenda), date, mocked);

  const infoAgenda = useMemo(() => dataToAdminInfoAgenda(data), [data]);
  const turnos = useMemo(() => dataToTurnos(data), [data]);
  const turnosTotalizados = useMemo(() => dataToTurnosTotalizados(data), [data]);
  const espera = useMemo(() => dataToEsperaTotal(data), [data]);

  return { infoAgenda, turnosTotalizados, turnos, espera };
};

export const useListVistaAgendaDiaMed = (IdAgenda: string, date?: Date) => {
  const searchParams = useSearchParams();
  const mocked = searchParams.has('mocked');
  const { data } = useListVistaAgendaDia(parseInt(IdAgenda), date, mocked);

  const infoAgenda = useMemo(() => dataToMedInfoAgenda(data), [data]);
  const turnos = useMemo(() => dataToTurnos(data), [data]);
  const turnosTotalizados = useMemo(() => dataToTurnosTotalizados(data), [data]);

  return { infoAgenda: infoAgenda, turnosTotalizados, turnos };
};
