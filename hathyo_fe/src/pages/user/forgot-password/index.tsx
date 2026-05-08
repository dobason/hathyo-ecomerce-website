import { Helmet, useIntl, useModel, history } from '@umijs/max';
import { Button, ConfigProvider, Form, Input, message } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';
import { flushSync } from 'react-dom';

import { login } from '@/services/user/auth';
import Settings from '../../../../config/defaultSettings';

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: { email: string }) => {
    try {
      const response = await login(values);
      if (response?.accessToken) {
        message.success(
          intl.formatMessage({
            id: 'pages.login.success',
            defaultMessage: 'Đăng nhập thành công',
          }),
        );
        Cookies.set('accessToken', response.accessToken);
        Cookies.set('refreshToken', response.refreshToken);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.login.failure',
          defaultMessage: 'Có lỗi xảy ra trong quá trình đăng nhập, vui lòng thử lại sau',
        }),
      );
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0A703F',
          fontFamily: 'Montserrat',
        },
      }}
    >
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: 'Quên mật khẩu',
          })}{' '}
          - {Settings.title}
        </title>
      </Helmet>

      <div
        className="h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
        }}
      >
        <div className="w-full max-w-md flex flex-col items-center gap-y-2">
          <img
            src="/icons/HathyoV1_Rectangle_Full.svg"
            alt="logo"
            className="w-[150px]"
          />
          <h1 className="text-xl font-semibold text-center">QUÊN MẬT KHẨU</h1>
          <p className="text-sm text-gray-700 text-center font-medium">
            Cùng bạn vui khỏe hơn!
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="w-full mt-4"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập email đã đăng ký',
                },
                {
                  type: 'email',
                  message: 'Email không hợp lệ',
                },
              ]}
              className="mb-4"
            >
              <Input size="large" placeholder="Nhập email đã đăng ký" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="!bg-[#0A703F]"
            >
              Gửi yêu cầu
            </Button>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ForgotPassword;
