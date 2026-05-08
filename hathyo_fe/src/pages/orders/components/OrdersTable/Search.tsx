import { SelectMerchants } from '@/components/SelectMerchants';
import { ORDER_STATUS, ORDER_STATUS_TEXT } from '@/services/orders/constants';
import { useTableUrlParams } from '@/utils/func';
import { SearchOutlined } from '@ant-design/icons';
import { useAccess } from '@umijs/max';
import { Col, Form, Input, Row, Select } from 'antd';
import { map } from 'lodash';
import { useCallback } from 'react';
import { useSearch } from './hooks';

let timeoutId: any;

const Search = () => {
  const { status, merchantId } = useTableUrlParams();
  const [form] = Form.useForm();
  const { onFinish } = useSearch();
  const isAdmin = useAccess().admin;

  const handleValuesChange = useCallback((changedValues: Partial<any>) => {
    if (!!changedValues?.q) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Debounce the filter change by 1000ms
      timeoutId = setTimeout(() => {
        form.submit();
      }, 1000);
    } else {
      form.submit();
    }
  }, []);

  return (
    <Form
      onValuesChange={handleValuesChange}
      form={form}
      initialValues={{ status, merchantId: !!merchantId && merchantId !== '' ? merchantId : null }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={24}>
        {isAdmin && (
          <Col xs={12} md={8}>
            <SelectMerchants />
          </Col>
        )}
        <Col xs={12} md={8}>
          <Form.Item name="status" label="Trạng thái">
            <Select allowClear showSearch filterOption={false}>
              {map(ORDER_STATUS, (status: any) => (
                <Select.Option placeholder="Chọn trạng thái đơn hàng" key={status} value={status}>
                  {ORDER_STATUS_TEXT[status]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item name="orderCode" label="Mã đơn hàng">
            <Input placeholder="Nhập mã đơn hàng" prefix={<SearchOutlined />} allowClear />
          </Form.Item>
        </Col>
      </Row>
      {/* <div style={{ textAlign: 'right' }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Đặt lại
          </Button>
        </Space>
      </div> */}
    </Form>
  );
};

export default Search;
