export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: 'login', path: 'login', component: './user/login' },
      { name: 'forgot-password', path: 'forgot-password', component: './user/forgot-password' },
      { name: 'register', path: 'register', component: './user/register' },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    access: 'not_viewer',
    icon: 'HomeOutlined',
    component: './dashboard',
  },
  {
    path: '/report',
    name: 'report',
    icon: 'AreaChartOutlined',
    access: 'viewer',
    component: './report',
  },
  {
    path: '/posts-management',
    name: 'posts-management',
    icon: 'FileTextOutlined',
    access: 'topics_crud',
    routes: [
      {
        path: 'posts',
        name: 'posts',
        icon: 'LaptopOutlined',
        routes: [
          { path: '', name: 'list', component: './posts' },
          { path: 'create', name: 'create', hideInMenu: true, component: './posts/create' },
          { path: ':id', name: 'detail', hideInMenu: true, component: './posts/detail' },
        ],
      },
      {
        path: 'static-content',
        name: 'static-content',
        icon: 'CodeOutlined',
        access: 'admin',
        routes: [
          { path: '', name: 'list', component: './static-content' },
          { path: 'create', name: 'create', hideInMenu: true, component: './static-content/create' },
          { path: ':code', name: 'detail', hideInMenu: true, component: './static-content/detail' },
        ],
      },
      {
        path: 'series',
        name: 'series',
        icon: 'DeploymentUnitOutlined',
        access: 'series_crud',
        routes: [
          { path: '', name: 'list', component: './series' },
          { path: 'create', name: 'create', hideInMenu: true, component: './series/create' },
          { path: ':id', name: 'detail', hideInMenu: true, component: './series/detail' },
        ],
      },
      {
        path: 'topics',
        name: 'topics',
        icon: 'BookOutlined',
        access: 'topics_crud',
        component: './topics'
      },
    ],
  },
  {
    path: '/user-management',
    name: 'user-management',
    icon: 'TeamOutlined',
    access: 'merchants_crud',
    routes: [
      {
        path: 'merchants',
        name: 'merchants',
        icon: 'ShopOutlined',
        routes: [
          { path: '', name: 'list', component: './merchants' },
          { path: ':id', name: 'detail', component: './merchants/detail', hideInMenu: true },
          { path: 'detail', name: 'detail', component: './merchants/detail', hideInMenu: true },
        ],
      },
      {
        path: 'merchant-info',
        name: 'merchant-info',
        icon: 'ShopOutlined',
        access: 'merchants_detail',
        component: './merchants/merchant-info',
      },
      {
        path: 'users',
        name: 'users',
        icon: 'UserOutlined',
        component: './users'
      },
    ],
  },
  {
    path: '/account',
    name: 'account',
    hideInMenu: true,
    routes: [
      {
        path: 'change-password',
        name: 'change-password',
        hideInMenu: true,
        component: './account/change-password',
      },
            { name: 'profile', path: 'profile', component: './account/profile' },
    ],
  },
  {
    path: '/products',
    name: 'products',
    access: 'not_viewer',
    icon: 'InboxOutlined',
    routes: [
      { path: 'list', name: 'list', component: './products' },
      { path: 'create', name: 'create', component: './products/create', hideInMenu: true },
      { path: ':id', name: 'detail', component: './products/detail', hideInMenu: true },
      { path: 'categories-products', name: 'categories-products', component: './categories-products' },
    ],
  },
  {
    path: '/coupons',
    name: 'coupons',
    icon: 'GiftOutlined',
    access: 'admin',
    routes: [
      { path: '', name: 'list', component: './coupons' },
      { path: 'create', name: 'create', hideInMenu: true, component: './coupons/create' },
      { path: ':id', name: 'detail', hideInMenu: true, component: './coupons/detail' },
    ],
  },
  {
    path: '/orders',
    name: 'orders',
    icon: 'SnippetsOutlined',
    access: 'not_viewer',
    routes: [
      { path: 'list', name: 'list', component: './orders' },
      { path: 'return', name: 'return', component: './orders/return' },
    ],
  },
  {
    path: '/',
    wrappers: ['@/page-wrapper/home'],
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
