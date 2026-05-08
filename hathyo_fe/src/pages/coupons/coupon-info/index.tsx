import { PageContainer } from '@ant-design/pro-components';
import { Affix, Button, Card, Col, Form, Row, Spin } from 'antd';
import React from 'react';

import { useDetail } from '../detail/hook';
import CouponForm from '../components/CouponForm';
import { COUPON_STATUS_TAG } from '@/services/coupons/constants';

const CouponInfo: React.FC = () => {
  const { loading, form, couponDetail, onFinish } = useDetail();

  const couponStatus = couponDetail?.status; // boolean | undefined

  const statusKey = couponStatus === true
    ? 'ACTIVE'
    : couponStatus === false
    ? 'INACTIVE'
    : undefined;

  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Card>
            <CouponForm form={form} thumbnail={couponDetail?.image} />
          </Card>

          <Affix offsetBottom={24}>
            <Card size="small" style={{ marginTop: 24 }}>
              <Row gutter={[24, 24]} align="middle" justify="end">
                <Col>
                  Trạng thái: {statusKey ? COUPON_STATUS_TAG[statusKey] : 'Không xác định'}
                </Col>
                <Col>
                  <Button size="large" type="primary" htmlType="submit">
                    Lưu
                  </Button>
                </Col>
              </Row>
            </Card>
          </Affix>
        </Form>
      </Spin>
    </PageContainer>
  );
};


export default CouponInfo;
