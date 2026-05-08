'use client';

import MerchantTag from '@/components/MerchantTag';
import { UploadImage } from '@/components/UploadImage';
import { MERCHANT_TYPE, MERCHANT_TYPE_TEXT } from '@/services/merchants/constants';
import city from '@/utils/city.json';
import district from '@/utils/district.json';
import ward from '@/utils/ward.json';
import { Card, Col, Form, FormInstance, Input, Row, Select, Typography } from 'antd';
import { filter, map, values } from 'lodash';
import React from 'react';

interface Props {
  avatar?: string;
  merchantStatus?: string;
  form: FormInstance;
  businessLicense?: string;
}

const MerchantForm: React.FC<Props> = ({ avatar, merchantStatus, form, businessLicense }) => {
  const cityId = Form.useWatch('city', form);
  const districtId = Form.useWatch('district', form);

  const changeCity = () => {
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const changeDistrict = () => {
    form.setFieldsValue({ ward: undefined });
  };

  return (
    <Card className="shadow-lg rounded-xl p-6">
      <Row gutter={[32, 32]} className="flex flex-col md:flex-row">
        <Col xs={24} md={6} className="flex justify-center">
          <UploadImage thumbnail={avatar} aspectRatio="1/1" />
        </Col>

        <Col xs={24} md={18}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item name="email" label={<span className="font-semibold">Email</span>}>
              <Input readOnly placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="storeName"
              label={<span className="font-semibold">Tên cửa hàng</span>}
              rules={[{ required: true, message: 'Nhập tên cửa hàng' }]}
            >
              <Input readOnly placeholder="Tên cửa hàng" />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="font-semibold">Số điện thoại</span>}
              rules={[
                { required: true, message: 'Nhập sđt' },
                { pattern: /^(0|\+84)\d{9}$/, message: 'Số điện thoại không hợp lệ' },
              ]}
            >
              <Input readOnly placeholder="Số điện thoại" />
            </Form.Item>

            <Form.Item
              name="taxNumber"
              label={<span className="font-semibold">Mã số thuế</span>}
              rules={[{ required: true, message: 'Nhập mã số thuế' }]}
            >
              <Input readOnly placeholder="Nhập MST" />
            </Form.Item>

            <Form.Item
              name="identityNumber"
              label={<span className="font-semibold">Số CCCD/CMND</span>}
              rules={[{ required: true, message: 'Nhập số CCCD/CMND' }]}
            >
              <Input readOnly placeholder="Nhập số CCCD/CMND" />
            </Form.Item>

            <Form.Item
              name="merchantType"
              label={<span className="font-semibold">Loại cửa hàng</span>}
            >
              <Select placeholder="Chọn loại cửa hàng">
                {map(values(MERCHANT_TYPE), (item) => (
                  <Select.Option key={item} value={item}>
                    {MERCHANT_TYPE_TEXT[item]}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label={<span className="font-semibold">Trạng thái</span>}>
              <MerchantTag status={merchantStatus} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <Form.Item
              label={<span className="font-semibold">Địa chỉ</span>}
              name="address"
              rules={[{ required: true, message: 'Nhập Địa chỉ' }]}
            >
              <Input readOnly placeholder="Nhập địa chỉ" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Tỉnh/Thành phố</span>}
              name="city"
              rules={[{ required: true, message: 'Chọn thành phố' }]}
              initialValue={79}
            >
              <Select placeholder="Chọn thành phố" onChange={changeCity}>
                {map(
                  city.filter((item) => item.id === '79'),
                  (item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ),
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Quận/Huyện</span>}
              name="district"
              rules={[{ required: true, message: 'Chọn quận/huyện' }]}
            >
              <Select placeholder="Chọn quận/huyện" onChange={changeDistrict}>
                {map(filter(district, { city_id: cityId }), (item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.type_district} {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Phường/Xã</span>}
              name="ward"
              rules={[{ required: true, message: 'Chọn phường/xã' }]}
            >
              <Select placeholder="Chọn phường/xã">
                {map(filter(ward, { district_id: districtId }), (item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.type_ward} {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="mt-6 space-y-2 text-center">
            <Typography.Text strong className="text-lg block">
              Giấy tờ liên quan
            </Typography.Text>
            <Typography.Text type="secondary" className="text-sm">
              Upload giấy tờ pháp lý như giấy chứng nhận hộ kinh doanh/cá nhân, ...
            </Typography.Text>
            <div className="flex justify-center mt-2">
              <UploadImage
                aspectRatio="250/120"
                thumbnail={businessLicense}
                wrapperCol={{ span: 24 }}
                title=""
                hintTitle="Upload ảnh pháp lý"
                noStyle={false}
                formName="businessLicenseTempt"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default MerchantForm;
