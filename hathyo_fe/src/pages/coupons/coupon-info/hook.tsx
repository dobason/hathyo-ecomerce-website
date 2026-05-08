import { useParams, useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import { detailCoupon, patchStatus } from '@/services/coupons/api';
import { usePatchCouponServices } from '@/services/coupons/services';

export const useDetail = () => {
  const [form] = Form.useForm();
  const { id = '' } = useParams(); // id: string

  const {
    loading: getting,
    refresh,
    data: couponDetail,
  } = useRequest(() => detailCoupon({ id }), { refreshDeps: [id] });

  const updateStatusSuccess = () => {
    refresh();
    message.success('Cập nhật trạng thái coupon thành công');
  };

  const { loading: updating, run: updateStatus } = useRequest(
    (params: { id: number; status: boolean }) => patchStatus(params),
    {
      manual: true,
      onSuccess: updateStatusSuccess,
    }
  );

  const changeStatus = ({ status }: { status: boolean }) => {
    updateStatus({ id: Number(id), status });
  };

  const onSuccess = () => {
    message.success('Cập nhật coupon thành công');
    refresh();
  };

  const onError = () => {
    message.error('Lỗi khi cập nhậtmã giảm giá);
  };

  const { loading, run: onPatch } = usePatchCouponServices({ onSuccess, onError });

  const onFinish = (values: API.CouponFormValue) => {
    if (!couponDetail?.image && !values?.image) {
      message.error('Vui lòng upload hình ảnh coupon!');
      return;
    }
    onPatch({ ...values, id: Number(id) });
  };

  useEffect(() => {
    if (!isEmpty(couponDetail)) {
      form.setFieldsValue(couponDetail);
    }
  }, [couponDetail]);

  return {
    couponDetail,
    form,
    loading: loading || getting || updating,
    onFinish,
    changeStatus,
  };
};
