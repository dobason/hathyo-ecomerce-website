import type { FormProps } from 'antd';
import { Descriptions, Divider, Drawer, Form, Image, List, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

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
  merchant: API.Merchants;
};

type OrderDetailDrawerProps = {
  visible: boolean;
  onClose: () => void;
  detail: OrderDetails | null | undefined;
  dataListCity?: API.CityResponse;
  dataServiceType?: API.ServiceTypeResponse;
  onGetServiceType: (city_id: any) => Promise<API.ServiceTypeResponse>;
  onTransOrder: FormProps<API.OrderTransRequest>['onFinish'];
};

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({ visible, onClose, detail }) => {
  const [form] = Form.useForm();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!!detail?.id) {
      form.setFieldValue('id', detail?.id);
    }
  }, [detail]);
  if (!detail) return null;

  const formatAddress = (address?: string, ward?: string, district?: string, province?: string) => {
    return [address, ward, district, province].filter(Boolean).join(', ');
  };

  return (
    <Drawer
      title={`#${detail.orderCode}`}
      width={isMobile ? '95vw' : '60vw'}
      onClose={onClose}
      open={visible}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Typography.Title level={5} style={{ marginBottom: 0 }}>
          {formatCurrency(detail.totalPrice)}
        </Typography.Title>
      }
    >
      <Descriptions title="Thông tin người mua" column={1} bordered>
        <Descriptions.Item label="Tên">{detail.customerName}</Descriptions.Item>
        <Descriptions.Item label="Liên hệ">{detail.customerPhone}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{detail.customerAddress}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Thông tin người bán" column={1} bordered>
        <Descriptions.Item label="Cửa hàng">
          <Image
            src={detail.merchant.logo}
            alt="product"
            width={24}
            style={{ borderRadius: '50%' }}
          />
          &nbsp;
          {detail.merchant.storeName}
        </Descriptions.Item>
        <Descriptions.Item label="Liên hệ">{detail.merchant.phoneNo}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {formatAddress(
            detail.merchant.address,
            detail.merchant.ward,
            detail.merchant.district,
            detail.merchant.city,
          )}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <List
        header={<strong>Sản phẩm</strong>}
        dataSource={detail.orderItems}
        renderItem={(item: ProductItem) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Image
                  src={item.productVariantImage}
                  alt="product"
                  width={48}
                  style={{ borderRadius: '5px' }}
                />
              }
              title={item.productTitle}
              description={`SKU: ${item.skuCode}`}
            />
            <div>
              <Typography.Text>{item.quantity}x </Typography.Text>
              <Typography.Text strong>{formatCurrency(item.productPrice)}</Typography.Text>
            </div>
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default OrderDetailDrawer;
