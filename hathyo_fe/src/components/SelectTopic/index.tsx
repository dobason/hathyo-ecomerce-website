import { list } from '@/services/topics/api';
import { topicTransforms } from '@/utils/func';
import { useRequest } from '@umijs/max';
import { Form, TreeSelect } from 'antd';
type Props = {
  requiredRule?: boolean;
  title?: string;
};

export const SelectTopic = ({ requiredRule = true, title = 'Topic' }: Props) => {
  const { loading, data } = useRequest(list);

  return (
    <Form.Item
      name="topic"
      label={title}
      required={false}
      {...(requiredRule
        ? {
            rules: [
              {
                required: true,
                message: 'Chọn topic',
              },
            ],
          }
        : {})}
    >
      <TreeSelect
        loading={loading}
        placeholder="Chọn topic"
        treeDataSimpleMode
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={topicTransforms(data?.topics as API.Topic[])}
        allowClear
      />
    </Form.Item>
  );
};
