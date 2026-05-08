import { Affix, Button, Card, Col, Form, Row } from 'antd';
import React from 'react';
// import { history } from '@umijs/max'; // Import history from UmiJS

type Props = {
  title: string;
  approveAction?: () => void;
  rejectAction?: () => void;
  // onBack?: () => void;
};

const ActionBar: React.FC<Props> = ({ rejectAction, approveAction }: Props) => {
  // const handleBack = () => {
  //   history.push('/user-management/merchants');
  //   if (onBack) onBack();
  // };

  return (
    <Affix offsetBottom={24}>
      <Card size="small" style={{ marginTop: 24 }}>
        <Form.Item noStyle>
          <Row gutter={[24, 24]} justify="end">
            {/* <Col>
              <Button size="large" onClick={handleBack}>
                Quay về danh sách
              </Button>
            </Col> */}
            {approveAction && (
              <Col>
                <Button size="large" ghost type="primary" onClick={approveAction}>
                  Duyệt
                </Button>
              </Col>
            )}
            {rejectAction && (
              <Col>
                <Button size="large" danger ghost onClick={rejectAction}>
                  Từ chối
                </Button>
              </Col>
            )}
          </Row>
        </Form.Item>
      </Card>
    </Affix>
  );
};

export default ActionBar;
