import { history, useRequest } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

import { listUsers, patchStatus } from '@/services/users/api';
import { useTableUrlParams } from '@/utils/func';

export const useUsersTable = () => {
  const { page, size, q } = useTableUrlParams();

  // Gọi đúng hàm listUsers
  const { loading, data, run } = useRequest(() => listUsers({ page: page - 1, size, q }), {
    manual: true,
  });

  const updateStatusSuccess = () => {
    run();
    message.success('Cập nhật trạng thái thành công');
  };

  const { loading: deleting, run: updateStatus } = useRequest(
    (params: { banned: boolean; userId: string }) => patchStatus(params),
    { manual: true, onSuccess: updateStatusSuccess },
  );

  const changeStatus = ({ banned, userId }: { banned: boolean; userId: string }) => {
    updateStatus({ banned, userId });
  };

  useEffect(() => {
    run();
  }, [page, size, q]);

  return {
    loading: loading || deleting,
    data,
    run,
    changeStatus,
  };
};

export const useSearch = () => {
  const onFinish = (values: { q: string }) => {
    history.push({ pathname: '/users', search: `page=1&size=10&q=${values.q || ''}` });
  };
  return { onFinish };
};
