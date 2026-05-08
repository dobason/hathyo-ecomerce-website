import { Card, Input, Select } from 'antd';
import { map, values } from 'lodash';
import React from 'react';

import { UploadImage } from '@/components/UploadImage';
import { MERCHANT_TYPE, MERCHANT_TYPE_TEXT } from '@/services/merchants/constants';

import FormItem from './FormItem';

type Props = {
  logo?: string;
  merchantStatus?: string;
};

const ShopInfo: React.FC<Props> = ({ logo }: Props) => {
  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Thông tin cửa hàng</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Avatar/logo */}
        <div className="md:col-span-2 flex justify-center md:justify-start">
          <UploadImage
            title="Upload logo"
            hintTitle="Logo cửa hàng"
            width={256}
            height={256}
            thumbnail={logo}
            noStyle={false}
          />
        </div>

        {/* Form Info */}
        <div className="md:col-span-3 space-y-4">
          <FormItem name="email" label="Email">
            <Input readOnly placeholder="Nhập email" />
          </FormItem>

          <FormItem
            name="storeName"
            label="Tên cửa hàng"
            rules={[{ required: true, message: 'Nhập tên cửa hàng' }]}
          >
            <Input placeholder="Tên cửa hàng" />
          </FormItem>

          <FormItem
            name="description"
            label="Mô tả cửa hàng"
            rules={[
              { required: true, message: 'Nhập mô tả cửa hàng' },
              { min: 10, message: 'Ít nhất có 10 kí tự trở lên' },
            ]}
          >
            <Input.TextArea rows={2} placeholder="Mô tả cửa hàng" />
          </FormItem>

          <FormItem
            name="phoneNo"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Nhập số điện thoại' },
              { pattern: /^(0|\+84)\d{9}$/, message: 'Số điện thoại không hợp lệ' },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </FormItem>

          <FormItem name="merchantType" label="Loại cửa hàng">
            <Select placeholder="Chọn loại cửa hàng">
              {map(values(MERCHANT_TYPE), (item) => (
                <Select.Option key={item} value={item}>
                  {MERCHANT_TYPE_TEXT[item]}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </div>
      </div>
    </Card>
  );
};

export default ShopInfo;