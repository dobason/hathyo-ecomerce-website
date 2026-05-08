import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import React from 'react';

import ContentTable from './components/ContentTable';

const Contents: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      extra={[
        <Button
          key="create"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/posts-management/static-content/create')}
        >
          Thêm nội dung
        </Button>,
      ]}
    >
      <ContentTable />
    </PageContainer>
  );
};

export default Contents;
