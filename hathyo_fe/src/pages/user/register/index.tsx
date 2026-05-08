import { Helmet, useLocation } from '@umijs/max';
import { Button, Card, Col, ConfigProvider, Form, Input, Row, Spin } from 'antd';
import React, { useMemo } from 'react';

import LogoWithText from '@/components/LogoWithText';
import Settings from '../../../../config/defaultSettings';
import { useRegister } from './hook';

const Register: React.FC = () => {
  const { loading, form, onFinish } = useRegister();
  const location = useLocation();

  // Xác định background dựa trên param giftcode
  const giftCode = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('hathyoGiftCode');
  }, [location.search]);

  const backgroundImage = giftCode ? "url('/Event.png')" : "url('/hathyo-register.png')";

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
        <title>Đăng ký - {Settings.title}</title>
      </Helmet>

      <div
        className="h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center px-4"
        style={{ backgroundImage }}
      >
        {giftCode && <div className="absolute inset-0 bg-white/60"></div>}
        <div
          className={`
          relative max-w-lg w-full flex flex-col justify-center items-center px-4 z-10 
          opacity-0 animate-fadeIn
        `}
        >
          <Spin spinning={loading} className="w-full">
            <Form layout="vertical" form={form} onFinish={onFinish} className="w-full">
              {/* Title + Logo + Subtitle */}
              <Card className="p-4">
                <div className="flex flex-col items-center gap-y-1 text-center mb-3">
                  <h1 className="text-xl font-semibold">Đăng ký bán hàng cùng</h1>
                  <LogoWithText width={100} height={24} />
                  <p className="text-sm text-gray-700">
                    Tiếp cận hơn <b>22 triệu lượt truy cập</b> mỗi tháng!
                  </p>
                </div>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' },
                      ]}
                      className="mb-2"
                    >
                      <Input size="large" placeholder="Nhập email" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="firstname"
                      label="Họ, tên đệm"
                      rules={[{ required: true, message: 'Nhập họ, tên đệm' }]}
                      className="mb-2"
                    >
                      <Input size="large" placeholder="Họ, tên đệm" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastname"
                      label="Tên"
                      rules={[{ required: true, message: 'Nhập tên' }]}
                      className="mb-2"
                    >
                      <Input size="large" placeholder="Tên" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="phoneNo"
                      label="Số điện thoại"
                      rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                        {
                          pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/,
                          message: 'Số điện thoại không hợp lệ',
                        },
                      ]}
                      className="mb-2"
                    >
                      <Input size="large" placeholder="Số điện thoại" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="storeName"
                      label="Tên cửa hàng"
                      rules={[{ required: true, message: 'Nhập tên cửa hàng' }]}
                      className="mb-2"
                    >
                      <Input size="large" placeholder="Tên cửa hàng" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="password"
                      label="Mật khẩu"
                      rules={[
                        { required: true, message: 'Nhập mật khẩu' },
                        { min: 8, message: 'Mật khẩu ít nhất 8 ký tự' },
                      ]}
                      className="mb-2"
                    >
                      <Input.Password size="large" placeholder="Nhập mật khẩu" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="confirmationPassword"
                      label="Nhập lại mật khẩu"
                      dependencies={['password']}
                      rules={[
                        { required: true, message: 'Mật khẩu bạn đã nhập không khớp' },
                        { min: 8, message: 'Mật khẩu ít nhất 8 ký tự' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu bạn đã nhập không khớp'));
                          },
                        }),
                      ]}
                      className="mb-2"
                    >
                      <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <div className="mt-4">
                <Button size="large" type="primary" htmlType="submit" className="w-full">
                  Đăng ký ngay
                </Button>
              </div>
            </Form>
          </Spin>

          <div className="text-center mt-3 text-sm text-black">
            Đã có gian hàng?{' '}
            <a href="/user/login" className="text-green-800 hover:underline font-medium">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Register;
