import { PageContainer } from '@ant-design/pro-components';
import { Affix, Button, Card, Form, Spin } from 'antd';
import React from 'react';

import ContentForm from '../components/ContentForm';
import { useCreate } from './hook';

const CreateContent: React.FC = () => {
  const { loading, form, onFinish } = useCreate();
  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <ContentForm />
          <Affix offsetBottom={24}>
            <Card size="small" style={{ marginTop: 24 }}>
              <Form.Item noStyle>
                <Button type="primary" size="large" onClick={() => onFinish()}>
                  Tạo
                </Button>
              </Form.Item>
            </Card>
          </Affix>
        </Form>
      </Spin>
    </PageContainer>
  );
};

export default CreateContent;
