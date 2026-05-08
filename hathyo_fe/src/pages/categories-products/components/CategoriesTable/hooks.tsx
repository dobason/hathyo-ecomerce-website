import { useRequest } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';

import { list } from '@/services/categories/api';
import { useCreateCateServices, useDeleteCateServices } from '@/services/categories/services';

export const useCategoriesTable = () => {
  const [visible, setVisible] = useState(false);
  const { loading, data, run } = useRequest(list);

  const patchSuccess = () => {
    setVisible(false);
    run();
    message.success('Cập nhật danh mục thành công');
  };

  const patchError = (e: any) => {
    console.log(e);
    message.error('Có lỗi xảy ra, vui lòng thử lại');
  };
  const { loading: posting, run: onCreate } = useCreateCateServices({
    onSuccess: patchSuccess,
    onError: patchError,
  });
  const { loading: deleting, run: onDelete } = useDeleteCateServices({
    onSuccess: patchSuccess,
    onError: patchError,
  });

  return {
    loading: loading || posting || deleting,
    data,
    visible,
    run,
    setVisible,
    onCreate,
    onDelete,
  };
};
