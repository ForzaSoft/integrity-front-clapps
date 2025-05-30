import client from '@/api/client';
import { Nomencladores } from '@/api/types';
import { useCallback, useEffect, useState } from 'react';

export const useNomencladoresGetAll = () => {
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Nomencladores[]>([]);

  const fetch = useCallback(() => {
    client.GET('/Nomencladores/GetAll').then(({ data, error }) => {
      if (error) setError(error);
      if (data) setData(data);
    });
  }, []);

  useEffect(fetch, [fetch]);

  return { data, error, refetch: fetch };
};
