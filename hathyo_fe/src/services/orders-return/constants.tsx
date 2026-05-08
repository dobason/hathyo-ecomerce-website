import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';

export const ORDER_TYPE = {
  PERSONAL: 'PERSONAL',
  HOUSEHOLD: 'HOUSEHOLD',
  BUSINESS: 'BUSINESS',
};

export const ORDER_STATUS = {
  ALL: 'ALL',
  PENDING: 'PENDING',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  ACCEPTED: 'ACCEPTED',
  IN_REFUND: 'IN_REFUND',
  REFUNED: 'REFUNED',
  REJECTED: 'REJECTED',
};

export const ORDER_STATUS_COLOR = {
  [ORDER_STATUS.ALL]: 'processing',
  [ORDER_STATUS.PENDING]: 'processing',
  [ORDER_STATUS.IN_TRANSIT]: 'processing',
  [ORDER_STATUS.IN_REFUND]: 'processing',
  [ORDER_STATUS.REFUNED]: 'processing',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.ACCEPTED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'error',
  [ORDER_STATUS.REJECTED]: 'error',
};

export const ORDER_STATUS_ICON = {
  [ORDER_STATUS.ALL]: <CheckCircleOutlined spin />,
  [ORDER_STATUS.PENDING]: <SyncOutlined spin />,
  [ORDER_STATUS.IN_TRANSIT]: <SyncOutlined spin />,
  [ORDER_STATUS.IN_REFUND]: <SyncOutlined spin />,
  [ORDER_STATUS.DELIVERED]: <CheckCircleOutlined spin />,
  [ORDER_STATUS.ACCEPTED]: <CheckCircleOutlined spin />,
  [ORDER_STATUS.REFUNED]: <CheckCircleOutlined spin />,
  [ORDER_STATUS.CANCELLED]: <CloseCircleOutlined spin />,
  [ORDER_STATUS.REJECTED]: <CloseCircleOutlined spin />,
};

export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.ALL]: 'Tất cả',
  [ORDER_STATUS.PENDING]: 'Xử lý yêu cầu hoàn',
  [ORDER_STATUS.IN_REFUND]: 'Admin hoàn tiền',
  [ORDER_STATUS.REFUNED]: 'Đã hoàn tiền',
  [ORDER_STATUS.IN_TRANSIT]: 'Vận chuyển hàng về',
  [ORDER_STATUS.DELIVERED]: 'Đã hoàn về kho',
  [ORDER_STATUS.CANCELLED]: 'Hủy yêu cầu',
  [ORDER_STATUS.ACCEPTED]: 'Chấp nhận hoàn',
  [ORDER_STATUS.REJECTED]: 'Từ chối hoàn',
};
