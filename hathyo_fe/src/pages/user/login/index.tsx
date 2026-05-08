import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
import { ConfigProvider, message } from 'antd';
import { createStyles } from 'antd-style';
import Cookies from 'js-cookie';
import React from 'react';
import { flushSync } from 'react-dom';

import { login } from '@/services/user/auth';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
    subTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const intl = useIntl();

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

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const response = await login({ ...values });
      if (response?.accessToken) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Đăng nhập thành công',
        });
        message.success(defaultLoginSuccessMessage);
        Cookies.set('accessToken', response?.accessToken as string);
        Cookies.set('refreshToken', response?.refreshToken as string);
        await fetchUserInfo();
        // const urlParams = new URL(window.location.href).searchParams;
        history.push('/user-management/merchant-info');
        return;
      }
      console.log(response);
      // setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Có lỗi xảy ra trong quá trình đăng nhập, vui lòng thử lại sau',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
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
      <div className={styles.container}>
        <Helmet>
          <title>
            {intl.formatMessage({
              id: 'menu.login',
              defaultMessage: 'Bán hàng cùng Hathyo',
            })}{' '}
            - {Settings.title}
          </title>
        </Helmet>
        <Lang />
        <div
          style={{
            backgroundColor: 'white',
            height: '100vh',
          }}
        >
          <LoginFormPage
            backgroundImageUrl="/hathyo-banner.jpg"
            logo="/logo.svg"
            title="Hathyo"
            subTitle={<div className={styles.subTitle}>CÙNG BẠN VUI KHỎE HƠN!</div>}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
            actions={
              <div
                style={{
                  marginBottom: 8,
                  textAlign: 'center',
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Chưa có gian hàng?&nbsp;
                <a href="/user/register" style={{}}>
                  Đăng ký ngay
                </a>
              </div>
            }
          >
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'Nhập email đã đăng ký của bạn',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Nhập email/ username"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: 'Nhập mật khẩu',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Nhập mật khẩu"
                    />
                  ),
                },
              ]}
            />

            <div
              style={{
                marginBottom: 8,
                textAlign: 'right',
              }}
            >
              <a href="/user/forgot-password" style={{}}>
                Quên mật khẩu?&nbsp;
              </a>
            </div>
          </LoginFormPage>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
