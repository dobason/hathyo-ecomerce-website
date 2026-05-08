import { history, useRequest } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

import { deleteSeries, series } from '@/services/series/api';
import { useTableUrlParams } from '@/utils/func';

export const useSeriesTable = () => {
  const { page, size, q } = useTableUrlParams();
  const { loading, data, run } = useRequest(() => series({ page: page - 1, size: size, q }), {
    manual: true,
  });

  const onDeleteSuccess = () => {
    run();
    message.success('Xóa series thành công');
  };

  const { loading: deleting, run: onDelete } = useRequest((id) => deleteSeries({ id }), {
    manual: true,
    onSuccess: onDeleteSuccess,
  });

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  useEffect(() => {
    run();
  }, [page, size, q]);

  return {
    loading: loading || deleting,
    data,
    run,
    handleDelete,
  };
};

export const useSearch = () => {
  const onFinish = (values: { q: string }) => {
    history.push({ pathname: '/series', search: `page=1&size=10&q=${values?.q || ''}` });
  };
  return {
    onFinish,
  };
};
