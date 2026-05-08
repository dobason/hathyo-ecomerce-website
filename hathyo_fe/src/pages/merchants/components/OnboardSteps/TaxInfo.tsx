import { Alert, Button, Card, Col, Form, Input, Row, Select, Space, message } from 'antd';
import { filter, map } from 'lodash';
import React, { useState } from 'react';

import city from '@/utils/city.json';
import district from '@/utils/district.json';
import ward from '@/utils/ward.json';

import { UploadImage } from '@/components/UploadImage';
import FormItem from './FormItem';

type Props = {
  form: any;
  businessLicense?: string;
};

// Type for esgoo API response
type EsgooBusinessInfo = {
  success: boolean;
  data?: {
    name: string;
    address: string;
    representative: string;
    status: string;
    tax_code: string;
    date_of_issue: string;
    issued_by: string;
  };
  message?: string;
};

const TaxInfo: React.FC<Props> = ({ form, businessLicense }: Props) => {
  const cityId = Form.useWatch('city', form);
  const districtId = Form.useWatch('district', form);
  const taxNumber = Form.useWatch('taxNumber', form);

  // State for verification
  const [verificationResult, setVerificationResult] = useState<EsgooBusinessInfo | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const changeCity = () => {
    form.setFieldsValue({ district: undefined });
    form.setFieldsValue({ ward: undefined });
  };

  const changeDistrict = () => {
    form.setFieldsValue({ ward: undefined });
  };

  const EXISTING_SHOPS = [
    { tax_code: '0318170229', name: 'CÔNG TY TNHH ABC', address: '123 Nguyễn Trãi, Q1, TP.HCM' },
    { tax_code: '0101234567', name: 'CÔNG TY TNHH XYZ', address: '88 Lê Lợi, Hà Nội' },
  ];
  // Function to call esgoo API
  const verifyTaxNumber = async (taxCode: string) => {
    try {
      setIsVerifying(true);

      const cleanTaxCode = taxCode.replace(/-/g, '');

      // GỌI API esgoo
      const response = await fetch(`https://esgoo.net/api-mst/${cleanTaxCode}.htm`);
      const data = await response.json();
      if (!data.title) {
        message.warning('Không tìm thấy MST này trên hệ thống công khai');
        return;
      }

      const shopInfo = {
        name: data.title,
        address: data.address,
        tax_code: cleanTaxCode,
      };

      // MOCK: Kiểm tra xem MST này có nằm trong danh sách EXISTING_SHOPS không
      const duplicatedShop = EXISTING_SHOPS.find((s) => s.tax_code === cleanTaxCode);

      if (duplicatedShop) {
        message.error(`Mã số thuế đã được đăng ký cho shop: ${duplicatedShop.name}`);
        setVerificationResult({
          success: false,
          message: `Mã số thuế này đã tồn tại với shop ${duplicatedShop.name}`,
        });
        return;
      }

      // Nếu chưa tồn tại -> hiển thị thông tin
      setVerificationResult({
        success: true,
        data: {
          name: shopInfo.name,
          address: shopInfo.address,
          representative: data.owner,
          status: data.status,
          tax_code: shopInfo.tax_code,
          date_of_issue: data.date,
          issued_by: 'Sở KHĐT',
        },
      });

      message.success('Mã số thuế hợp lệ, chưa đăng ký trong hệ thống!');
    } catch (err) {
      console.error('Verification error:', err);
      message.error('Lỗi khi xác thực mã số thuế');
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle verification button click
  const handleVerification = () => {
    if (!taxNumber) {
      message.warning('Vui lòng nhập mã số thuế trước khi kiểm tra');
      return;
    }

    // Validate tax number format before API call
    const taxPattern = /^(?:\d{10}|\d{10}-\d{3}|\d{13}|\d{14})$/;
    if (!taxPattern.test(taxNumber)) {
      message.error('Mã số thuế không đúng định dạng');
      return;
    }

    verifyTaxNumber(taxNumber);
  };

  return (
    <Card className="rounded-xl shadow-md p-6">
      <div className="flex flex-col items-start gap-6">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Thông tin thuế</h2>
          <div className="w-full">
            <p className="font-medium mb-2">Địa chỉ kinh doanh</p>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <FormItem
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: 'Nhập Địa chỉ' }]}
                >
                  <Input placeholder="Nhập địa chỉ" className="w-full" />
                </FormItem>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <FormItem
                  label="Tỉnh/Thành phố"
                  name="city"
                  rules={[{ required: true, message: 'Chọn thành phố' }]}
                >
                  <Select placeholder="Chọn thành phố" onChange={changeCity}>
                    {map(city, (item) => (
                      <Select.Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <FormItem
                  label="Quận/Huyện"
                  name="district"
                  rules={[{ required: true, message: 'Chọn quận/huyện' }]}
                >
                  <Select placeholder="Chọn quận/huyện" onChange={changeDistrict}>
                    {map(filter(district, { city_id: cityId }), (item) => (
                      <Select.Option key={item?.id} value={item?.id}>
                        {item?.type_district} {item?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <FormItem
                  label="Phường/Xã"
                  name="ward"
                  rules={[{ required: true, message: 'Chọn phường/xã' }]}
                >
                  <Select placeholder="Chọn phường/xã">
                    {map(filter(ward, { district_id: districtId }), (item) => (
                      <Select.Option key={item?.id} value={item?.id}>
                        {item?.type_ward} {item?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </div>
          <FormItem
            name="taxNumber"
            label="Mã số thuế"
            rules={[
              {
                required: true,
                message: 'Nhập mã số thuế',
              },
              {
                pattern: /^(?:\d{10}|\d{10}-\d{3}|\d{13}|\d{14})$/,
                message: 'Mã số thuế không hợp lệ',
              },
            ]}
          >
            <Space.Compact style={{ display: 'flex', width: '100%' }}>
              <Input placeholder="Nhập mã số thuế" className="max-w-md" style={{ flex: 1 }} />
              <Button
                type="primary"
                onClick={handleVerification}
                loading={isVerifying}
                disabled={!taxNumber}
              >
                Kiểm tra
              </Button>
            </Space.Compact>
          </FormItem>

          {/* Verification Result Display */}
          {verificationResult && (
            <div className="mt-4 max-w-2xl">
              {verificationResult.success && verificationResult.data ? (
                <Alert
                  message="Xác thực thành công ✓"
                  description={
                    <div className="space-y-1">
                      <p>
                        <strong>Tên doanh nghiệp:</strong> {verificationResult.data.name}
                      </p>
                      <p>
                        <strong>Địa chỉ:</strong> {verificationResult.data.address}
                      </p>
                      <p>
                        <strong>Người đại diện:</strong> {verificationResult.data.representative}
                      </p>
                      <p>
                        <strong>Trạng thái:</strong> {verificationResult.data.status}
                      </p>
                      <p>
                        <strong>Ngày cấp:</strong> {verificationResult.data.date_of_issue}
                      </p>
                      <p>
                        <strong>Nơi cấp:</strong> {verificationResult.data.issued_by}
                      </p>
                    </div>
                  }
                  type="success"
                  showIcon
                  closable
                  onClose={() => setVerificationResult(null)}
                />
              ) : (
                <Alert
                  message="Xác thực thất bại ✗"
                  description={
                    verificationResult.message ||
                    'Không tìm thấy thông tin doanh nghiệp với mã số thuế này. Vui lòng kiểm tra lại.'
                  }
                  type="error"
                  showIcon
                  closable
                  onClose={() => setVerificationResult(null)}
                />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start gap-2 mt-4">
          <p className="font-medium">Giấy tờ liên quan</p>
          <p className="text-gray-500 max-w-md text-sm">
            Upload giấy tờ pháp lý liên quan như giấy chứng nhận hộ kinh doanh/cá nhân, ...
          </p>
          <UploadImage
            width={250}
            height={120}
            thumbnail={businessLicense}
            wrapperCol={{ span: 24 }}
            title=""
            hintTitle="Upload ảnh pháp lý"
            noStyle={false}
            formName="businessLicenseTempt"
          />
        </div>
      </div>
    </Card>
  );
};

export default TaxInfo;
