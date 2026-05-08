import type { FormProps } from 'antd';
import { Button, Form, FormInstance, Input, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react';

type OrderDetails = {
  id: number;
};

type CancelOrderModalProps = {
  form: FormInstance;
  visible: boolean;
  onClose: () => void;
  detail: OrderDetails | null | undefined;
  onRejectOrder: FormProps<API.OrderRejectRequest>['onFinish'];
};

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  form,
  visible,
  onClose,
  detail,
  onRejectOrder,
}) => {
  const [reason, setReason] = useState('');

  useEffect(() => {
    setReason('');
    if (detail?.id) {
      form.setFieldsValue({ orderReturnId: detail.id });
    }
  }, [detail, form]);

  const handleReasonChange = (e: any) => {
    setReason(e.target.value);
  };

  if (!detail) return null;

  return (
    <Modal title={`#${detail.id}`} width={400} onCancel={onClose} open={visible} footer={null}>
      <Form form={form} onFinish={onRejectOrder} layout="vertical" name="order-detail">
        <Form.Item name="reasonReject" label="Lý do từ chối đơn hàng">
          <Radio.Group onChange={handleReasonChange}>
            <Radio value="Không đúng phản hồi">Không đúng phản hồi</Radio>
            <Radio value="Ngoài thời gian bảo hành">Ngoài thời gian bảo hành</Radio>
            <Radio value="Vi phạm chính sách">Vi phạm chính sách</Radio>
            <Radio value="Khác">Khác</Radio>
          </Radio.Group>
        </Form.Item>
        {reason === 'Khác' && (
          <Form.Item name="otherReason">
            <Input.TextArea rows={3} placeholder="Nhập lý do khác" />
          </Form.Item>
        )}
        <Form.Item hidden name="orderReturnId">
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
