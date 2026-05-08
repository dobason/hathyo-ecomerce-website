import { PageContainer } from '@ant-design/pro-components';
import { Affix, Button, Card, Col, Form, Row, Spin } from 'antd';
import React from 'react';

// import PostForm from '../components/PostForm';
// import { PreviewModal } from '../components/PostForm/PreviewModal';
import ProductForm from '../components/Products/ProductForm';
import { useDetail } from './hook';

const ProductDetail: React.FC = () => {
  const { loading, form, productDetail, onFinish } = useDetail();
  // const access = useAccess();

  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form
          layout="vertical"
          labelAlign="left"
          form={form}
          onFinish={onFinish}
        >
          <ProductForm {...productDetail} form={form} />
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

export default ProductDetail;
