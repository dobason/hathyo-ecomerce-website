import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { SelectTopic } from '@/components/SelectTopic';
import { POST_STATUS } from '@/services/posts/constants';
import { useTableUrlParams } from '@/utils/func';
import { map } from 'lodash';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { useSearch } from './hooks';

let timeoutId: any;

const Search = ({ run }: { run: () => Promise<any> }) => {
  const [form] = Form.useForm();
  const { onFinish } = useSearch({ run });
  const { page, size, q, type, topic, createdTo, createdFrom } = useTableUrlParams();

  useEffect(() => {
    form.setFieldsValue({
      page,
      size,
      q,
      type: type || undefined,
      topic: topic || undefined,
      time: [
        createdFrom ? moment(createdFrom, 'YYYY-MM-DD') : undefined,
        createdTo ? moment(createdTo, 'YYYY-MM-DD') : undefined,
      ],
    });
  }, [page, size, q, type, topic, createdTo, createdFrom]);

  const handleValuesChange = useCallback((changedValues: Partial<any>, allValues: any) => {
    console.log('Changed Values:', changedValues);
    console.log('All Values:', allValues);
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
      <Row gutter={[12, 12]}>
        <Col md={6} xs={24}>
          <Form.Item name="q" label="Tìm kiếm">
            <Input placeholder="Tìm theo tên, nội dung bài viết" prefix={<SearchOutlined />} allowClear/>
          </Form.Item>
        </Col>
        <Col md={6} xs={24}>
          <Form.Item name="type" label="Trạng thái hiển thị">
            <Select placeholder="Chọn trạng thái hiển thị" allowClear>
              {map(POST_STATUS, (item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6} xs={24}>
          <SelectTopic requiredRule={false} />
        </Col>
        <Col md={6} xs={24}>
          <Form.Item name="time" label="Ngày đăng">
            <DatePicker.RangePicker format="DD-MM-YYYY" style={{ width: '100%' }} picker="date" placeholder={["Từ", "Đến"]} allowClear/>
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
