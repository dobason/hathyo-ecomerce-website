import {
  BookTwoTone,
  CheckCircleTwoTone,
  RightCircleTwoTone,
  RocketTwoTone,
  StopTwoTone,
} from '@ant-design/icons';
import { Tag } from 'antd';

export const POST_STATUS = {
  PUBLIC: 'PUBLIC',
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const POST_STATUS_TAG = {
  [POST_STATUS.PUBLIC]: <Tag color="green">{POST_STATUS.PUBLIC}</Tag>,
  [POST_STATUS.DRAFT]: <Tag>{POST_STATUS.DRAFT}</Tag>,
  [POST_STATUS.PENDING]: <Tag color="orange">{POST_STATUS.PENDING}</Tag>,
  [POST_STATUS.APPROVED]: <Tag color="cyan">{POST_STATUS.APPROVED}</Tag>,
  [POST_STATUS.REJECTED]: <Tag color="red">{POST_STATUS.REJECTED}</Tag>,
};

export const MAPPING_POST_STATUS_ACTION_INFO = {
  [POST_STATUS.PUBLIC]: {
    label: 'Public bài viết',
    key: POST_STATUS.PUBLIC,
    icon: <RocketTwoTone twoToneColor="#52c41a" />,
    isAdmin: true,
  },
  [POST_STATUS.DRAFT]: {
    label: 'Bài viết nháp',
    key: POST_STATUS.DRAFT,
    icon: <BookTwoTone />,
    isAdmin: false,
  },
  [POST_STATUS.PENDING]: {
    label: 'Gửi duyệt',
    key: POST_STATUS.PENDING,
    icon: <RightCircleTwoTone twoToneColor="#d46b08" />,
    isAdmin: false,
  },
  [POST_STATUS.APPROVED]: {
    label: 'Duyệt bài viết',
    key: POST_STATUS.APPROVED,
    icon: <CheckCircleTwoTone twoToneColor="#08979c" />,
    isAdmin: true,
  },
  [POST_STATUS.REJECTED]: {
    label: 'Từ chối bài viết',
    key: POST_STATUS.REJECTED,
    icon: <StopTwoTone twoToneColor="#cf1322" />,
    isAdmin: true,
  },
};
export const MAPPING_POST_STATUS_WITH_ACTION = {
  [POST_STATUS.PUBLIC]: [],
  [POST_STATUS.DRAFT]: [MAPPING_POST_STATUS_ACTION_INFO[POST_STATUS.PENDING]],
  [POST_STATUS.PENDING]: [
    MAPPING_POST_STATUS_ACTION_INFO[POST_STATUS.APPROVED],
    MAPPING_POST_STATUS_ACTION_INFO[POST_STATUS.REJECTED],
  ],
  [POST_STATUS.APPROVED]: [MAPPING_POST_STATUS_ACTION_INFO[POST_STATUS.PUBLIC]],
  [POST_STATUS.REJECTED]: [MAPPING_POST_STATUS_ACTION_INFO[POST_STATUS.PENDING]],
};
