import { UploadImage } from '@/components/UploadImage';
import { COUPON_TYPE_OPTIONS, DISCOUNT_TYPE_OPTIONS } from '@/services/coupons/constants';
import { SyncOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import React, { useState } from 'react';
// import { SelectMerchants } from '@/components/SelectMerchants';
// import { SelectProducts } from '@/components/SelectProducts';

const { RangePicker } = DatePicker;

type Props = {
  form: FormInstance;
  thumbnail?: string;
};

const generateCouponCode = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `HATHYO${random}`;
};

const CouponForm: React.FC<Props> = ({ form, thumbnail }) => {
  const [generating, setGenerating] = useState(false);
  const [discountType, setDiscountType] = useState<'PERCENT' | 'VALUE'>(
    form.getFieldValue('discountType'),
  );

  const handleGenerateCode = () => {
    setGenerating(true);
    setTimeout(() => {
      const code = generateCouponCode();
      form.setFieldsValue({ code });
      setGenerating(false);
    }, 800);
  };

  return (
    <Card>
      <Row gutter={[24, 24]} className="flex flex-col md:flex-row">
        <Col xs={24} md={8}>
          <UploadImage thumbnail={thumbnail} formName="image" aspectRatio="4 / 3" />
        </Col>

        <Col xs={24} md={16} lg={24}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="code"
                label="Mã giảm giá"
                rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá' }]}
              >
                <Input
                  placeholder="Nhập mã hoặc bấm tạo mã"
                  disabled={generating}
                  addonAfter={
                    <Button
                      type="link"
                      icon={<SyncOutlined spin={generating} />}
                      onClick={handleGenerateCode}
                      disabled={generating}
                    >
                      {generating ? 'Đang tạo...' : 'Tạo mã'}
                    </Button>
                  }
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
              >
                <Input placeholder="Nhập tiêu đề" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
              >
                <Input.TextArea rows={3} placeholder="Nhập mô tả" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="discountType"
                label="Loại giảm giá"
                rules={[{ required: true, message: 'Chọn loại giảm giá' }]}
              >
                <Select
                  placeholder="Chọn loại giảm giá"
                  options={DISCOUNT_TYPE_OPTIONS}
                  onChange={(val) => {
                    setDiscountType(val);
                    form.setFieldsValue({
                      discountValue: undefined,
                      discountPercent: undefined,
                    });
                  }}
                />
              </Form.Item>
            </Col>

            {discountType === 'VALUE' && (
              <Col span={12}>
                <Form.Item
                  name="discountValue"
                  label="Giá trị giảm (VNĐ)"
                  rules={[{ required: true, message: 'Nhập giá trị giảm' }]}
                >
                  <InputNumber className="w-full" min={0} placeholder="0" />
                </Form.Item>
              </Col>
            )}

            {discountType === 'PERCENT' && (
              <Col span={12}>
                <Form.Item
                  name="discountPercent"
                  label="% giảm giá"
                  rules={[{ required: true, message: 'Nhập % giảm giá' }]}
                >
                  <InputNumber className="w-full" min={0} max={100} placeholder="%" />
                </Form.Item>
              </Col>
            )}

            <Col span={12}>
              <Form.Item name="minimumPriceApply" label="Giá tối thiểu áp dụng">
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="maxDiscountPrice" label="Giảm tối đa">
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[{ required: true, message: 'Nhập số lượng mã giảm giá' }]}
              >
                <InputNumber className="w-full" min={1} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="type"
                label="Loại coupon"
                rules={[{ required: true, message: 'Chọn loại mã giảm giá' }]}
              >
                <Select placeholder="Chọn loại coupon" options={COUPON_TYPE_OPTIONS} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="dateRange"
                label="Thời gian áp dụng"
                rules={[{ required: true, message: 'Chọn thời gian áp dụng' }]}
              >
                <RangePicker
                  showTime
                  className="w-full"
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder={['Bắt đầu', 'Kết thúc']}
                />
              </Form.Item>
            </Col>

            {/* <Col span={24}>
              <SelectMerchants />
            </Col>

            <Col span={24}>
              <SelectProducts />
            </Col> */}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CouponForm;
