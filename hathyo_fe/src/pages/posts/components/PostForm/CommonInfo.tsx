import { Col, Divider, Form, Input, Row, Typography } from 'antd';
import React from 'react';

import { SelectTags } from '@/components/SelectTags';
import { SelectTopic } from '@/components/SelectTopic';
import { UploadImage } from '@/components/UploadImage';

import Editor from '@/components/Editor';
import { SelectSeries } from '@/components/SelectSeries';
import { POST_STATUS_TAG } from '@/services/posts/constants';
import { get } from 'lodash';

type Props = {
  tags?: API.TagItem[];
  series?: API.Series;
  thumbnail?: string;
  status?: string;
  form?: any;
};

const CommonInfo: React.FC<Props> = ({ tags, series, thumbnail, status }: Props) => {
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <UploadImage thumbnail={thumbnail} />
      </Col>
      <Col xs={24} md={16}>
        <Row>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              required={false}
              rules={[
                {
                  required: true,
                  message: 'Nhập tiêu đề',
                },
              ]}
            >
              <Input placeholder="Tiêu đề bài viết" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="themeQuestion"
              label="Câu hỏi chủ đề"
              required={false}
              rules={[
                {
                  required: true,
                  message: 'Nhập câu hỏi chủ đề',
                },
              ]}
            >
              <Input placeholder="Câu hỏi chủ đề" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <SelectTopic />
          </Col>
          <Col span={24}>
            <SelectTags tags={tags} />
          </Col>
          <Col span={24}>
            <SelectSeries series={series} />
          </Col>
          {!!status && (
            <Col span={24}>
              <Form.Item required={false} label="Trạng thái">
                {get(POST_STATUS_TAG, status, '')}
              </Form.Item>
            </Col>
          )}
        </Row>
      </Col>
      <Divider style={{ margin: 0 }} />
      <Col span={24}>
        <div style={{ marginBottom: 12 }}>
          <Typography.Text strong>Mô tả ngắn về bài viết:</Typography.Text>
        </div>
        <Form.Item name="description" required={false} noStyle>
          <Editor />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default CommonInfo;
