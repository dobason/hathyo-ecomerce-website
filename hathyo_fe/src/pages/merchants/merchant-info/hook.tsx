import { useParams, useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import { detailMerchant, patchStatus } from '@/services/merchants/api';
import { usePatchPostServices } from '@/services/merchants/services';

export const useDetail = () => {
  const [form] = Form.useForm();
  const { id = '' } = useParams();

  const {
    loading: getting,
    refresh,
    data: merchantDetail,
  } = useRequest(() => detailMerchant({ id }));

  const updateStatusSuccess = () => {
    refresh();
    message.success('Cập nhật trạng thái thành công');
  };

  const { loading: updating, run: updateStatus } = useRequest((params) => patchStatus(params), {
    manual: true,
    onSuccess: updateStatusSuccess,
  });

  const changeStatus = ({ status }: API.UpdateMerchantStatusParams) => {
    updateStatus({ status, id });
  };

  const onSuccess = () => {
    message.success('Cập nhật thông tin merchant thành công');
    refresh();
  };

  const onError = (e: Error) => {
    console.log(e);
    message.error('Lỗi khi sửa bài viết');
  };

  const { loading, run: onPatch } = usePatchPostServices({ onSuccess, onError });

  const onFinish = (values: API.Merchants) => {
    if (!merchantDetail?.logo && !values?.fileUpload) {
      message.error('Vui lòng upload ảnh logo!');
      return;
    }
    onPatch({ ...values, id: merchantDetail?.id });
  };

  useEffect(() => {
    if (!isEmpty(merchantDetail)) {
      form.setFieldsValue(merchantDetail);
    }
  }, [merchantDetail]);

  return {
    merchantDetail,
    form,
    loading: loading || getting || updating,
    onFinish,
    changeStatus,
  };
};
