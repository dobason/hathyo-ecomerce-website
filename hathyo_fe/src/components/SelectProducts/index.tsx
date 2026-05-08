import { useRequest } from '@umijs/max';
import { Form, Select } from 'antd';
import { debounce, isEmpty, map, uniqBy } from 'lodash';
import { useEffect, useState } from 'react';

import { products } from '@/services/products/api'; // 👈 thay đường dẫn tương ứng nếu khác

export const SelectProducts = () => {
  const [productList, setProductList] = useState<API.Product[]>([]);

  const { loading, data, run } = useRequest((q: string) =>
    products({ page: 0, size: 200, q })
  );

  useEffect(() => {
    if (!isEmpty(data?.products) && Array.isArray(data?.products)) {
      setProductList((prev) => uniqBy([...prev, ...data.products], 'id'));
    }
  }, [data]);

  const onSearch = (value: string) => {
    setTimeout(() => {
      run(value);
    }, 0);
  };

  return (
    <Form.Item name="productId" label="Sản phẩm" required={false}>
      <Select
        allowClear
        showSearch
        filterOption={false}
        onSearch={debounce(onSearch, 500)}
        placeholder="Tìm kiếm sản phẩm"
        loading={loading}
      >
        {map(productList, (item) => (
          <Select.Option key={item?.id} value={item?.id}>
            {item?.title ?? `#${item?.id}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
