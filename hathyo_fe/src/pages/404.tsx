import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <Result
        status="404"
        title="Không tìm thấy trang"
        subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển."
        extra={
          <Button type="primary" size="large" onClick={() => history.push('/')}>
            Về trang chủ
          </Button>
        }
        className="text-center"
      />
    </div>
  );
};

export default NoFoundPage;
