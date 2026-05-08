import { useRequest } from '@umijs/max';
import { Form, Select } from 'antd';
import { debounce, isEmpty, map, uniqBy } from 'lodash';
import { useEffect, useState } from 'react';

import { list } from '@/services/series/api';

export const SelectSeries = ({ series: defaultSeries }: { series?: API.Series }) => {
  const [series, setSeries] = useState([] as Array<API.Series>);
  const { loading, data, run } = useRequest((key) => list({ query: key }));

  useEffect(() => {
    if (!isEmpty(data?.series)) {
      setSeries((prev) => uniqBy([...prev, ...data?.series], 'id'));
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(defaultSeries)) {
      setSeries((prev) => uniqBy([...prev, defaultSeries], 'id'));
    }
  }, [defaultSeries]);

  const onSearch = (value: string) => {
    setTimeout(() => {
      run(value);
    }, 0);
  };

  return (
    <Form.Item
      name="series"
      label="Chuỗi bài viết"
      required={false}
      // rules={[
      //   {
      //     required: true,
      //     message: 'Chọn series',
      //   },
      // ]}
    >
      <Select
        allowClear
        showSearch
        filterOption={false}
        onSearch={debounce(onSearch, 500)}
        placeholder="Tìm kiếm series"
        loading={loading}
      >
        {map(series, (item) => (
          <Select.Option key={item?.id} value={item?.id}>
            {item?.title}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
