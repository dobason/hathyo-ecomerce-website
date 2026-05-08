import { UploadImage } from '@/components/UploadImage';
import city from '@/utils/city.json';
import district from '@/utils/district.json';
import ward from '@/utils/ward.json';
import { Card, Form, FormInstance, Input, Select, Switch, Typography } from 'antd';
import { filter, map } from 'lodash';
import React from 'react';

interface Props {
  avatar?: string;
  form: FormInstance;
}

const UserForm: React.FC<Props> = ({ avatar, form }) => {
  const cityId = Form.useWatch('city', form);
  const districtId = Form.useWatch('district', form);

  const changeCity = () => {
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const changeDistrict = () => {
    form.setFieldsValue({ ward: undefined });
  };

  return (
    <Card className="shadow-xl rounded-2xl p-6 md:p-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        <div className="flex justify-center md:justify-start">
          <UploadImage thumbnail={avatar} aspectRatio="1/1" formName="fileUpload" />
        </div>

        <div className="md:col-span-3 space-y-6">
          <Typography.Title level={5}>Thông tin người dùng</Typography.Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item name="firstname" label="Họ" rules={[{ required: true, message: 'Nhập họ' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="lastname"
              label="Tên"
              rules={[{ required: true, message: 'Nhập tên' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: 'Nhập số điện thoại' },
                {
                  pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/,
                  message: 'Số điện thoại không hợp lệ',
                },
              ]}
            >
              <Input disabled />
            </Form.Item>

            {/* <Form.Item
              name="identityNumber"
              label="Số CCCD/CMND"
              rules={[
                { required: true, message: 'Nhập số CCCD/CMND' },
                {
                  pattern: /^\d{9}$|^\d{12}$/,
                  message: 'Số CCCD/CMND phải có 9 hoặc 12 chữ số',
                },
              ]}
            >
              <Input />
            </Form.Item> */}

            <Form.Item name="banned" label="Trạng thái khóa tài khoản" valuePropName="checked">
              <Switch disabled checkedChildren="Bị khóa" unCheckedChildren="Hoạt động" />
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Địa chỉ */}
      <div>
        <Typography.Title level={5}>Địa chỉ</Typography.Title>
        <Form.Item
          name="address"
          label="Số nhà, đường"
          rules={[{ required: true, message: 'Nhập số nhà, đường' }]}
        >
          <Input />
        </Form.Item>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Form.Item
            name="city"
            label="Tỉnh/Thành phố"
            rules={[{ required: true, message: 'Chọn thành phố' }]}
          >
            <Select placeholder="Chọn thành phố" onChange={changeCity} disabled>
              {map(city, (item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="district"
            label="Quận/Huyện"
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
            name="ward"
            label="Phường/Xã"
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
      </div>
    </Card>
  );
};

export default UserForm;
