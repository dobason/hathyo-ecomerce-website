import { useTableUrlParams } from '@/utils/func';
import { Link, history } from '@umijs/max';
import type { TableProps } from 'antd';
import { Button, Card, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { useContentsTable } from './hooks';

const columns: TableProps<API.Content>['columns'] = [
  {
    title: 'Mã',
    key: 'code',
    dataIndex: 'code',
    width: 120,
  },
  {
    title: 'Tiêu đề',
    key: 'title',
    width: 200,
    render: (record: API.Content) => (
      <Link
        to={`/posts-management/static-content/${record?.code}`}
        className="text-blue-600 hover:underline"
      >
        {record?.title}
      </Link>
    ),
  },
  {
    title: 'Ngày đăng',
    key: 'createdAt',
    width: 200,
    render: (record: { createdAt: string }) => (
      <span className="text-sm text-gray-600">
        {moment(record?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
      </span>
    ),
  },
  {
    title: 'Tác vụ',
    key: 'action',
    width: 120,
    align: 'center',
    render: (record: API.Content) => (
      <Link to={`/posts-management/static-content/${record.code}`}>
        <Button
          size="small"
          type="default"
          className="text-blue-500 hover:text-blue-700 px-2"
        >
          Chỉnh sửa
        </Button>
      </Link>
    ),
  },
];

const ContentsTable: React.FC = () => {
  const params = useTableUrlParams();
  const { loading, data } = useContentsTable();

  return (
    <div className="relative">
      <Card className="shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <Table
            size="small"
            loading={loading}
            bordered
            columns={columns}
            pagination={{
              onChange: (page, pageSize) => {
                history.push({ pathname: `/posts-management/static-content?page=${page}&size=${pageSize}` });
              },
              pageSize: params?.size || 10,
              total: data?.totalElements,
            }}
            dataSource={data?.contentResponses as API.Content[]}
            rowKey="code"
            scroll={{ x: 800, y: `calc(-358px + 100vh)` }}
            className="min-w-full md:min-w-[700px] text-sm"
          />
        </div>
      </Card>
    </div>
  );
};

export default ContentsTable;