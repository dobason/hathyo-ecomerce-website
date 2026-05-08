import { PageContainer } from '@ant-design/pro-components';
import { Form, Spin } from 'antd';
import React from 'react';

import ActionBar from '@/components/ActionBar';

import SeriesForm from '../components/SeriesForm';
import { useCreate } from './hook';

const CreateSeries: React.FC = () => {
  const { loading, form, onFinish } = useCreate();

  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <SeriesForm />
          <ActionBar title="Tạo Series" />
        </Form>
      </Spin>
    </PageContainer>
  );
};

export default CreateSeries;
