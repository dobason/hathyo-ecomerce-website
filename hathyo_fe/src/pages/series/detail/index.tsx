import { PageContainer } from '@ant-design/pro-components';
import { Form, Spin } from 'antd';
import React from 'react';

import ActionBar from '@/components/ActionBar';

import SeriesForm from '../components/SeriesForm';
import { useDetail } from './hook';

const CreateSeries: React.FC = () => {
  const { loading, form, seriesDetail, onFinish, onUpdateOrder } = useDetail();

  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <SeriesForm onUpdateOrder={onUpdateOrder} posts={seriesDetail?.posts as API.Post[]} />
          <ActionBar title="Cập nhật" />
        </Form>
      </Spin>
    </PageContainer>
  );
};

export default CreateSeries;
