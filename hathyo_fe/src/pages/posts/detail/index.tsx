import { PageContainer } from '@ant-design/pro-components';
import { Affix, Button, Card, Col, Form, Row, Spin } from 'antd';
import React, { useState } from 'react';

import PostStatusDropdown from '@/components/PostStatusDropdown';
import { useAccess } from '@umijs/max';
import PostForm from '../components/PostForm';
import { PreviewModal } from '../components/PostForm/PreviewModal';
import { useDetail } from './hook';

const PostDetail: React.FC = () => {
  const { loading, form, postDetail, onFinish, handleDelete, handlePatchStatus } = useDetail();
  const [visible, setVisible] = useState(false);
  const content = Form.useWatch('content', form);
  const onToggle = () => setVisible(!visible);

  const tags = postDetail?.tags;
  const series = postDetail?.series;
  const thumbnail = postDetail?.thumbnail;
  const status = postDetail?.visibility;

  const access = useAccess();

  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <PostForm form={form} status={status} tags={tags} series={series} thumbnail={thumbnail} />
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
                  {access.admin && (
                    <Col>
                      <PostStatusDropdown
                        handleDelete={handleDelete}
                        handlePatchStatus={handlePatchStatus}
                        post={postDetail}
                      />
                    </Col>
                  )}
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
        <PreviewModal visible={visible} onToggle={onToggle} content={content} />
      </Spin>
    </PageContainer>
  );
};

export default PostDetail;
