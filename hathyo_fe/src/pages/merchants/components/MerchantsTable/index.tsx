import MerchantTag from '@/components/MerchantTag';
import { MERCHANT_STATUS } from '@/services/merchants/constants';
import { useTableUrlParams } from '@/utils/func';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link, history } from '@umijs/max';
import { Avatar, Button, Card, Dropdown, Menu, Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useMerchantsTable } from './hooks';

const columns = ({
  changeStatus,
}: {
  changeStatus: (a: API.UpdateMerchantStatusParams) => unknown;
}): ColumnsType<API.Merchants> => [
  {
    title: 'Code',
    key: 'code',
    dataIndex: 'merchantCode',
    render: (text: string) => `#${text}`,
  },
  {
    title: 'Tên cửa hàng',
    key: 'storeName',
    dataIndex: 'storeName',
    render: (text, record) => (
      <div className="flex items-center gap-2">
        <Avatar src={record.logo} alt="logo" />
        <div className="font-medium text-sm text-gray-800">{text}</div>
      </div>
    ),
  },
  {
    title: 'Họ và tên',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: 'Địa chỉ',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: 'Loại cửa hàng',
    key: 'merchantType',
    dataIndex: 'merchantType',
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'merchantStatus',
    render: (merchantStatus: string) => <MerchantTag status={merchantStatus} />,
  },
  {
    title: '',
    key: 'action',
    align: 'center' as const,
    fixed: 'right',
    render: (record: API.Merchants) => {
      const menu = (
        <Menu>
          <Menu.Item key="detail" icon={<EditOutlined />}>
            <Link to={`/user-management/merchants/${record.id}`}>Chi tiết</Link>
          </Menu.Item>
          {record.merchantStatus === MERCHANT_STATUS.PENDING && (
            <>
              <Menu.Item key="approve">
                <Popconfirm
                  title="Bạn có chắc duyệt merchant này?"
                  onConfirm={() =>
                    changeStatus({ id: record.id, status: MERCHANT_STATUS.APPROVED })
                  }
                >
                  <span>Duyệt</span>
                </Popconfirm>
              </Menu.Item>
              <Menu.Item key="reject">
                <Popconfirm
                  title="Bạn có chắc từ chối merchant này?"
                  onConfirm={() =>
                    changeStatus({ id: record.id, status: MERCHANT_STATUS.REJECTED })
                  }
                >
                  <span>Từ chối</span>
                </Popconfirm>
              </Menu.Item>
            </>
          )}
        </Menu>
      );
      return (
        <Dropdown trigger={['click']} overlay={menu} placement="bottomRight">
          <Button size="small" icon={<EllipsisOutlined />} />
        </Dropdown>
      );
    },
  },
];

const MerchantsTable: React.FC = () => {
  const params = useTableUrlParams();
  const { loading, data, run, changeStatus } = useMerchantsTable();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="relative">
      {isMobile ? (
        <div className="space-y-4">
          {data?.merchants?.map((record) => (
            <Card key={record.id} size="small" className="relative shadow-sm border rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-1">{record.storeName}</h3>
              <p className="text-sm text-gray-500 mb-1">{record.email}</p>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="detail" icon={<EditOutlined />}>
                      <Link to={`/user-management/merchants/${record.id}`}>Chi tiết</Link>
                    </Menu.Item>
                    {record.merchantStatus === MERCHANT_STATUS.PENDING && (
                      <>
                        <Menu.Item key="approve">
                          <Popconfirm
                            title="Bạn có chắc duyệt merchant này?"
                            onConfirm={() =>
                              changeStatus({ id: record.id, status: MERCHANT_STATUS.APPROVED })
                            }
                          >
                            <span>Duyệt</span>
                          </Popconfirm>
                        </Menu.Item>
                        <Menu.Item key="reject">
                          <Popconfirm
                            title="Bạn có chắc từ chối merchant này?"
                            onConfirm={() =>
                              changeStatus({ id: record.id, status: MERCHANT_STATUS.REJECTED })
                            }
                          >
                            <span>Từ chối</span>
                          </Popconfirm>
                        </Menu.Item>
                      </>
                    )}
                  </Menu>
                }
                trigger={['click']}
              >
                <Button
                  icon={<EllipsisOutlined />}
                  size="small"
                  className="absolute top-2 right-2"
                />
              </Dropdown>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-sm rounded-xl">
          <Table
            size="small"
            loading={loading}
            bordered
            columns={columns({ changeStatus })}
            pagination={{
              onChange: (page, pageSize) => {
                history.push({
                  pathname: `/user-management/merchants?page=${page}&size=${pageSize}`,
                });
                run();
              },
              pageSize: params?.size || 10,
              total: data?.totalElements,
            }}
            dataSource={data?.merchants || []}
            rowKey="id"
            scroll={{ x: 1500, y: `calc(-358px + 100vh)` }}
            className="text-sm"
          />
        </Card>
      )}
    </div>
  );
};

export default MerchantsTable;
