import { PRODUCT_STATUS, PRODUCT_STATUS_TEXT } from '@/services/products/constants';
import { categoriesTransformsTree, useTableUrlParams } from '@/utils/func';
import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, Spin, TreeSelect } from 'antd';
import { map } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useCategoriesTable } from './categoryHooks';
import { useSearch } from './hooks';

let timeoutId: any;

const Search = () => {
  const [form] = Form.useForm();
  const { onFinish } = useSearch();
  const { page, size, q, categoryId, status } = useTableUrlParams();

  const { loading, data } = useCategoriesTable();
  const treeData = categoriesTransformsTree(data?.categories || [], 0);

  useEffect(() => {
    form.setFieldsValue({
      page,
      size,
      q,
      categoryId,
      status,
    });
  }, [page, size, q, categoryId, status]);

  const handleValuesChange = useCallback(
    (changedValues: Partial<any>) => {
      if (changedValues?.q !== undefined) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          form.submit();
        }, 1000);
      } else {
        form.submit();
      }
    },
    [form],
  );

  return (
    <Form onValuesChange={handleValuesChange} form={form} onFinish={onFinish} layout="vertical">
      <Row gutter={24}>
        <Col md={8} xs={24}>
          <Spin spinning={loading}>
            <Form.Item name="categoryId" label="Danh mục">
              <TreeSelect
                className="w-full"
                styles={{
                  popup: { root: { maxHeight: 400, overflow: 'auto' } },
                }}
                treeData={treeData}
                placeholder="Chọn danh mục hiển thị"
                allowClear
                treeDefaultExpandAll
              />
            </Form.Item>
          </Spin>
        </Col>
        <Col md={8} xs={24}>
          <Form.Item name="status" label="Trạng thái hiển thị">
            <Select placeholder="Chọn trạng thái hiển thị" allowClear>
              {map(PRODUCT_STATUS, (item) => (
                <Select.Option key={item} value={item}>
                  {PRODUCT_STATUS_TEXT[item]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={8} xs={24}>
          <Form.Item name="q" label="Tìm kiếm">
            <Input
              placeholder="Tìm theo tên, nội dung bài viết"
              prefix={<SearchOutlined />}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
