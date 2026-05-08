import type { FormProps } from 'antd';
import { Alert, Descriptions, Divider, Drawer, Form, Image, List, Typography } from 'antd';
import React, { useEffect } from 'react';

type Merchant = {
  id: number;
  email: string;
  fullName: string;
  userId: string;
  merchantType: string;
  merchantStatus: string;
  merchantCode: string;
  storeName: string;
  logo: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  phoneNo: string;
  identityNumber: string;
  identityImageFront: string;
  identityImageBack: string;
  taxNumber: string;
  businessLicense: string;
  createdAt: string;
  updatedAt: string;
  numOfTotalProducts: number;
  numOfFollowers: number;
  responseRate: number;
  agreed: boolean;
};

type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  productTitle: string;
  productVariantTitle: string;
  productVariantImage: string;
  skuCode: string;
  productPrice: number;
  discountProductPrice: number;
  totalPrice: number;
  quantity: number;
  createdAt: string;
  returned: boolean;
  chooseReturn: boolean;
};

type RefundRequest = {
  id: number;
  userId: string;
  bankName: string;
  bankHolder: string;
  bankNumber: string;
  orderId: number;
  merchant: Merchant;
  commentReturn: string;
  imageUrls: string;
  reasonReject: string | null;
  shippingId: string | null;
  status: string;
  refundSentByAdmin: string | null;
  refundImage: string | null;
  refundReceivedByUser: boolean;
  returnTime: string;
  streetAddress: string;
  wardId: number;
  ward: string;
  districtId: number;
  district: string;
  provinceId: number;
  province: string;
  returnPhone: string;
  returnName: string;
  cancelBy: string | null;
  cancelReason: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
};

type OrderDetailDrawerProps = {
  visible: boolean;
  onClose: () => void;
  detail: RefundRequest | null | undefined;
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

  useEffect(() => {
    if (!!detail?.id) {
      form.setFieldValue('id', detail?.id);
    }
  }, [detail]);
  if (!detail) return null;

  const formatAddress = (address: string, ward: string, district: string, province: string) => {
    return [address, ward, district, province].filter(Boolean).join(', ');
  };

  return (
    <Drawer
      title={`#${detail?.id}`}
      width={400}
      onClose={onClose}
      open={visible}
      styles={{ body: { paddingBottom: 80 } }}
    >
      <Descriptions title="Thông tin người yêu cầu" column={1} bordered>
        <Descriptions.Item label="Tên">{detail?.returnName}</Descriptions.Item>
        <Descriptions.Item label="Liên hệ">{detail?.returnPhone}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {formatAddress(detail?.streetAddress, detail?.ward, detail?.district, detail?.province)}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Thông tin nhận tiền" column={1} bordered>
        <Descriptions.Item label="Ngân hàng">{detail?.bankName}</Descriptions.Item>
        <Descriptions.Item label="Chủ tài khoản">{detail?.bankHolder}</Descriptions.Item>
        <Descriptions.Item label="Số tài khoản">{detail?.bankNumber}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <div className="flex flex-col gap-2">
        <strong>Lý do hoàn</strong>
        <div className="flex flex-col gap-1">
          <Image
            src={detail?.imageUrls}
            width="100%"
            style={{ objectFit: 'cover', borderRadius: 8 }}
          />
          <Alert message={detail?.commentReturn} type="info" showIcon />
        </div>
      </div>
      <Divider />
      <List
        header={<strong>Sản phẩm</strong>}
        dataSource={detail?.orderItems}
        renderItem={(item: OrderItem) => (
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
