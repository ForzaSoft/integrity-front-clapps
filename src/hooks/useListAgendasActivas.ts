import client from '@/api/client';
import { AgendaListAgendasActivasListAgendasActivasResponseDto } from '@/api/types';
import { VistaResponse } from '@/types/api';
import { useCallback, useEffect, useState } from 'react';

export const useListAgendasActivas = () => {
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<AgendaListAgendasActivasListAgendasActivasResponseDto[]>();

  const fetch = useCallback(() => {
    client.GET('/Agendas/ListAgendasActivas').then(({ data, error }) => {
      if (error) setError(error);
      if (data) {
        // @TODO: esto es horrible, pero tiene que ver como se genera el Swagger
        //   y por ende, cómo se generan los tipos.
        const agendasActivas = (data as VistaResponse<AgendaListAgendasActivasListAgendasActivasResponseDto[]>).data;
        setData(agendasActivas);
      }
    });
  }, []);

  useEffect(fetch, [fetch]);

  return { data, error };
};
