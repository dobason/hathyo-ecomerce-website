import { SelectTopic } from '@/components/SelectTopic';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';

type Props = {
  onOk: (a: API.Topic) => any;
  visible: boolean;
  loading: boolean;
  setVisible: (a: boolean) => any;
};

const TopicModal: React.FC<Props> = ({ visible, loading, setVisible, onOk }: Props) => {
  const [form] = Form.useForm();
  const onFinish = (values: API.Topic) => {
    onOk(values);
    form?.resetFields();
  };

  const onCancel = () => {
    setVisible(false);
    form?.resetFields();
  };

  return (
    <Modal
      confirmLoading={loading}
      title="Thêm danh mục"
      open={visible}
      onCancel={onCancel}
      footer={false}
    >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <SelectTopic title="Chọn danh mục phụ thuộc" requiredRule={false} />

        <Form.Item
          label="Tên topic"
          name="name"
          rules={[{ required: true, message: 'Nhập tên topic' }]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>

        <Row align="middle" justify="center">
          <Col>
            <Button type="primary" htmlType="submit">
              Lưu topic
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TopicModal;
