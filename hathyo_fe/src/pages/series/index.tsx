import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';

import SeriesTable from './components/SeriesTable';
import Search from './components/SeriesTable/Search';

const Series: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      extra={
        <Space>
          <Search />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/posts-management/series/create')}
          >
            Thêm mới
          </Button>
        </Space>
      }
    >
      <SeriesTable />
    </PageContainer>
  );
};

export default Series;
