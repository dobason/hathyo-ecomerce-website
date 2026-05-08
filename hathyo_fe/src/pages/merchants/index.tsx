import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

import MerchantsTable from './components/MerchantsTable';
import Search from './components/MerchantsTable/Search';

const Merchants: React.FC = () => {
  return (
    <PageContainer
      extra={<Search />}
    >
      <MerchantsTable />
    </PageContainer>
  );
};

export default Merchants;
