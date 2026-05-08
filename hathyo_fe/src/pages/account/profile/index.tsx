import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Spin } from 'antd';
import React from 'react';

import UserForm from './components/UserForm';
import { useDetail } from './hook';

const UserDetail: React.FC = () => {
  const { loading, form, userDetail, onFinish } = useDetail();

  const avatar = userDetail?.avatar ?? "";

  return (
    <PageContainer
      extra={
        <Button type="primary" onClick={() => form.submit()}>
          Cập nhật
        </Button>
      }
    >
      <Spin spinning={Boolean(loading)}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <UserForm avatar={avatar} form={form} />
        </Form>
      </Spin>
    </PageContainer>
  );
};

export default UserDetail;
