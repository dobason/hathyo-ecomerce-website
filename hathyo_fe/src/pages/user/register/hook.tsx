import { useRegisterServices } from '@/services/user/services';
import { history } from '@umijs/max';
import { Form, message } from 'antd';

export const useRegister = () => {
  const [form] = Form.useForm();

  const onSuccess = () => {
    history.replace('/user/login');
    message.success('Tạo tài khoản thành công!');
  };

  const onError = (e: Error) => {
    console.log(e);
    // message.error('Lỗi tạo tài khoản cửa hàng, vui lòng thử lại sau');
  };

  const { loading, run: onPost } = useRegisterServices({ onSuccess, onError });

  const onFinish = (values: API.RegisterParams) => {
    onPost({ ...values, roles: ['MERCHANT'] });
  };

  return {
    form,
    loading,
    onFinish,
  };
};
