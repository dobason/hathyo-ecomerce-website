import { history, useRequest } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

import { getCoupons, patchStatus } from '@/services/coupons/api';
import { useTableUrlParams } from '@/utils/func';

export const useCouponsTable = () => {
  const { page, size, q } = useTableUrlParams();

  const { loading, data, run } = useRequest(
    () => getCoupons({ page: page - 1, size }),
    { manual: true }
  );

  const { loading: updating, run: updateStatus } = useRequest(patchStatus, {
    manual: true,
    onSuccess: () => {
      message.success('Cập nhật trạng thái coupon thành công');
      run(); // refresh list
    },
  });

  const changeStatus = (payload: { id: number; status: boolean }) => {
    updateStatus(payload);
  };

  useEffect(() => {
    run();
  }, [page, size, q]);

  return {
    loading: loading || updating,
    data,
    run,
    changeStatus,
  };
};

export const useSearch = ({ run }: { run: () => Promise<any> }) => {
  const onFinish = (values: { q: string }) => {
    const query = values?.q?.trim() || '';
    history.push(`/coupons?page=1&size=10&q=${encodeURIComponent(query)}`);

    // optional: short delay for routing to complete before re-run
    setTimeout(() => {
      run();
    }, 100);
  };

  return {
    onFinish,
  };
};
