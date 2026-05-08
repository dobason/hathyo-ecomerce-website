import { useRequest } from '@umijs/max';
import { Form, Select } from 'antd';
import { debounce, isEmpty, map, uniqBy } from 'lodash';
import { useEffect, useState } from 'react';

import { list } from '@/services/tags/api';

export const SelectTags = ({ tags: defaultTags }: { tags?: API.TagItem[] }) => {
  const [tags, setTags] = useState([] as Array<API.TagItem>);
  const { loading, data, run } = useRequest((key) => list({ query: key }));

  useEffect(() => {
    if (!isEmpty(data?.tags)) {
      setTags((prev) => uniqBy([...prev, ...data?.tags], 'id'));
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(defaultTags)) {
      setTags((prev) => uniqBy([...prev, ...(defaultTags as API.TagItem[])], 'id'));
    }
  }, [defaultTags]);

  const onSearch = (value: string) => {
    setTimeout(() => {
      run(value);
    }, 0);
  };

  return (
    <Form.Item
      name="tags"
      label="Tags"
      required={false}
      rules={[
        {
          required: true,
          message: 'Chọn tags',
        },
      ]}
    >
      <Select
        filterOption={false}
        onSearch={debounce(onSearch, 500)}
        mode="tags"
        placeholder="Tìm kiếm tags"
        loading={loading}
      >
        {map(tags, (item) => (
          <Select.Option key={item?.id} value={item?.id}>
            {item?.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
