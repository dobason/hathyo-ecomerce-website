import type { FormProps } from 'antd';
import { Button, Form, FormInstance, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import SingleUpload from '@/components/UploadImage/SingleUpload';

type OrderDetails = {
  id: number;
};

type SendRefundDrawerProps = {
  form: FormInstance;
  visible: boolean;
  onClose: () => void;
  detail: OrderDetails | null | undefined;
  onSendRefund: FormProps<API.OrderTransRequest>['onFinish'];
};

const SendRefundDrawer: React.FC<SendRefundDrawerProps> = ({
  form,
  visible,
  onClose,
  detail,
  onSendRefund,
}) => {
  useEffect(() => {
    if (!!detail?.id) {
      form.setFieldValue('orderReturnId', detail?.id);
    }
  }, [detail]);
  if (!detail) return null;

  return (
    <Modal
      title={`#${detail.id}`}
      width={400}
      onCancel={onClose}
      open={visible}
      footer={null}
      styles={{ body: { paddingBottom: 80 } }}
    >
      <Form form={form} onFinish={onSendRefund} layout="vertical" name="order-detail">
        <Form.Item
          name="refundImage"
          label="Upload ảnh chuyển khoản"
        >
          <SingleUpload/>
        </Form.Item>
        <Form.Item hidden name="orderReturnId">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendRefundDrawer;
