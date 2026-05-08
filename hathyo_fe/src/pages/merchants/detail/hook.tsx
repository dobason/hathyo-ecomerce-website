import { useParams, useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import { detailMerchant, patchStatus } from '@/services/merchants/api';
import { usePatchPostServices } from '@/services/merchants/services';

import { getCurrentStepCompleted } from '@/utils/func';

export const useDetail = () => {
  const [form] = Form.useForm();
  const { id = '' } = useParams();
  const [current, setCurrent] = useState(0);

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
    message.error('Lỗi khi cập nhật thông tin người dùng');
  };

  const { loading, run: onPatch } = usePatchPostServices({ onSuccess, onError });

  const onFinish = (values: API.Merchants) => {
    if (!merchantDetail?.logo && !values?.fileUpload) {
      message.error('Vui lòng upload ảnh logo!');
      return;
    }
    if (current === 2 && !merchantDetail?.identityImageBack && !values?.identityImageBackTempt) {
      message.error('Vui lòng upload ảnh mặt sau CCCD!');
      return;
    }
    if (current === 2 && !merchantDetail?.identityImageFront && !values?.identityImageFrontTempt) {
      message.error('Vui lòng upload ảnh mặt trước CCCD!');
      return;
    }
    if (current === 1 && !merchantDetail?.businessLicense && !values?.businessLicenseTempt) {
      message.error('Vui lòng upload ảnh giấy phép kinh doanh!');
      return;
    }
    console.log('🧪 onFinish payload:', { ...values, id: merchantDetail?.id });
    onPatch({ ...values, id: merchantDetail?.id });
  };

  useEffect(() => {
    if (!isEmpty(merchantDetail)) {
      form.setFieldsValue(merchantDetail);
      setCurrent(getCurrentStepCompleted(merchantDetail));
    }
  }, [merchantDetail]);

  return {
    merchantDetail,
    form,
    loading: loading || getting || updating,
    current,
    setCurrent,
    onFinish,
    changeStatus,
  };
};
