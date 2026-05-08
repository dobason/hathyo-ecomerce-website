import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message } from 'antd';
import React from 'react';

import { changePassword } from '@/services/user/auth';

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();

  const onSubmit = async (values: API.ChangePasswordParams) => {
    try {
      const response = await changePassword({ ...values });
      if (response?.accessToken) {
        message.success('Đổi mật khẩu thành công');
        return;
      }
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra trong quá trình đổi mật khẩu, vui lòng thử lại sau');
    }
  };

  return (
    <PageContainer>
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <Form
            form={form}
            name="change-password"
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            className="space-y-4"
          >
            <Form.Item
              label={<span className="font-semibold">Mật khẩu hiện tại</span>}
              name="currentPassword"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu hiện tại" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Mật khẩu mới</span>}
              name="newPassword"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                { min: 8, message: 'Mật khẩu ít nhất 8 ký tự' },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Nhập lại mật khẩu mới</span>}
              name="confirmationPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu mới bạn đã nhập không khớp'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block className="!bg-[#0A703F]">
              Cập nhật mật khẩu
            </Button>
          </Form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ChangePassword;
