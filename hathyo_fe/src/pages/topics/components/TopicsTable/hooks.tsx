import { useRequest } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';

import { list } from '@/services/topics/api';
import {
  useCreateTopicServices,
  useDeleteTopicServices,
  usePatchTopicServices,
} from '@/services/topics/services';

export const useTopicsTable = () => {
  const [visible, setVisible] = useState(false);
  const { loading, data, run } = useRequest(list);

  const patchSuccess = () => {
    setVisible(false);
    run();
    message.success('Cập nhật topic thành công');
  };

  const patchError = (e: any) => {
    console.log(e);
    message.error('Có lỗi xảy ra, vui lòng thử lại');
  };
  const { loading: patching, run: onChangeTitle } = usePatchTopicServices({
    onSuccess: patchSuccess,
    onError: patchError,
  });
  const { loading: posting, run: onCreate } = useCreateTopicServices({
    onSuccess: patchSuccess,
    onError: patchError,
  });
  const { loading: deleting, run: onDelete } = useDeleteTopicServices({
    onSuccess: patchSuccess,
    onError: patchError,
  });

  return {
    loading: loading || patching || posting || deleting,
    data,
    visible,
    run,
    onChangeTitle,
    setVisible,
    onCreate,
    onDelete,
  };
};
