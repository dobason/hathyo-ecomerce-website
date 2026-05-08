import {
  addProductRelatedPost,
  deleteProductRelatedPost,
  productRelatedPost,
} from '@/services/posts/api';
import { productSearch } from '@/services/products/api';
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useRequest } from '@umijs/max';
import {
  Avatar,
  Button,
  Col,
  Row,
  Select,
  Spin,
  Table,
  Tag,
  Typography,
} from 'antd';
import { debounce, map } from 'lodash';
import numeral from 'numeral';
import React, { memo, useMemo } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  anchoPrice?: number;
  mainImageUrl?: string;
  productCode: string;
};

const RelatedProducts: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    loading: searching,
    run: onSearch,
    data: productSearchResponse,
  } = useRequest((query: string = '') => productSearch({ query }), {
    manual: true,
  });

  const {
    loading,
    data: relatedData,
    refresh,
  } = useRequest(() => (id ? productRelatedPost({ id }) : Promise.resolve([])));

  const { loading: adding, run: addProduct } = useRequest(
    (productId: number) => addProductRelatedPost({ id: id!, productId }),
    {
      manual: true,
      onSuccess: refresh,
    },
  );

  const { loading: deleting, run: deleteProduct } = useRequest(
    (productId: number) => deleteProductRelatedPost({ id: id!, productId }),
    {
      manual: true,
      onSuccess: refresh,
    },
  );

  const handleAddProduct = (productId: number) => {
    addProduct(productId);
  };

  const columns = useMemo(() => {
    return [
      {
        title: 'Tên sản phẩm',
        key: 'title',
        render: (record: Product) => (
          <Row gutter={12}>
            <Col>
              <Avatar
                src={record.mainImageUrl}
                shape="square"
                size={60}
              />
            </Col>
            <Col>
              <div>
                <Typography.Text>{record.title}</Typography.Text>
              </div>
              <div>
                {record.anchoPrice && (
                  <Typography.Text
                    style={{ marginRight: 12 }}
                    delete
                  >
                    {numeral(record.anchoPrice).format('0,0')}đ
                  </Typography.Text>
                )}
                <Typography.Text>
                  {numeral(record.price).format('0,0')}đ
                </Typography.Text>
              </div>
              <div>
                <Tag color="green">
                  <Typography.Text copyable={{ text: record.productCode }}>
                    {record.productCode}
                  </Typography.Text>
                </Tag>
              </div>
            </Col>
          </Row>
        ),
      },
      {
        title: 'Tác vụ',
        key: 'action',
        width: 100,
        render: (record: Product) => (
          <Button danger loading={deleting} onClick={() => deleteProduct(record.id)}>
            Xoá
          </Button>
        ),
      },
    ];
  }, [deleting, deleteProduct]);

  return (
    <Spin spinning={loading}>
      <div className="p-4">
        <Row gutter={[24, 12]}>
          <Col span={24}>
            <Typography.Text strong>Chọn sản phẩm liên quan:</Typography.Text>
          </Col>
          <Col span={24}>
            <Select
              mode="multiple"
              value={[]}
              style={{ width: '100%' }}
              loading={searching}
              onSearch={debounce(onSearch, 500)}
              showSearch
              placeholder="Tìm kiếm sản phẩm liên quan đến bài viết"
            >
              {map(productSearchResponse?.products, (product: Product) => (
                <Select.Option key={product.id} value={product.title}>
                  <Row
                    onClick={() => handleAddProduct(product.id)}
                    justify="space-between"
                    className="cursor-pointer"
                  >
                    <Col>
                      <Typography.Text strong>{product.title}</Typography.Text>
                      <div>
                        <Typography.Text>
                          {numeral(product.price).format('0,0')} đ
                        </Typography.Text>
                      </div>
                    </Col>
                    <Col>
                      <Button type="link" icon={<PlusOutlined />}>
                        Thêm
                      </Button>
                    </Col>
                  </Row>
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col span={24} className="mt-4">
            <Typography.Text strong>Sản phẩm đã được liên kết:</Typography.Text>
          </Col>
          <Col span={24}>
            <Table<Product>
              rowKey="id"
              columns={columns}
              loading={adding || loading}
              dataSource={Array.isArray(relatedData) ? relatedData : []}
              pagination={false}
              bordered
              size="small"
            />
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default memo(RelatedProducts);
