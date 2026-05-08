import { Tag } from 'antd';
import get from 'lodash/get';
import React from 'react';

import { PRODUCT_STATUS_COLOR, PRODUCT_STATUS_ICON, PRODUCT_STATUS_TEXT } from '@/services/products/constants';

type Props = {
  status?: string;
};
const MerchantTag: React.FC<Props> = ({ status }: Props) => {
  if (!status) return null;

  const mapColor = get(PRODUCT_STATUS_COLOR, status);
  const mapIcon = get(PRODUCT_STATUS_ICON, status);
  if (!mapColor || !mapIcon) return null;

  return (
    <Tag icon={mapIcon} color={mapColor}>
      {PRODUCT_STATUS_TEXT[status]}
    </Tag>
  );
};

export default MerchantTag;
