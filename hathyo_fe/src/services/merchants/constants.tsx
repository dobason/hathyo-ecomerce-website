import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';

export const MERCHANT_TYPE = {
  PERSONAL: 'PERSONAL',
  HOUSEHOLD: 'HOUSEHOLD',
  BUSINESS: 'BUSINESS',
};

export const MERCHANT_TYPE_TEXT = {
  [MERCHANT_TYPE.PERSONAL]: 'Cá nhân',
  [MERCHANT_TYPE.HOUSEHOLD]: 'Hộ kinh doanh',
  [MERCHANT_TYPE.BUSINESS]: 'Doanh nghiệp',
};

export const MERCHANT_STATUS = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
};

export const MERCHANT_STATUS_COLOR = {
  [MERCHANT_STATUS.PENDING]: 'processing',
  [MERCHANT_STATUS.APPROVED]: 'success',
  [MERCHANT_STATUS.REJECTED]: 'error',
};

export const MERCHANT_STATUS_ICON = {
  [MERCHANT_STATUS.PENDING]: <SyncOutlined spin />,
  [MERCHANT_STATUS.APPROVED]: <CheckCircleOutlined spin />,
  [MERCHANT_STATUS.REJECTED]: <CloseCircleOutlined spin />,
};


export const MERCHANT_STATUS_TEXT = {
  [MERCHANT_STATUS.PENDING]: 'Chờ xử lý',
  [MERCHANT_STATUS.APPROVED]: 'Chấp nhận',
  [MERCHANT_STATUS.REJECTED]: 'Từ chối',
};
