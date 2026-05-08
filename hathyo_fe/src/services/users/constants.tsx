import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';

export const USER_TYPE = {
  PERSONAL: 'PERSONAL',
  HOUSEHOLD: 'HOUSEHOLD',
  BUSINESS: 'BUSINESS',
};

export const USER_TYPE_TEXT = {
  [USER_TYPE.PERSONAL]: 'Cá nhân',
  [USER_TYPE.HOUSEHOLD]: 'Hộ kinh doanh',
  [USER_TYPE.BUSINESS]: 'Doanh nghiệp',
};

export const USER_STATUS = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
};

export const USER_STATUS_COLOR = {
  [USER_STATUS.PENDING]: 'processing',
  [USER_STATUS.APPROVED]: 'success',
  [USER_STATUS.REJECTED]: 'error',
};

export const USER_STATUS_ICON = {
  [USER_STATUS.PENDING]: <SyncOutlined spin />,
  [USER_STATUS.APPROVED]: <CheckCircleOutlined spin />,
  [USER_STATUS.REJECTED]: <CloseCircleOutlined spin />,
};


export const USER_STATUS_TEXT = {
  [USER_STATUS.PENDING]: 'Chờ xử lý',
  [USER_STATUS.APPROVED]: 'Chấp nhận',
  [USER_STATUS.REJECTED]: 'Từ chối',
};
