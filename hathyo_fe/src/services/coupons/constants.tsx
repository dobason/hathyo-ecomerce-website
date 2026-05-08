import { CheckCircleTwoTone, ClockCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';

export const COUPON_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  EXPIRED: 'EXPIRED',
} as const;

export const COUPON_STATUS_TAG = {
  [COUPON_STATUS.ACTIVE]: <Tag color="green">Đang hoạt động</Tag>,
  [COUPON_STATUS.INACTIVE]: <Tag color="red">Ngừng hoạt động</Tag>,
  [COUPON_STATUS.EXPIRED]: <Tag color="orange">Hết hạn</Tag>,
};

export const MAPPING_COUPON_STATUS_ACTION_INFO = {
  [COUPON_STATUS.ACTIVE]: {
    label: 'Kích hoạt mã giảm giá',
    key: COUPON_STATUS.ACTIVE,
    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    isAdmin: true,
  },
  [COUPON_STATUS.INACTIVE]: {
    label: 'Ngừng áp dụng mã giảm giá',
    key: COUPON_STATUS.INACTIVE,
    icon: <StopTwoTone twoToneColor="#cf1322" />,
    isAdmin: true,
  },
  [COUPON_STATUS.EXPIRED]: {
    label: 'Hết hạn',
    key: COUPON_STATUS.EXPIRED,
    icon: <ClockCircleTwoTone twoToneColor="#d46b08" />,
    isAdmin: false,
  },
};

export const MAPPING_COUPON_STATUS_WITH_ACTION = {
  [COUPON_STATUS.ACTIVE]: [MAPPING_COUPON_STATUS_ACTION_INFO[COUPON_STATUS.INACTIVE]],
  [COUPON_STATUS.INACTIVE]: [MAPPING_COUPON_STATUS_ACTION_INFO[COUPON_STATUS.ACTIVE]],
  [COUPON_STATUS.EXPIRED]: [],
};

export const DISCOUNT_TYPE_OPTIONS = [
  { label: 'Theo phần trăm', value: 'PERCENT' },
  { label: 'Theo số tiền', value: 'VALUE' },
];

export const COUPON_TYPE_OPTIONS = [
  { label: 'HATHYO', value: 'HATHYO' },
  { label: 'SYSTEM', value: 'SYSTEM' },
  { label: 'MERCHANT', value: 'MERCHANT' },
];
