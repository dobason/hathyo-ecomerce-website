import { PageContainer } from '@ant-design/pro-components';
import { Affix, Button, Card, Col, Form, Row, Spin } from 'antd';
import React from 'react';
import CouponForm from '../components/CouponForm';
import { useCreate } from './hook';

const CreateCoupon: React.FC = () => {
  const { loading, form, onFinish } = useCreate();

  return (
    <PageContainer>
      <Spin spinning={loading}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <CouponForm form={form} />

          <Affix offsetBottom={24}>
            <Card size="small" style={{ marginTop: 24 }}>
              <Form.Item noStyle>
                <Row gutter={[24, 24]} justify="end">
                  <Col>
                    <Button size="large" type="primary" htmlType="submit">
                      Tạo mã giảm giá
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

export default CreateCoupon;
