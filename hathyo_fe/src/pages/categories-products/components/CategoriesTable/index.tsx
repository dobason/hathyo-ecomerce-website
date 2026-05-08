"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Spin,
  Popconfirm,
  Card,
  Button,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAccess } from "@umijs/max";
import { useCategoriesTable } from "./hooks";
import CategoryModal from "./CategoryModal";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  childCategories?: CategoryItem[];
}

interface TableRow extends CategoryItem {
  key: number;
  children?: TableRow[];
}

const CategoriesTable: React.FC = () => {
  const {
    visible,
    loading,
    data,
    onCreate,
    setVisible,
    onDelete,
  } = useCategoriesTable();

  const { admin } = useAccess();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transformNestedCategories = (categories: CategoryItem[]): TableRow[] =>
    categories.map((category) => ({
      key: category.id,
      id: category.id,
      name: category.name,
      slug: category.slug,
      children: transformNestedCategories(category.childCategories || []),
    }));

  const treeData = transformNestedCategories(data?.categories || []);

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Typography.Text strong className="text-gray-800">{text}</Typography.Text>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (text: string) => (
        <Typography.Text type="secondary" className="italic">{text}</Typography.Text>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (_: any, record: CategoryItem) =>
        admin ? (
          <Popconfirm
            title="Xác nhận xóa danh mục?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <Spin spinning={loading}>
      <Card className="rounded-xl shadow-md">
        <div className="p-4">
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={treeData}
              pagination={false}
              bordered
              expandable={{ defaultExpandAllRows: true }}
              // onRow={(record) => ({
              //   onClick: () => handleSelectCategory(record),
              // })}
              className="min-w-[600px] w-full"
              size={isMobile ? "small" : "middle"}
            />
          </div>
        </div>
      </Card>

      <CategoryModal
        visible={visible}
        setVisible={setVisible}
        onOk={onCreate}
        loading={loading}
      />
    </Spin>
  );
};

export default CategoriesTable;
