import { useParams, useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import { detailContent } from '@/services/static-content/api';
import { usePatchContentServices } from '@/services/static-content/services';

export const useDetail = () => {
  const [form] = Form.useForm();
  const { code = '' } = useParams();

  const {
    loading: getting,
    refresh,
    data: contentDetail,
  } = useRequest(() => detailContent({ code }));

  const onSuccess = () => {
    message.success('Cập nhật bài viết thành công');
    refresh();
  };

  const onError = (e: Error) => {
    console.log(e);
    message.error('Lỗi khi sửa bài viết');
  };

  const { loading, run: onPatch } = usePatchContentServices({ onSuccess, onError });

  const onFinish = (values: API.ContentFormValue) => {
    onPatch({ ...values, code: contentDetail?.code });
  };

  useEffect(() => {
    if (!isEmpty(contentDetail)) {
      form.setFieldsValue({
        ...contentDetail,
      });
    }
  }, [contentDetail]);

  return {
    contentDetail,
    form,
    loading: loading || getting,
    onFinish,
  };
};
