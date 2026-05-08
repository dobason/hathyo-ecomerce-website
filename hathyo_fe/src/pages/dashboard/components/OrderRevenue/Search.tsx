import { DatePicker, Form } from 'antd';
import { SelectMerchants } from '@/components/SelectMerchants';
import { useTableUrlParams } from '@/utils/func';
import { useAccess } from '@umijs/max';
import moment from 'moment';
import { useEffect } from 'react';
import { useSearch } from './hooks';

const Search = () => {
  const [form] = Form.useForm();
  const { onFinish } = useSearch();
  const { createdTo, createdFrom, merchantId } = useTableUrlParams();
  const isAdmin = useAccess().admin;

  useEffect(() => {
    form.setFieldsValue({
      time: [
        createdFrom ? moment(createdFrom, 'YYYY-MM-DD') : undefined,
        createdTo ? moment(createdTo, 'YYYY-MM-DD') : undefined,
      ],
      merchantId: !!merchantId && merchantId !== '' ? parseInt(merchantId) : null,
    });
  }, [createdTo, createdFrom, merchantId]);

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={() => {
        const values = form.getFieldsValue();
        onFinish(values);
      }}
      className="w-full"
    >
      <div className="flex flex-row gap-4">
        {isAdmin && (
          <div className="w-full">
            <SelectMerchants noStyle />
          </div>
        )}
        <div className="w-full">
          <Form.Item name="time" noStyle>
            <DatePicker.RangePicker
              format="DD-MM-YYYY"
              className="w-full"
              allowClear
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default Search;
