import { history, useRequest } from '@umijs/max';
import { message } from 'antd';
import QueryString from 'qs';
import { useEffect } from 'react';

import { deleteProduct, patchStatus, products } from '@/services/products/api';
import { useTableUrlParams } from '@/utils/func';

export const useProductTable = () => {
  const { page, size, q, categoryId, status } = useTableUrlParams();
  const { loading, data, run } = useRequest(
    () => products({ page: page - 1, size: size, q, shopCategoryId: categoryId, status }),
    {
      manual: true,
    },
  );

  const onDeleteSuccess = () => {
    run();
    message.success('Xóa sản phẩm thành công');
  };

  const onPatchSuccess = () => {
    run();
    message.success('Cập nhật sản phẩm thành công');
  };

  const { loading: deleting, run: onDelete } = useRequest((id) => deleteProduct({ id }), {
    manual: true,
    onSuccess: onDeleteSuccess,
  });

  const { loading: updating, run: handlePatchStatus } = useRequest(
    ({ id, status, rejectionReason }) => patchStatus({ id, status, rejectionReason }),
    {
      manual: true,
      onSuccess: onPatchSuccess,
    },
  );

  useEffect(() => {
    run();
  }, [page, size, q, categoryId, status]);

  return {
    loading: loading || deleting || updating,
    data,
    run,
    handleDelete: onDelete,
    handlePatchStatus,
  };
};

export const useSearch = () => {
  const onFinish = (values: API.ProductSearch) => {
    const search = QueryString.stringify({
      page: 1,
      size: 10,
      status: values?.status || 'ALL',
      q: values?.q || '',
      categoryId: values.categoryId || '',
    });
    history.push({
      pathname: '/products/list',
      search,
    });
  };

  return {
    onFinish,
  };
};
