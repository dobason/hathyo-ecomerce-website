import { history, useRequest } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

// import { deletePost, post } from '@/services/posts/api';
import { merchants, patchStatus } from '@/services/merchants/api';
import { useTableUrlParams } from '@/utils/func';

export const useMerchantsTable = () => {
  const { page, size, q } = useTableUrlParams();
  const { loading, data, run } = useRequest(() => merchants({ page: page - 1, size: size, q }), {
    manual: true,
  });

  const updateStatusSuccess = () => {
    run();
    message.success('Cập nhật trạng thái thành công');
  };

  const { loading: deleting, run: updateStatus } = useRequest((params) => patchStatus(params), {
    manual: true,
    onSuccess: updateStatusSuccess,
  });

  const changeStatus = ({ status, id }: API.UpdateMerchantStatusParams) => {
    updateStatus({ status, id });
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
    history.push({ pathname: '/user-management/merchants', search: `page=1&size=10&q=${values?.q || ''}` });
  };

  return {
    onFinish,
  };
};
