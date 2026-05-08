import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#0A703F',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Kênh người bán',
  pwa: true,
  logo: '/icons/logo-square.svg',
  iconfontUrl: '',
  token: {
    // Áp dụng màu nền cho Drawer khi ở mobile
    sider: {
      colorBgCollapsedButton: '#ffffff', // nút toggle khi thu gọn
      colorMenuBackground: '#f0f2f5',    // background của menu drawer mobile
      colorBgMenuItemCollapsedElevated: '#f0f2f5',
    },
  },
};

export default Settings;
