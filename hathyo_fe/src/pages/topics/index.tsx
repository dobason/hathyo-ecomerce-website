import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTopicsTable } from './components/TopicsTable/hooks';
import TopicModal from './components/TopicsTable/TopicModal';
import TopicsTable from './components/TopicsTable';

const Topics: React.FC = () => {
  const { visible, loading, onCreate, setVisible } = useTopicsTable();

  return (
    <PageContainer
      extra={[
        <Button
          key="create-topic"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setVisible(true)}
        >
          Thêm danh mục
        </Button>,
      ]}
    >
      <TopicsTable />
      <TopicModal
        loading={loading}
        visible={visible}
        setVisible={setVisible}
        onOk={onCreate}
      />
    </PageContainer>
  );
};

export default Topics;
