import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

import CouponsTable from './components/CouponsTable';

const Coupons: React.FC = () => {
  return (
    <PageContainer>
      <CouponsTable />
    </PageContainer>
  );
};

export default Coupons;
