import { useRequest } from '@umijs/max';
import { Form, Select } from 'antd';
import { debounce, isEmpty, map, uniqBy } from 'lodash';
import { useEffect, useState } from 'react';

import { merchants } from '@/services/merchants/api';

type Props = {
  noStyle?: boolean;
  required?: boolean;
  name?: string;
  label?: string;
};

export const SelectMerchants: React.FC<Props> = ({
  noStyle = false,
  required = false,
  name = 'merchantId',
  label = 'Người bán',
}) => {
  const [merchant, setMerchant] = useState<API.Merchants[]>([]);
  const { loading, data, run } = useRequest(
    (key) => merchants({ page: 0, size: 200, q: key }),
    { manual: true }
  );

  useEffect(() => {
    if (!isEmpty(data?.merchants) && Array.isArray(data?.merchants)) {
      setMerchant((prev) => uniqBy([...prev, ...data.merchants], 'id'));
    }
  }, [data]);

  const onSearch = debounce((value: string) => {
    run(value);
  }, 500);

  const selectNode = (
    <Select
      allowClear
      showSearch
      filterOption={false}
      onSearch={onSearch}
      placeholder="Tìm kiếm người bán"
      loading={loading}
      className="w-full"
    >
      {map(merchant, (item) => (
        <Select.Option key={item?.id} value={item?.id}>
          {item?.storeName ?? item?.phoneNo ?? 'Cửa hàng chưa đặt tên'}
        </Select.Option>
      ))}
    </Select>
  );

  return noStyle ? (
    <Form.Item name={name} noStyle required={required}>
      {selectNode}
    </Form.Item>
  ) : (
    <Form.Item name={name} label={label} required={required}>
      {selectNode}
    </Form.Item>
  );
};
