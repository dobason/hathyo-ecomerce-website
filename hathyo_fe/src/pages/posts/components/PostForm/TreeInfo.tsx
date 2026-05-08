import { Button, Col, Collapse, Form, Row } from 'antd';
import React from 'react';

import Editor from '@/components/Editor';
import { CloseOutlined } from '@ant-design/icons';
import { map } from 'lodash';

type Props = {
  value?: string;
  form?: any;
  onChange?: (a: unknown) => unknown;
};

const CardItem = ({ subField }: any) => (
  <Row gutter={[24, 24]}>
    <Col span={24}>
      <Form.Item label="Tên đầu mục lớn" name={[subField.name, 'heading']}>
        <Editor />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item label="Nội dung đầu mục" name={[subField.name, 'content']}>
        <Editor />
      </Form.Item>
    </Col>
  </Row>
);

const TreeInfo: React.FC<Props> = (props) => {
  const content = Form.useWatch('content', props?.form);

  const syncIndexOfContent = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    // const descriptionList = map(doc.querySelectorAll("h4"), item => item?.textContent)

    const indexOfContentValues = map(doc.querySelectorAll('h3'), (item) => ({
      heading: item.outerHTML,
      content: '',
    }));

    props?.form?.setFieldValue('indexOfContent', indexOfContentValues);
  };

  return (
    <>
      <Button style={{ marginBottom: 24 }} type="primary" onClick={syncIndexOfContent}>
        Đồng bộ đầu mục lớn ở cây thông tin từ bài viết
      </Button>
      <Form.List name={'indexOfContent'}>
        {(subFields, subOpt) => (
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Collapse
                items={subFields.map((subField, index) => ({
                  key: index,
                  label: `Mục ${index + 1}`,
                  children: <CardItem subField={subField} />,
                  extra: (
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  ),
                }))}
              />
            </Col>
            <Col span={24}>
              <Button type="dashed" onClick={() => subOpt.add()} block>
                + Thêm thông tin
              </Button>
            </Col>
          </Row>
        )}
      </Form.List>
    </>
  );
};

export default TreeInfo;
