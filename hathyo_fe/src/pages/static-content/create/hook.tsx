import { history } from '@umijs/max';
import { Form, message } from 'antd';

import { useCreateContentServices } from '@/services/static-content/services';

export const useCreate = () => {
  const [form] = Form.useForm();

  const onSuccess = () => {
    message.success('Tạo nội dung thành công');
    history.replace('/static-content');
  };

  const onError = (e: Error) => {
    console.log(e);
    message.error('Lỗi tạo nội dung');
  };

  const { loading, run } = useCreateContentServices({ onSuccess, onError });

  const onFinish = async () => {
    const values = await form.validateFields();
    run({ ...values });
  };

  return {
    form,
    loading,
    onFinish,
  };
};
