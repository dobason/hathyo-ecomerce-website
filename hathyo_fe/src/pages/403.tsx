import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NotPermission: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, Bạn không được phép truy cập đường dẫn này."
    extra={
      <Button type="primary" onClick={() => history.replace('/')}>
        Back Home
      </Button>
    }
  />
);

export default NotPermission;
