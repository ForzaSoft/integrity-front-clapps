import { apiFetch } from '@/lib/apiFetch';
import { FechasConTurnos } from '@/types/api';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import listFechasConTurnosMock from './mocks/Agendas/listFechasConTurnosMock';

const useListFechasConTurnosAPICall = (AgendaId: string, mocked = false) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<FechasConTurnos>();

  useEffect(() => {
    if (mocked) return;

    const fetchParams = new URLSearchParams({ AgendaId });
    setIsLoading(true);
    apiFetch<FechasConTurnos>(`/Agendas/ListFechasConTurnos?${fetchParams}`)
      .then(({ success, data }) => {
        if (success && data) {
          setData(data);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [AgendaId, mocked]);

  return mocked ? listFechasConTurnosMock : { isLoading, data, error };
};

export const useListFechasConTurnos = (IdAgenda: string) => {
  const searchParams = useSearchParams();
  const mocked = searchParams.has('mocked');
  const { data } = useListFechasConTurnosAPICall(IdAgenda, mocked);

  const fechasConTurnos = useMemo(() => data?.fechasConTurnos.map((fecha) => new Date(fecha)) ?? [], [data]);

  return { fechasConTurnos };
};
