import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';

export const ORDER_TYPE = {
  PERSONAL: 'PERSONAL',
  HOUSEHOLD: 'HOUSEHOLD',
  BUSINESS: 'BUSINESS',
};

export const ORDER_STATUS = {
  ALL: 'ALL',
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
};

export const ORDER_STATUS_COLOR = {
  [ORDER_STATUS.ALL]: 'processing',
  // [ORDER_STATUS.CART]: 'processing',
  [ORDER_STATUS.PENDING]: 'processing',
  [ORDER_STATUS.IN_TRANSIT]: 'processing',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.ACCEPTED]: 'ACCEPTED',
  [ORDER_STATUS.CANCELLED]: 'error',
};

export const ORDER_STATUS_ICON = {
  [ORDER_STATUS.ALL]: <CheckCircleOutlined spin />,
  // [ORDER_STATUS.CART]: <SyncOutlined spin />,
  [ORDER_STATUS.PENDING]: <SyncOutlined spin />,
  [ORDER_STATUS.IN_TRANSIT]: <SyncOutlined spin />,
  [ORDER_STATUS.DELIVERED]: <CheckCircleOutlined spin />,
  [ORDER_STATUS.ACCEPTED]: <CheckCircleOutlined spin />,
  [ORDER_STATUS.CANCELLED]: <CloseCircleOutlined spin />,
};

export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.ALL]: 'Tất cả',
  // [ORDER_STATUS.CART]: 'Chờ xử lý',
  [ORDER_STATUS.PENDING]: 'Đang xử lý',
  [ORDER_STATUS.IN_TRANSIT]: 'Đang vận chuyển',
  [ORDER_STATUS.ACCEPTED]: 'Chờ vận chuyển',
  [ORDER_STATUS.DELIVERED]: 'Đã giao hàng',
  [ORDER_STATUS.CANCELLED]: 'Đã hủy',
};
