import { list } from '@/services/categories/api';
import { categoriesTransforms } from '@/utils/func';
import { useRequest } from '@umijs/max';
import { Form, TreeSelect } from 'antd';
type Props = {
  requiredRule?: boolean;
  title?: string;
  formName?: string;
};

export const SelectCategory = ({
  formName = 'parentId',
  requiredRule = true,
  title = 'Danh mục',
}: Props) => {
  const { loading, data } = useRequest(list);

  return (
    <Form.Item
      name={formName}
      label={title}
      required={false}
      {...(requiredRule
        ? {
            rules: [
              {
                required: true,
                message: 'Chọn danh mục',
              },
            ],
          }
        : {})}
    >
      <TreeSelect
        loading={loading}
        placeholder="Chọn danh mục"
        treeDataSimpleMode
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={categoriesTransforms(data?.categories as API.Category[])}
      />
    </Form.Item>
  );
};
