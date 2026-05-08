import { Card, Col, Collapse, Form, Row, Spin } from 'antd';
import React from 'react';

import Editor from '@/components/Editor';
import CommonInfo from './CommonInfo';
import ProductRelatedPost from './ProductRelatedPost';
import TreeInfo from './TreeInfo';
import { useUpload } from './hook';

type Props = {
  tags?: API.TagItem[];
  series?: API.Series;
  thumbnail?: string;
  status?: string;
  form?: any;
};

const PostForm: React.FC<Props> = (props: Props) => {
  const { loading, run } = useUpload();
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Collapse
            defaultActiveKey={['1', '2', '3']}
            items={[
              {
                key: '1',
                label: 'Thông tin chung',
                children: <CommonInfo {...props} />,
              },
              {
                key: '2',
                label: 'Cây thông tin',
                children: <TreeInfo form={props?.form} />,
              },
              {
                key: '3',
                label: 'Sản phẩm liên quan',
                children: <ProductRelatedPost />,
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <Card title="Nội dung bài viết">
            <Spin spinning={loading}>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                    message: 'Nhập content',
                  },
                ]}
                noStyle
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

export default PostForm;
