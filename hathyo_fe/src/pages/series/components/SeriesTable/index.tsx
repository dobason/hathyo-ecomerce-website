import { useTableUrlParams } from '@/utils/func';
import { EllipsisOutlined } from '@ant-design/icons';
import { Link, history } from '@umijs/max';
import { Button, Card, Dropdown, Menu, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { useSeriesTable } from './hooks';
import { useMediaQuery } from 'react-responsive';

const column = ({ handleDelete, isMobile }: { handleDelete: (a: string) => unknown; isMobile: boolean }) => {
  const columns = [
    {
      title: 'Tiêu đề',
      key: 'title',
      render: (record: { id: string; title: string }) => (
        <Link to={`/posts-management/series/${record?.id}`} className="text-blue-600 hover:underline">
          {record?.title}
        </Link>
      ),
    },
    ...(isMobile
      ? []
      : [
          {
            title: 'Ngày tạo',
            key: 'createdAt',
            width: 200,
            render: (record: { createdAt: string }) => (
              <span className="text-sm text-gray-600">
                {moment(record?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
              </span>
            ),
          },
        ]),
    {
      title: '',
      key: 'action',
      fixed: 'right' as const,
      width: 80,
      align: 'center' as const,
      render: (record: { id: string; title: string }) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit">
              <Link to={`/series/${record?.id}`}>Chỉnh sửa</Link>
            </Menu.Item>
            <Menu.Item key="delete" danger onClick={() => handleDelete(record?.id)}>
              Xoá
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <Button size="small" icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return columns;
};

const SeriesTable: React.FC = () => {
  const params = useTableUrlParams();
  const { loading, data, run, handleDelete } = useSeriesTable();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="relative">
      {isMobile ? (
        <div className="space-y-4">
          {data?.series?.map((record: any) => (
            <div
              key={record.id}
              className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-base text-gray-800 mb-1">
                {record.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {moment(record?.createdAt).format('DD-MM-YYYY')}
              </p>
              <div className="absolute top-2 right-2">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="edit">
                        <Link to={`/posts-management/series/${record?.id}`}>Chỉnh sửa</Link>
                      </Menu.Item>
                      <Menu.Item key="delete" danger onClick={() => handleDelete(record?.id)}>
                        Xoá
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <Button icon={<EllipsisOutlined />} size="small" />
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="rounded-xl shadow-sm">
          <Table
            size="small"
            bordered
            loading={loading}
            columns={column({ handleDelete, isMobile })}
            pagination={{
              onChange: (page, pageSize) => {
                history.push({ pathname: `/posts-management/series?page=${page}&size=${pageSize}` });
                run();
              },
              pageSize: params?.size || 10,
              total: data?.totalElements,
            }}
            dataSource={data?.series}
            scroll={{ y: `calc(-358px + 100vh)` }}
            className="min-w-full text-sm"
          />
        </Card>
      )}
    </div>
  );
};

export default SeriesTable;
