import { PageContainer } from '@ant-design/pro-components';
import { Affix, Button, Card, Col, Form, Row, Spin } from 'antd';
import React, { useState } from 'react';

import PostForm from '../components/PostForm';
import { PreviewModal } from '../components/PostForm/PreviewModal';
import { useCreate } from './hook';

const CreatePost: React.FC = () => {
  const { loading, form, onFinish } = useCreate();
  const [visible, setVisible] = useState(false);
  const content = Form.useWatch('content', form);
  const onToggle = () => setVisible(!visible);

  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form
          layout="vertical"
          labelAlign="left"
          form={form}
          onFinish={onFinish}
        >
          <PostForm />
          <Affix offsetBottom={24}>
            <Card size="small" style={{ marginTop: 24 }}>
              <Form.Item noStyle>
                <Row gutter={[24, 24]} justify="end">
                  {!!content && (
                    <Col>
                      <Button size="large" onClick={onToggle}>
                        Xem trước nội dung
                      </Button>
                    </Col>
                  )}
                  <Col>
                    <Button size="large" onClick={() => onFinish({ draft: false })}>
                      Tạo Bài viết
                    </Button>
                  </Col>
                  <Col>
                    <Button size="large" type="primary" onClick={() => onFinish({ draft: true })}>
                      Tạo nháp
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Card>
          </Affix>
        </Form>
        <PreviewModal visible={visible} onToggle={onToggle} content={content} />
      </Spin>
    </PageContainer>
  );
};

export default CreatePost;
