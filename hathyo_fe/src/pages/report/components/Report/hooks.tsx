import { useRequest } from '@umijs/max';

import { getReport } from '@/services/report/api';
import { useEffect } from 'react';

export const useHathyoReport = () => {
  const { loading, data, run } = useRequest(() => getReport(), {
    manual: true,
  });

  useEffect(() => {
    run();
  }, []);

  return {
    loading: loading,
    data,
    run,
  };
};
