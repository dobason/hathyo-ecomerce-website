import { useParams, useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import { isEmpty, map, pick } from 'lodash';
import { useEffect } from 'react';

import { deletePost, detailPost, patchStatus } from '@/services/posts/api';
import { usePatchPostServices } from '@/services/posts/services';

export const useDetail = () => {
  const [form] = Form.useForm();
  const { id = '' } = useParams();

  const { loading: getting, refresh, data: postDetail } = useRequest(() => detailPost({ id }));

  const onSuccess = () => {
    message.success('Cập nhật bài viết thành công');
    refresh();
  };

  const onError = (e: Error) => {
    console.log(e);
    message.error('Lỗi khi sửa bài viết');
  };

  const { loading, run: onPatch } = usePatchPostServices({ onSuccess, onError });

  const onFinish = (values: API.PostFormValue) => {
    if (!postDetail?.thumbnail && !values?.fileUpload) {
      message.error('Vui lòng upload ảnh thumbnail!');
      return;
    }

    onPatch({ ...values, id: postDetail?.id });
  };

  const onDeleteSuccess = () => {
    refresh();
    message.success('Xóa bài viết thành công');
  };

  const onPatchSuccess = () => {
    refresh();
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

  useEffect(() => {
    if (!isEmpty(postDetail)) {
      form.setFieldsValue({
        ...pick(postDetail, ['title', 'themeQuestion']),
        topic: postDetail?.topic?.id,
        tags: map(postDetail?.tags, (item) => item?.id),
        series: postDetail?.series?.id,
        content: postDetail?.content || '',
        indexOfContent: postDetail?.indexOfContent,
        description: postDetail?.description || '',
      });
    }
  }, [postDetail]);

  return {
    postDetail,
    form,
    loading: loading || getting || updating || deleting,
    onFinish,
    handleDelete: onDelete,
    handlePatchStatus,
  };
};
