import { useParams, useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import dayjs from 'dayjs';

import { detailCoupon, patchStatus } from '@/services/coupons/api';
import { usePatchCouponServices } from '@/services/coupons/services';

export const useDetail = () => {
  const [form] = Form.useForm();
  const { id = '' } = useParams(); // id là integer (number as string)

  const {
    loading: getting,
    refresh,
    data: couponDetail,
  } = useRequest(() => detailCoupon({ id }));

  const updateStatusSuccess = () => {
    refresh();
    message.success('Cập nhật trạng thái thành công');
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
    message.success('Cập nhật thông tin coupon thành công');
    refresh();
  };

  const onError = () => {
    message.error('Lỗi khi cập nhật mã giảm giá');
  };

  const { loading, run: onPatch } = usePatchCouponServices({ onSuccess, onError });

  const onFinish = (values: API.CouponFormValue) => {
    if (!couponDetail?.image && !values?.image) {
      message.error('Vui lòng upload hình ảnh coupon!');
      return;
    }

    const payload: any = {
      ...values,
      id: Number(id),
    };

    // Chuyển đổi RangePicker về startAt, expiredAt
    if (values.dateRange) {
      const [start, end] = values.dateRange;
      payload.startAt = dayjs(start).format('YYYY-MM-DD HH:mm:ss');
      payload.expiredAt = dayjs(end).format('YYYY-MM-DD HH:mm:ss');
    }
    delete payload.dateRange;

    onPatch(payload);
  };

  useEffect(() => {
    if (!isEmpty(couponDetail)) {
      const { startAt, expiredAt, ...rest } = couponDetail;
      form.setFieldsValue({
        ...rest,
        dateRange: startAt && expiredAt ? [dayjs(startAt), dayjs(expiredAt)] : [],
      });
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
