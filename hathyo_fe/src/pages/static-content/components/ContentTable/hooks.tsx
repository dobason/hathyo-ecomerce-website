import { useRequest } from '@umijs/max';
import { useEffect } from 'react';

import { content } from '@/services/static-content/api';
import { useTableUrlParams } from '@/utils/func';

export const useContentsTable = () => {
  const { page, size} = useTableUrlParams();
  const { loading, data, run } = useRequest(
    () => content({ page: page - 1, size: size }),
    {
      manual: true,
    },
  );

  useEffect(() => {
    run();
  }, [page, size]);

  return {
    loading: loading,
    data,
    run,
  };
};
