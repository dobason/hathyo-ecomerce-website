import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

import UsersTable from './components/UsersTable';
import Search from './components/UsersTable/Search';

const Users: React.FC = () => {
  return (
    <PageContainer
      extra={<Search />}
    >
      <UsersTable />
    </PageContainer>
  );
};

export default Users;
