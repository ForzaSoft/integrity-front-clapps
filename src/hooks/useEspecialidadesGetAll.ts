import client from '@/api/client';
import { Especialidades } from '@/api/types';
import { useCallback, useEffect, useState } from 'react';

export const useEspecialidadesGetAll = () => {
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Especialidades[]>([]);

  const fetch = useCallback(() => {
    client.GET('/Especialidades/GetAll').then(({ data, error }) => {
      if (error) setError(error);
      if (data) setData(data);
    });
  }, []);

  useEffect(fetch, [fetch]);

  return { data, error };
};
