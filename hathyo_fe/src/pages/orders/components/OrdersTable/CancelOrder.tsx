import type { FormProps } from 'antd';
import { Button, Form, FormInstance, Input, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react';

type ProductItem = {
  productVariantImage: string;
  quantity: number;
  productTitle: string;
  productPrice: number;
  skuCode: string;
};

type OrderDetails = {
  id: number;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderItems: ProductItem[];
  totalPrice: number;
};

type CancelOrderModalProps = {
  form: FormInstance;
  visible: boolean;
  onClose: () => void;
  detail: OrderDetails | null | undefined;
  onCancelOrder: FormProps<API.OrderCancelRequest>['onFinish'];
};

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  form,
  visible,
  onClose,
  detail,
  onCancelOrder,
}) => {
  const [reason, setReason] = useState('');

  useEffect(() => {
    setReason('');
    if (detail?.id) {
      form.setFieldsValue({ id: detail.id });
    }
  }, [detail, form]);

  const handleReasonChange = (e: any) => {
    setReason(e.target.value);
  };

  if (!detail) return null;

  return (
    <Modal
      title={`#${detail.orderCode}`}
      width={400}
      onCancel={onClose}
      open={visible}
      footer={null}
    >
      <Form form={form} onFinish={onCancelOrder} layout="vertical" name="order-detail">
        <Form.Item name="cancelReason" label="Lý do hủy đơn hàng">
          <Radio.Group onChange={handleReasonChange}>
            <Radio value="Hết hàng">Hết hàng</Radio>
            <Radio value="Yêu cầu từ khách hàng">Yêu cầu từ khách hàng</Radio>
            <Radio value="Không thể giao hàng">Không thể giao hàng</Radio>
            <Radio value="other">Khác</Radio>
          </Radio.Group>
        </Form.Item>
        {reason === 'other' && (
          <Form.Item name="otherReason">
            <Input.TextArea rows={3} placeholder="Nhập lý do khác" />
          </Form.Item>
        )}
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Button block type="primary" htmlType="submit">
          Xác nhận hủy
        </Button>
      </Form>
    </Modal>
  );
};

export default CancelOrderModal;
