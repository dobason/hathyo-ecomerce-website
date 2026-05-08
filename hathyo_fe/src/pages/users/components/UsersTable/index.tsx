import {
  CheckCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import { Avatar, Button, Card, Dropdown, List, Popconfirm, Space, Table, Tag } from 'antd';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { useTableUrlParams } from '@/utils/func';
import { useUsersTable } from './hooks';
import type { ColumnsType } from 'antd/es/table';

const UsersTable: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const params = useTableUrlParams();
  const { loading, data, changeStatus } = useUsersTable();

  const formatAddress = (address: string, ward: string, district: string, province: string) =>
    [address, ward, district, province].filter(Boolean).join(', ');

  const formatName = (firstname?: string, lastname?: string) =>
    [firstname, lastname].filter(Boolean).join(' ');

  const renderActions = (record: API.Users) => (
    <Dropdown
      trigger={['click']}
      menu={{
        items: [
          ...(record.banned
            ? [
                {
                  key: 'unbanned',
                  label: (
                    <Popconfirm
                      title="Bạn có chắc mở khóa user này?"
                      onConfirm={() => changeStatus({ userId: record.id, banned: false })}
                    >
                      <span className="text-blue-600">Mở khóa</span>
                    </Popconfirm>
                  ),
                },
              ]
            : [
                {
                  key: 'banned',
                  label: (
                    <Popconfirm
                      title="Bạn có chắc khóa user này?"
                      onConfirm={() => changeStatus({ userId: record.id, banned: true })}
                    >
                      <span className="text-red-500">Khóa</span>
                    </Popconfirm>
                  ),
                },
              ]),
        ],
      }}
    >
      <Button icon={<MoreOutlined />} size="small" />
    </Dropdown>
  );

  const columns: ColumnsType<API.Users> = [
    {
      title: 'Người dùng',
      key: 'firstname',
      width: 200,
      dataIndex: 'firstname',
      render: (_: string, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.avatar} />
          <div className="font-medium text-sm text-gray-800">
            {formatName(record.lastname, record.firstname)}
          </div>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      width: 250,
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      key: 'email',
      width: 250,
      dataIndex: 'email',
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      dataIndex: 'address',
      render: (_: string, record) =>
        formatAddress(record.address, record.ward, record.district, record.city),
    },
    {
      title: 'Trạng thái',
      key: 'banned',
      width: 150,
      dataIndex: 'banned',
      render: (banned: boolean) =>
        banned ? <Tag color="red">Đã khóa</Tag> : <Tag color="green">Hoạt động</Tag>,
    },
    {
      title: 'Tác vụ',
      key: 'action',
      fixed: 'right',
      align: 'center' as const,
      width: 120,
      render: (_: any, record) => renderActions(record),
    },
  ];

  return (
    <div className="relative">
      <Card className="shadow-sm rounded-xl">
        {isMobile ? (
          <List
            loading={loading}
            dataSource={data?.users || []}
            renderItem={(item: API.Users) => (
              <List.Item
                key={item.id}
                className="relative border-b border-gray-200"
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={
                    <div className="flex items-center">
                      <span className="font-semibold">
                        {formatName(item.lastname, item.firstname)}
                      </span>
                      <div className="absolute right-1 top-1">{renderActions(item)}</div>
                    </div>
                  }
                  description={
                    <Space direction="vertical" size={4}>
                      {item.phone && (
                        <div className="flex items-center gap-1 text-sm">
                          <PhoneOutlined /> {item.phone}
                        </div>
                      )}
                      {item.email && (
                        <div className="flex items-center gap-1 text-sm">
                          <MailOutlined /> {item.email}
                        </div>
                      )}
                      {(item.address || item.ward || item.district || item.city) && (
                        <div className="flex items-center gap-1 text-sm">
                          <EnvironmentOutlined />{' '}
                          {formatAddress(item.address, item.ward, item.district, item.city)}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-sm">
                        {item.banned ? (
                          <>
                            <StopOutlined className="text-red-500" />
                            <span className="text-red-500">Đã khóa</span>
                          </>
                        ) : (
                          <>
                            <CheckCircleOutlined className="text-green-500" />
                            <span className="text-green-500">Hoạt động</span>
                          </>
                        )}
                      </div>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Table
            size="small"
            loading={loading}
            bordered
            columns={columns}
            pagination={{
              onChange: (page, pageSize) => {
                history.push({ pathname: `/user-management/users?page=${page}&size=${pageSize}` });
              },
              pageSize: params?.size || 10,
              total: data?.totalElements,
            }}
            dataSource={data?.users || []}
            rowKey="id"
            scroll={{ x: 1200, y: `calc(-358px + 100vh)` }}
            className="text-sm"
          />
        )}
      </Card>
    </div>
  );
};

export default UsersTable;
