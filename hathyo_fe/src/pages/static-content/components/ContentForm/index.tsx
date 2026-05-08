import { Card, Form, Input, Spin } from 'antd';

import Editor from '@/components/Editor';
import { useUpload } from './hook';

type Props = {
  type?: 'create' | 'update';
};

const ContentForm: React.FC<Props> = ({ type }) => {
  const { loading, run } = useUpload();
  return (
    <Card title="Nội dung">
      <Spin spinning={loading}>
        <Form.Item
          name="code"
          label="Mã"
          required={false}
          rules={[
            {
              required: true,
              message: 'Nhập mã',
            },
          ]}
        >
          <Input disabled={type === 'update'} placeholder="Nhập mã" />
        </Form.Item>
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
          <Input placeholder="Tiêu đề nội dung" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Nhập description',
            },
          ]}
          noStyle
        >
          <Editor uploadImage={run} />
        </Form.Item>
      </Spin>
    </Card>
  );
};

export default ContentForm;
