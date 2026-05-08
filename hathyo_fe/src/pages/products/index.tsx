import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import ProductTable from './components/Products/ProductTable';
import { useProductTable } from './components/Products/ProductTable/hooks';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';

const Products: React.FC = () => {
  const { loading, data, run, handleDelete, handlePatchStatus } = useProductTable();

  return (
    <PageContainer
      extra={
        <Link to="/products/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm sản phẩm
          </Button>
        </Link>
      }
    >
      <ProductTable {...{ loading, data, run, handleDelete, handlePatchStatus }} />
    </PageContainer>
  );
};

export default Products;
