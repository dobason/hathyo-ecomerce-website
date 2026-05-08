import { SearchOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useCallback } from 'react';
import { useSearch } from './hooks';

let timeoutId: any;

const Search = () => {
  const [form] = Form.useForm();
  const { onFinish } = useSearch();

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
    <Form onValuesChange={handleValuesChange} form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="q" help={false} noStyle>
        <Input placeholder="Tìm theo tên, nội dung series" prefix={<SearchOutlined />} allowClear />
      </Form.Item>
    </Form>
  );
};

export default Search;
