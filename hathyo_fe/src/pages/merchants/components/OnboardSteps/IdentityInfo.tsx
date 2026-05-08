import { Card, Checkbox, Col, Input, Row, Typography } from 'antd';
import React from 'react';
import { UploadImage } from '@/components/UploadImage';
import FormItem from './FormItem';

interface Props {
  identityImageBack?: string;
  identityImageFront?: string;
}

const IdentityInfo: React.FC<Props> = ({ identityImageBack, identityImageFront }) => {
  return (
    <Card className="shadow-sm rounded-xl p-6">
      <div className="flex flex-col items-center mb-6">
        <Col md={16} xs={24} className="w-full max-w-md">
          <FormItem
            name="identityNumber"
            label="Số CCCD/CMND"
            rules={[
              { required: true, message: 'Nhập số CCCD/CMND' },
              {
                pattern: /^\d{9}|\d{12}$/,
                message: 'Số CCCD/CMND không hợp lệ (phải gồm 9 hoặc 12 chữ số)',
              },
            ]}
          >
            <Input placeholder="Nhập số CCCD/CMND" className="w-full" />
          </FormItem>
        </Col>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <div className="flex flex-col items-center gap-2">
          <Typography.Text strong>Mặt trước CCCD</Typography.Text>
          <UploadImage
            width={250}
            height={120}
            aspectRatio="85.6/53.98"
            thumbnail={identityImageFront}
            wrapperCol={{ span: 24 }}
            title=""
            hintTitle="Chọn ảnh mặt trước CCCD"
            noStyle={false}
            formName="identityImageFrontTempt"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Typography.Text strong>Mặt sau CCCD</Typography.Text>
          <UploadImage
            width={250}
            height={120}
            aspectRatio="85.6/53.98"
            thumbnail={identityImageBack}
            wrapperCol={{ span: 24 }}
            noStyle={false}
            title=""
            hintTitle="Chọn ảnh mặt sau CCCD"
            formName="identityImageBackTempt"
          />
        </div>
      </div>

      <Row>
        <Col span={24}>
          <FormItem
            name="agreed"
            valuePropName="checked"
            rules={[{ required: true, message: 'Vui lòng đồng ý điều khoản' }]}
          >
            <Checkbox className="text-sm">
              Tôi xác nhận tất cả dữ liệu đã cung cấp là chính xác và trung thực. Tôi đã đọc và đồng
              ý với{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://hathyo.com/terms/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Chính Sách Bảo Mật của Hathyo
              </a>
            </Checkbox>
          </FormItem>
        </Col>
      </Row>
    </Card>
  );
};

export default IdentityInfo;