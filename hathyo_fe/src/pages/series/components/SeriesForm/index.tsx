import { Card, Col, Collapse, Form, Input, Row, Spin, Typography } from 'antd';
import React from 'react';

import Editor from '@/components/Editor';
import { isEmpty } from 'lodash';
import PostInSeries from '../PostInSeries';
import { useUpload } from './hook';

type Props = {
  posts?: API.Post[];
  loading?: boolean;
  onUpdateOrder?: (a: any) => any;
};

const CommonInfo = ({ loading, posts, onUpdateOrder }: Props) => (
  <Row gutter={[8, 24]}>
    <Col xs={24} md={16}>
      <Row>
        <Col span={24}>
          <Form.Item
            style={{ margin: 0 }}
            name="title"
            label="Tên series"
            rules={[
              {
                required: true,
                message: 'Nhập Tên series',
              },
            ]}
          >
            <Input placeholder="Tên series" />
          </Form.Item>
        </Col>
      </Row>
    </Col>
    {!isEmpty(posts) && (
      <Col xs={24} md={24}>
        <Typography.Title level={5}>Bài viết thuộc Series</Typography.Title>
        <PostInSeries
          onUpdateOrder={onUpdateOrder}
          loading={!!loading}
          data={posts as API.Post[]}
        />
      </Col>
    )}
  </Row>
);

const SeriesForm: React.FC<Props> = ({ posts, onUpdateOrder }: Props) => {
  const { loading, run } = useUpload();

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Collapse
            defaultActiveKey={['1']}
            items={[
              {
                key: '1',
                label: 'Thông tin chung',
                children: (
                  <CommonInfo onUpdateOrder={onUpdateOrder} posts={posts} loading={loading} />
                ),
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <Card title="Nội dung series">
            <Spin spinning={loading}>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                    message: 'Nhập content',
                  },
                ]}
              >
                <Editor uploadImage={run} />
              </Form.Item>
            </Spin>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SeriesForm;
