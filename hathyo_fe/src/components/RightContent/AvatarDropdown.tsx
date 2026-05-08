'use client';

import {
  ExclamationCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Dropdown, MenuProps, Modal, Spin } from 'antd';
import { createStyles } from 'antd-style';
import Cookies from 'js-cookie';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';

const { confirm } = Modal;

/** ✅ Styles */
const useStyles = createStyles(({ token }) => ({
  action: {
    display: 'flex',
    height: '48px',
    marginLeft: 'auto',
    overflow: 'hidden',
    alignItems: 'center',
    padding: '0 8px',
    cursor: 'pointer',
    borderRadius: token.borderRadius,
    '&:hover': {
      backgroundColor: token.colorBgTextHover,
    },
  },
}));

export const AvatarDropdown: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { styles } = useStyles();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);

  const loginOut = async () => {
    setLoading(true);
    try {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      localStorage.removeItem('avatar');
      const { search, pathname } = window.location;
      const urlParams = new URL(window.location.href).searchParams;
      const redirect = urlParams.get('redirect');
      if (pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({ redirect: pathname + search }),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const showLogoutConfirm = () => {
    confirm({
      title: 'Xác nhận đăng xuất',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      okType: 'danger',
      centered: true,
      onOk: async () => {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        await loginOut();
      },
    });
  };

  const onMenuClick = useCallback(
    async (event: MenuInfo) => {
      if (loading) return;
      const { key } = event;

      if (key === 'logout') {
        showLogoutConfirm();
        return;
      }

      let to = '';
      switch (key) {
        case 'profile':
          to = '/account/profile';
          break;
        case 'shop':
          to = '/user-management/merchant-info';
          break;
        case 'change-password':
          to = '/account/change-password';
          break;
        default:
          to = `account/${key}`;
      }

      history.push(to);
    },
    [loading],
  );

  if (!initialState) {
    return (
      <span className={styles.action}>
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </span>
    );
  }

  const { currentUser } = initialState;
  if (!currentUser || !currentUser.email) {
    return (
      <span className={styles.action}>
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </span>
    );
  }

  /** ✅ Menu items */
  const menuItems: MenuProps['items'] = [
    {
      type: 'group',
      label: <span className="font-semibold">{currentUser.fullName ?? currentUser.email}</span>,
      key: 'user-info',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
      disabled: loading,
    },
    {
      key: 'shop',
      icon: <ShopOutlined />,
      label: 'Thông tin cửa hàng',
      disabled: loading,
    },
    {
      key: 'change-password',
      icon: <SettingOutlined />,
      label: 'Đổi mật khẩu',
      disabled: loading,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: loading ? 'Đang đăng xuất...' : 'Đăng xuất',
      disabled: loading,
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: onMenuClick,
      }}
      placement="bottomRight"
      arrow
    >
      <div className="flex items-center px-2 cursor-pointer min-w-[40px] h-[48px]">
        {loading ? <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} /> : children}
      </div>
    </Dropdown>
  );
};
