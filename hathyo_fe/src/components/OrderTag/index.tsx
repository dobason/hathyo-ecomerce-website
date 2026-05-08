import { Tag } from 'antd';
import get from 'lodash/get';
import React from 'react';

import { ORDER_STATUS_COLOR, ORDER_STATUS_ICON, ORDER_STATUS_TEXT } from '@/services/orders/constants';

type Props = {
  status?: string;
};
const MerchantTag: React.FC<Props> = ({ status }: Props) => {
  if (!status) return null;

  const mapColor = get(ORDER_STATUS_COLOR, status);
  const mapIcon = get(ORDER_STATUS_ICON, status);
  if (!mapColor || !mapIcon) return null;

  return (
    <Tag icon={mapIcon} color={mapColor}>
      {ORDER_STATUS_TEXT[status]}
    </Tag>
  );
};

export default MerchantTag;
