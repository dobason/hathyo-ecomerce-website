import type { FormProps } from 'antd';
import { Alert, Button, DatePicker, Form, FormInstance, Input, Modal, Select } from 'antd';
import { map } from 'lodash';
import React, { useEffect } from 'react';

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

type OrderDetailDrawerProps = {
  form: FormInstance;
  visible: boolean;
  onClose: () => void;
  detail: OrderDetails | null | undefined;
  dataListCity?: API.CityResponse;
  dataServiceType?: API.ServiceTypeResponse;
  onGetServiceType: (city_id: any) => Promise<API.ServiceTypeResponse>;
  onTransOrder: FormProps<API.OrderTransRequest>['onFinish'];
};

const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  form,
  visible,
  onClose,
  detail,
  dataListCity,
  dataServiceType,
  onGetServiceType,
  onTransOrder,
}) => {
  const serviceId = Form.useWatch('service_id', form);
  const dataServiceTypeChoose = dataServiceType?.message?.find((it) => it._id === serviceId);

  useEffect(() => {
    if (!!detail?.id) {
      form.setFieldValue('id', detail?.id);
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
      <Form form={form} onFinish={onTransOrder} layout="vertical" name="order-detail">
        <Form.Item name="city_id" label="Đơn vị lấy hàng">
          <Select
            placeholder="Đơn vị lấy hàng"
            onChange={(value: any) => {
              onGetServiceType(value);
            }}
          >
            {map(dataListCity?.message, (item) => (
              <Select.Option key={item._id} value={item?._id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="service_id" label="Dịch vụ vận chuyển">
          <Select placeholder="Dịch vụ vận chuyển">
            {map(dataServiceType?.message, (item) => (
              <Select.Option key={item._id} value={item?._id} label={item?.name}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          {dataServiceTypeChoose?.description_vi_vn && (
            <Alert
              description={
                <div
                  dangerouslySetInnerHTML={{ __html: dataServiceTypeChoose?.fee_description_vi_vn }}
                />
              }
              message={
                <div
                  dangerouslySetInnerHTML={{ __html: dataServiceTypeChoose?.description_vi_vn }}
                />
              }
              type="info"
            />
          )}
        </Form.Item>

        <Form.Item name="payment_method" label="Phương thức thanh toán">
          <Select placeholder="Phương thức thanh toán">
            {[
              { value: 'BALANCE', label: 'Thanh toán ví' },
              { value: 'CASH', label: 'Tiền mặt' },
              { value: 'CASH_BY_RECIPIENT', label: 'Người nhận thanh toán' },
            ].map(({ value, label }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="order_time" label="Thời gian lấy hàng">
          <DatePicker />
        </Form.Item>
        <Form.Item name="remarks" label="Ghi chú">
          <Input.TextArea rows={3} placeholder="Ghi chú" />
        </Form.Item>
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Button block type="primary" htmlType="submit">
          Xác nhận vận chuyển
        </Button>
      </Form>
    </Modal>
  );
};

export default OrderDetailDrawer;
