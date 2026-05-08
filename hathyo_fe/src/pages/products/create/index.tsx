import { PageContainer } from '@ant-design/pro-components';
import { Affix, Button, Card, Col, Form, Row, Spin } from 'antd';
import React from 'react';
import ProductForm from '../components/Products/ProductForm';
import { useCreate } from './hook';

const CreateProduct: React.FC = () => {
  const { loading, form, onFinish } = useCreate();

  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form
          layout="vertical"
          labelAlign="left"
          form={form}
          onFinish={onFinish}
        >
          <ProductForm form={form}/>
          <Affix offsetBottom={24}>
            <Card size="small" style={{ marginTop: 24 }}>
              <Form.Item noStyle>
                <Row gutter={[24, 24]} justify="end">
                  <Col>
                    <Button size="large" onClick={onFinish}>
                      Tạo sản phẩm
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

export default CreateProduct;
