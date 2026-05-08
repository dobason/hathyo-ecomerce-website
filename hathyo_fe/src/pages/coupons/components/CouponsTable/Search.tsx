import { SearchOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import React, { useCallback, useRef } from 'react';
import { useSearch } from './hooks';

const Search: React.FC<{ run: () => Promise<any> }> = ({ run }) => {
  const [form] = Form.useForm();
  const { onFinish } = useSearch({ run });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleValuesChange = useCallback((changedValues: Partial<any>) => {
    if (changedValues?.q !== undefined) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        form.submit();
      }, 500);
    }
  }, [form]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onValuesChange={handleValuesChange}
      layout="vertical"
    >
      <Form.Item name="q" help={false} noStyle>
        <Input
          placeholder="Tìm kiếm coupon theo mã hoặc tiêu đề"
          prefix={<SearchOutlined />}
          allowClear
        />
      </Form.Item>
    </Form>
  );
};

export default React.memo(Search);
