import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

import OrdersTable from './components/OrdersTable';

const Orders: React.FC = () => {
  return (
    <PageContainer>
      <OrdersTable />
    </PageContainer>
  );
};

export default Orders;
