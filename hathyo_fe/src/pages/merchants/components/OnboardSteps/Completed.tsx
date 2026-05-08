import { Card, Result } from 'antd';
import React from 'react';

type Props = {
  identityImageBack?: string;
  identityImageFront?: string;
};

const Completed: React.FC<Props> = ({}: Props) => {
  return (
    <Card>
      <br />
      <Result
        status="success"
        title="Đăng ký thành công"
        subTitle="Bạn đã đăng ký thành công thông tin tài khoản bán hàng trên Hathyo"
        // extra={[
        //   <Button type="primary" key="console">
        //     Go Console
        //   </Button>,
        //   <Button key="buy">Buy Again</Button>,
        // ]}
      />
    </Card>
  );
};

export default Completed;
