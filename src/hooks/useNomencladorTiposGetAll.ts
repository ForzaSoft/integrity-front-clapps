import client from '@/api/client';
import { NomencladorTipos } from '@/api/types';
import { useCallback, useEffect, useState } from 'react';

export const useNomencladorTiposGetAll = () => {
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<NomencladorTipos[]>([]);

  const fetch = useCallback(() => {
    client.GET('/NomencladorTipos/GetAll').then(({ data, error }) => {
      if (error) setError(error);
      if (data) setData(data);
    });
  }, []);

  useEffect(fetch, [fetch]);

  return { data, error };
};
