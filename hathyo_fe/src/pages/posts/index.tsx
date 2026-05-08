import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import React from 'react';

import PostsTable from './components/PostsTable';

const Posts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      extra={[
        <Button
          key="create"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/posts-management/posts/create')}
        >
          Thêm bài viết mới
        </Button>,
      ]}
    >
      <PostsTable />
    </PageContainer>
  );
};

export default Posts;
