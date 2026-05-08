import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

import OrderRevenue from './components/OrderRevenue';
import Search from "./components/OrderRevenue/Search"
const Merchants: React.FC = () => {
  return (
    <PageContainer extra={<Search/>}>
      <OrderRevenue />
    </PageContainer>
  );
};

export default Merchants;
