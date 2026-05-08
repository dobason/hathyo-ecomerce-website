import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useAccess } from "@umijs/max";
import CategoriesTable from './components/CategoriesTable';
import CategoryModal from './components/CategoriesTable/CategoryModal';
import { useCategoriesTable } from './components/CategoriesTable/hooks';

const CategoriesProducts: React.FC = () => {
  const {
    visible,
    loading: loadingForm,
    onCreate,
    setVisible,
  } = useCategoriesTable();

  const { admin } = useAccess();

  return (
    <PageContainer
      extra={
        admin ? [
          <Button
            key="add-category"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Thêm danh mục
          </Button>,
        ] : []
      }
    >
      <CategoriesTable />
      <CategoryModal
        visible={visible}
        setVisible={setVisible}
        onOk={onCreate}
        loading={loadingForm}
      />
    </PageContainer>
  );
};

export default CategoriesProducts;
