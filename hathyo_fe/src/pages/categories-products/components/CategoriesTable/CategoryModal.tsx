import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';

import { SelectCategory } from '@/components/SelectCategory';
import { slug } from '@/utils/func';

type Props = {
  onOk: (a: API.Category) => any;
  visible: boolean;
  loading: boolean;
  setVisible: (a: boolean) => any;
};

const CategoryModal: React.FC<Props> = ({ visible, loading, setVisible, onOk }: Props) => {
  const [form] = Form.useForm();
  const onFinish = (values: API.Category) => {
    onOk(values);
    form?.resetFields();
  };

  const onCancel = () => {
    setVisible(false);
    form?.resetFields();
  };

  Form.useWatch('name');

  return (
    <Modal
      confirmLoading={loading}
      title="Thêm danh mục mới"
      open={visible}
      onCancel={onCancel}
      footer={false}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <SelectCategory title="Chọn danh mục cha" requiredRule={false} />

        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: 'Nhập tên danh mục' }]}
        >
          <Input onBlur={(e) => form.setFieldValue('slug', slug(e?.target?.value))} />
        </Form.Item>
        <Form.Item label="Slug" name="slug">
          <Input />
        </Form.Item>

        <Row align="middle" justify="center">
          <Col>
            <Button type="primary" htmlType="submit">
              Lưu danh mục
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
