import { AvatarDropdown, NoticeIcon } from '@/components';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { Button, ConfigProvider, Result } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { currentUser } from './services/user/auth';

const loginPath = '/user/login';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await currentUser();
      return msg;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    avatarProps: {
      src:
        localStorage.getItem('avatar') ||
        initialState?.currentUser?.avatar ||
        '/icons/logo-square.svg',
      // title: <AvatarName />,
      render: (_, avatarChildren) => <AvatarDropdown>{avatarChildren}</AvatarDropdown>,
    },
    /** ✅ Đây là nơi đúng để hiển thị NoticeIcon với phiên bản của bạn */
    headerContentRender: () => {
      return (
        <div className="flex justify-end items-center w-full gap-4 pr-4">
          <NoticeIcon />
        </div>
      );
    },
    waterMarkProps: {},
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    unAccessible: (
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, Bạn không được phép truy cập đường dẫn này."
        extra={
          <Button onClick={() => history.replace('/')} type="primary">
            Về trang chủ
          </Button>
        }
      />
    ),
    childrenRender: (children) => {
      return (
        <ConfigProvider
          locale={viVN}
          theme={{
            token: {
              colorPrimary: '#0A703F',
              fontFamily: 'Montserrat',
            },
          }}
        >
          {children}
        </ConfigProvider>
      );
    },
    ...initialState?.settings,
  };
};

export const request = {
  ...errorConfig,
};
