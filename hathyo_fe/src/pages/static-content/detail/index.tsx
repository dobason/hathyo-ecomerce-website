import { PageContainer } from '@ant-design/pro-components';
import { Affix, Button, Card, Col, Form, Row, Spin } from 'antd';
import React from 'react';

import ContentForm from '../components/ContentForm';
import { useDetail } from './hook';

const ContentDetail: React.FC = () => {
  const { loading, form, onFinish } = useDetail();

  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <ContentForm type="update" />
          <Affix offsetBottom={24}>
            <Card size="small" style={{ marginTop: 24 }}>
              <Form.Item noStyle>
                <Row gutter={[24, 24]} justify="end">
                  <Col>
                    <Button type="primary" size="large" htmlType="submit">
                      Cập nhật
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Card>
          </Affix>
        </Form>
      </Spin>
    </PageContainer>
  );
};

export default ContentDetail;
