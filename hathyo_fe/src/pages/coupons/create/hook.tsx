import { history } from '@umijs/max';
import { Form, message } from 'antd';
import dayjs from 'dayjs';

import { useCreateCouponServices } from '@/services/coupons/services';

export const useCreate = () => {
  const [form] = Form.useForm();

  const onSuccess = (data: any) => {
    message.success('Tạo mã giảm giá thành công');
    history.push(`/coupons/detail?id=${data?.id}`, {
      state: {
        ...form.getFieldsValue(),
        id: data?.id,
        image: data?.image, // do image upload đã được xử lý
        startAt: data?.startAt,
        expiredAt: data?.expiredAt,
        dateRange: [dayjs(data?.startAt), dayjs(data?.expiredAt)],
      },
    });
  };

  const onError = (e: Error) => {
    console.error(e);
    message.error('Lỗi tạo mã giảm giá');
  };

  const { loading, run } = useCreateCouponServices({ onSuccess, onError });

  const onFinish = async () => {
    const values = await form.validateFields();

    if (!values?.image) {
      message.error('Vui lòng upload ảnh của coupon!');
      return;
    }

    const body: any = {
      ...values,
      merchantId: null,
      productId: null,
    };

    if (values.dateRange && values.dateRange.length === 2) {
      const [start, end] = values.dateRange;
      body.startAt = dayjs(start).format();
      body.expiredAt = dayjs(end).format();
    }

    delete body.dateRange;

    run(body);
  };

  return {
    form,
    loading,
    onFinish,
  };
};
