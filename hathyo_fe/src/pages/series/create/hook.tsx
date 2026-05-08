import { history } from '@umijs/max';
import { Form, message } from 'antd';

import { useCreateSeriesServices } from '@/services/series/services';

export const useCreate = () => {
  const [form] = Form.useForm();

  const onSuccess = () => {
    console.log('success');
    history.replace('/series');
  };

  const onError = (e: Error) => {
    console.log(e);
    message.error('Lỗi tạo series');
  };

  const { loading, run } = useCreateSeriesServices({ onSuccess, onError });

  const onFinish = (values: API.SeriesFormValue) => {
    run(values);
  };

  return {
    form,
    loading,
    onFinish,
  };
};
