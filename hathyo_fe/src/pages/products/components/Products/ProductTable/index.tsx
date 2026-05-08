import ProductStatusDropdown from '@/components/ProductStatusDropdown';
import ProductTag from '@/components/ProductTag';
import { useTableUrlParams } from '@/utils/func';
import { Link, history } from '@umijs/max';
import { Card, Col, Image, Row, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Search from './Search';

const formatUnit = (unit?: string, childrenUnit?: string) => {
  return [unit, childrenUnit].filter(Boolean).join('/ ');
};

type ColumnProps = {
  handleDelete: (id: string | number) => any;
  handlePatchStatus: (a: any) => any;
};

const getColumns = ({ handleDelete, handlePatchStatus }: ColumnProps): ColumnsType<API.Product> => [
  {
    title: 'SKU',
    key: 'code',
    dataIndex: 'productCode',
    width: 130,
    render: (_: any, record: API.Product) => (
      <Link to={`/products/${record.id}`}>#{record.productCode}</Link>
    ),
  },
  {
    title: 'Sản phẩm',
    key: 'title',
    dataIndex: 'title',
    render: (_: any, record: API.Product) => (
      <Link to={`/products/${record.id}`} className="flex gap-2 items-center">
        <Image
          preview={false}
          width={32}
          src={typeof record.mainImageUrl === 'string' ? record.mainImageUrl : '/fallback.png'}
          fallback="/fallback.png"
        />
        <div className="flex-1">
          <div className="ellipsis-content text-sm font-medium text-gray-800">{record.title}</div>
        </div>
      </Link>
    ),
  },
  {
    title: 'Đơn giá',
    key: 'price',
    dataIndex: 'price',
    width: 160,
    render: (price: number) => (
      <Typography.Text strong>{numeral(price).format('0,0')}đ</Typography.Text>
    ),
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    width: 180,
    align: 'center' as const,
    render: (status: string) => <ProductTag status={status} />,
  },
  {
    title: 'Đơn vị',
    key: 'unit',
    dataIndex: 'unit',
    width: 120,
    render: (_: any, record: API.Product) => (
      <Typography.Text strong>{formatUnit(record.unit, record.childrenUnit)}</Typography.Text>
    ),
  },
  {
    title: 'Ngày tạo',
    key: 'createdAt',
    dataIndex: 'createdAt',
    width: 180,
    render: (createdAt: string) => moment(createdAt).format('DD-MM-YYYY HH:mm:ss'),
  },
  {
    title: 'Tác vụ',
    key: 'action',
    width: 180,
    fixed: 'right' as const,
    align: 'center' as const,
    render: (_: any, record: API.Product) => (
      <ProductStatusDropdown
        handleDelete={handleDelete}
        handlePatchStatus={handlePatchStatus}
        product={record}
        id={record.id}
      />
    ),
  },
];

const ProductTable: React.FC<any> = ({ loading, data, run, handleDelete, handlePatchStatus }) => {
  const params = useTableUrlParams();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card className="rounded-xl shadow-sm">
          <Search run={run} />
        </Card>
      </Col>
      <Col span={24}>
        <Card className="rounded-xl shadow-sm">
          {isMobile ? (
            <Space direction="vertical" size="middle" className="w-full">
              {data?.products?.map((record: API.Product) => (
                <Card key={record.id} size="small" className="rounded-xl shadow border p-3">
                  <Row gutter={12}>
                    <Col span={6}>
                      <Image
                        preview={false}
                        width="100%"
                        src={
                          typeof record.mainImageUrl === 'string'
                            ? record.mainImageUrl
                            : '/fallback.png'
                        }
                        fallback="/fallback.png"
                      />
                    </Col>
                    <Col span={18}>
                      <Typography.Text strong>{record.title}</Typography.Text>
                      <Typography.Paragraph type="secondary">
                        {numeral(record.price).format('0,0')}đ
                      </Typography.Paragraph>
                      <Typography.Text>
                        {moment(record.createdAt).format('DD-MM-YYYY')}
                      </Typography.Text>
                      <div className="mt-2">
                        <Space size="small">
                          <ProductTag status={record.status} />
                          <ProductStatusDropdown
                            handleDelete={handleDelete}
                            handlePatchStatus={handlePatchStatus}
                            product={record}
                            id={record.id}
                          />
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          ) : (
            <Table
              size="small"
              loading={loading}
              bordered
              columns={getColumns({ handleDelete, handlePatchStatus })}
              pagination={{
                onChange: (page, pageSize) => {
                  const searchString = new URLSearchParams(
                    Object.entries({
                      ...params,
                      page: page.toString(),
                      size: pageSize.toString(),
                    }).filter(([, v]) => typeof v === 'string') as [string, string][],
                  ).toString();
                  history.push({ pathname: `/products`, search: `?${searchString}` });
                },
                pageSize: Number(params?.size) || 10,
                total: data?.totalElements,
              }}
              dataSource={data?.products}
              rowKey="id"
              scroll={{ x: 1300 }}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ProductTable;
