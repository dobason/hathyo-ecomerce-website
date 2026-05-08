import { Tag } from 'antd';
import get from 'lodash/get';
import React from 'react';

import { MERCHANT_STATUS_COLOR, MERCHANT_STATUS_ICON, MERCHANT_STATUS_TEXT } from '@/services/merchants/constants';

type Props = {
  status?: string;
};
const OrderTag: React.FC<Props> = ({ status }: Props) => {
  if (!status) return null;

  const mapColor = get(MERCHANT_STATUS_COLOR, status);
  const mapIcon = get(MERCHANT_STATUS_ICON, status);
  if (!mapColor || !mapIcon) return null;

  return (
    <Tag icon={mapIcon} color={mapColor}>
      {MERCHANT_STATUS_TEXT[status]}
    </Tag>
  );
};

export default OrderTag;
