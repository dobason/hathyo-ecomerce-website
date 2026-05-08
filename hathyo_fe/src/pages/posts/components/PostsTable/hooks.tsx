import { history, useRequest } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

import { addHome, deletePost, patchStatus, post } from '@/services/posts/api';
import { useTableUrlParams } from '@/utils/func';
import moment from 'moment';
import QueryString from 'qs';

export const usePostsTable = () => {
  const { page, size, q, type, topic, createdTo, createdFrom } = useTableUrlParams();
  const { loading, data, run } = useRequest(
    () => post({ page: page - 1, size: size, q, type, topic, createdTo, createdFrom }),
    {
      manual: true,
    },
  );

  const onDeleteSuccess = () => {
    run();
    message.success('Xóa bài viết thành công');
  };

  const onPatchSuccess = () => {
    run();
    message.success('Cập nhật bài viết thành công');
  };

  const { loading: deleting, run: onDelete } = useRequest((id) => deletePost({ id }), {
    manual: true,
    onSuccess: onDeleteSuccess,
  });

  const { loading: updating, run: handlePatchStatus } = useRequest(
    ({ id, status }) => patchStatus({ id, status, note: '' }),
    {
      manual: true,
      onSuccess: onPatchSuccess,
    },
  );

  const { loading: showing, run: showAddHome } = useRequest(({ id }) => addHome({ id }), {
    manual: true,
    onSuccess: onPatchSuccess,
  });

  useEffect(() => {
    run();
  }, [page, size, q, type, topic, createdTo, createdFrom]);

  return {
    loading: loading || deleting || updating || showing,
    data,
    run,
    showAddHome,
    handleDelete: onDelete,
    handlePatchStatus,
  };
};

export const useSearch = () => {
  const onFinish = (values: API.PostSearch) => {
    const search = QueryString.stringify({
      page: 1,
      size: 10,
      q: values?.q || '',
      type: values?.type || '',
      topic: values?.topic || '',
      createdFrom: values?.time?.[0] ? moment(values?.time?.[0]).format('YYYY-MM-DD') : '',
      createdTo: values?.time?.[1] ? moment(values?.time?.[1]).format('YYYY-MM-DD') : '',
    });
    history.push({
      pathname: '/posts',
      search,
    });
  };

  return {
    onFinish,
  };
};
