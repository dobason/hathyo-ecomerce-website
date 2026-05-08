import { history } from '@umijs/max';
import { Form, message } from 'antd';

import { useCreatePostServices } from '@/services/posts/services';

export const useCreate = () => {
  const [form] = Form.useForm();

  const onSuccess = () => {
    message.success('Tạo bài viết thành công');
    history.replace('/posts');
  };

  const onError = (e: Error) => {
    console.log(e);
    message.error('Lỗi tạo bài viết');
  };

  const { loading, run } = useCreatePostServices({ onSuccess, onError });

  const onFinish = async ({ draft }: { draft?: boolean }) => {
    const values = await form.validateFields();
    if (!values?.fileUpload) {
      message.error('Vui lòng upload ảnh thumbnail!');
      return;
    }

    run({ ...values, draft });
  };

  return {
    form,
    loading,
    onFinish,
  };
};
