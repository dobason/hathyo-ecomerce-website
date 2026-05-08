import {
  BookTwoTone,
  CheckCircleTwoTone,
  RightCircleTwoTone,
  StopTwoTone,
  CheckCircleOutlined, CloseCircleOutlined, SyncOutlined
} from '@ant-design/icons';

import { Tag } from 'antd';

export const PRODUCT_STATUS = {
  ALL: 'ALL',
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const PRODUCT_STATUS_COLOR = {
  [PRODUCT_STATUS.ALL]: 'success',
  [PRODUCT_STATUS.DRAFT]: 'processing',
  [PRODUCT_STATUS.PENDING]: 'processing',
  [PRODUCT_STATUS.APPROVED]: 'success',
  [PRODUCT_STATUS.REJECTED]: 'error',
};

export const PRODUCT_STATUS_ICON = {
  [PRODUCT_STATUS.ALL]: <CheckCircleOutlined spin />,
  [PRODUCT_STATUS.DRAFT]: <SyncOutlined spin />,
  [PRODUCT_STATUS.PENDING]: <SyncOutlined spin />,
  [PRODUCT_STATUS.APPROVED]: <CheckCircleOutlined spin />,
  [PRODUCT_STATUS.REJECTED]: <CloseCircleOutlined spin />,
};

export const PRODUCT_STATUS_TEXT = {
  [PRODUCT_STATUS.ALL]: 'Tất cả',
  [PRODUCT_STATUS.DRAFT]: 'Nháp',
  [PRODUCT_STATUS.PENDING]: 'Chờ duyệt',
  [PRODUCT_STATUS.APPROVED]: 'Đã duyệt',
  [PRODUCT_STATUS.REJECTED]: 'Từ chối'
};

export const PRODUCT_STATUS_TAG = {
  [PRODUCT_STATUS.DRAFT]: <Tag>{PRODUCT_STATUS.DRAFT}</Tag>,
  [PRODUCT_STATUS.PENDING]: <Tag color="orange">{PRODUCT_STATUS.PENDING}</Tag>,
  [PRODUCT_STATUS.APPROVED]: <Tag color="cyan">{PRODUCT_STATUS.APPROVED}</Tag>,
  [PRODUCT_STATUS.REJECTED]: <Tag color="red">{PRODUCT_STATUS.REJECTED}</Tag>,
};

export const MAPPING_PRODUCT_STATUS_ACTION_INFO = {
  [PRODUCT_STATUS.DRAFT]: {
    label: 'Sản phẩm nháp',
    key: PRODUCT_STATUS.DRAFT,
    icon: <BookTwoTone />,
    isAdmin: false,
  },
  [PRODUCT_STATUS.PENDING]: {
    label: 'Gửi duyệt',
    key: PRODUCT_STATUS.PENDING,
    icon: <RightCircleTwoTone twoToneColor="#d46b08" />,
    isAdmin: false,
  },
  [PRODUCT_STATUS.APPROVED]: {
    label: 'Duyệt sản phẩm',
    key: PRODUCT_STATUS.APPROVED,
    icon: <CheckCircleTwoTone twoToneColor="#08979c" />,
    isAdmin: true,
  },
  [PRODUCT_STATUS.REJECTED]: {
    label: 'Từ chối sản phẩm',
    key: PRODUCT_STATUS.REJECTED,
    icon: <StopTwoTone twoToneColor="#cf1322" />,
    isAdmin: true,
  },
};
export const MAPPING_PRODUCT_STATUS_WITH_ACTION = {
  [PRODUCT_STATUS.DRAFT]: [MAPPING_PRODUCT_STATUS_ACTION_INFO[PRODUCT_STATUS.PENDING]],
  [PRODUCT_STATUS.PENDING]: [
    MAPPING_PRODUCT_STATUS_ACTION_INFO[PRODUCT_STATUS.APPROVED],
    MAPPING_PRODUCT_STATUS_ACTION_INFO[PRODUCT_STATUS.REJECTED],
  ],
  [PRODUCT_STATUS.REJECTED]: [MAPPING_PRODUCT_STATUS_ACTION_INFO[PRODUCT_STATUS.PENDING]],
};
