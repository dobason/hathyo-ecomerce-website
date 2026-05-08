import CouponDetailPage from '@/pages/coupons/detail';
import { useTableUrlParams } from '@/utils/func';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, history } from '@umijs/max';
import type { MenuProps } from 'antd';
import {
  Button,
  Card,
  Drawer,
  Dropdown,
  Image,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import Search from './Search';
import { useCouponsTable } from './hooks';

interface Coupon {
  id: number;
  code: string;
  title: string;
  description: string;
  type: string;
  discountType: 'PERCENT' | 'AMOUNT';
  discountPercent: number;
  discountValue: number;
  minimumPriceApply: number;
  maxDiscountPrice: number;
  quantity: number;
  startAt: string;
  expiredAt: string;
  activeStatus: boolean;
  applyStatus: boolean;
  status: boolean;
  timeStatus: string;
  image?: string;
}

interface CouponResponse {
  coupons: Coupon[];
  totalElements: number;
}

const renderStatusTag = (status?: boolean) => {
  if (status === true) return <Tag color="green">Đang hoạt động</Tag>;
  if (status === false) return <Tag color="red">Ngừng hoạt động</Tag>;
  return <Tag>Không xác định</Tag>;
};

const getTimeStatus = (
  startAt: string,
  expiredAt: string,
): 'NOT_STARTED' | 'ACTIVE' | 'EXPIRED' => {
  const now = dayjs();
  if (now.isBefore(dayjs(startAt))) return 'NOT_STARTED';
  if (now.isAfter(dayjs(expiredAt))) return 'EXPIRED';
  return 'ACTIVE';
};

const timeStatusTag = (status: 'NOT_STARTED' | 'ACTIVE' | 'EXPIRED') => {
  switch (status) {
    case 'NOT_STARTED':
      return <Tag color="blue">Chưa bắt đầu</Tag>;
    case 'ACTIVE':
      return <Tag color="green">Còn hạn</Tag>;
    case 'EXPIRED':
      return <Tag color="red">Hết hạn</Tag>;
    default:
      return <Tag>Không xác định</Tag>;
  }
};

const CouponsTable: React.FC = () => {
  const params = useTableUrlParams();
  const { loading, data, run, changeStatus } = useCouponsTable() as {
    loading: boolean;
    data: CouponResponse;
    run: () => Promise<any>;
    changeStatus: (params: { id: number; status: boolean }) => void;
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [selectedCoupon, setSelectedCoupon] = React.useState<Coupon | null>(null);
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const handleViewDetail = (record: Coupon) => {
    setSelectedCoupon(record);
    setDrawerVisible(true);
  };

  const handleChangeStatus = useCallback(
    (record: Coupon) => {
      changeStatus({ id: record.id, status: !record.activeStatus });
    },
    [changeStatus],
  );

  const columns: ColumnType<Coupon>[] = useMemo(
    () => [
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        render: (_, record) => (
          <div className="flex items-center gap-3">
            {record.image && (
              <Image
                src={record.image}
                alt={record.title}
                width={48}
                height={36}
                className="rounded object-cover"
              />
            )}
            <div>
              <Typography.Text strong>{record.title}</Typography.Text>
              <div className="text-gray-500 text-xs">#{record.code}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Loại',
        dataIndex: 'type',
      },
      {
        title: 'Giảm giá',
        render: (_, record) =>
          record.discountType === 'PERCENT'
            ? `${record.discountPercent}%`
            : `${record.discountValue?.toLocaleString()}₫`,
      },
      {
        title: 'Bắt đầu',
        dataIndex: 'startAt',
      },
      {
        title: 'Hết hạn',
        dataIndex: 'expiredAt',
      },
      {
        title: 'Trạng thái',
        key: 'timeStatus',
        render: (_, record) => {
          const timeStatus = getTimeStatus(record.startAt, record.expiredAt);
          return timeStatusTag(timeStatus);
        },
      },
      {
        title: 'Quản lý mã',
        dataIndex: 'activeStatus',
        render: (status: boolean) => renderStatusTag(status),
      },
      {
        title: '',
        key: 'action',
        align: 'center' as const,
        render: (record: Coupon) => {
          const items: MenuProps['items'] = [
            {
              key: 'detail',
              label: 'Chi tiết',
              onClick: () => handleViewDetail(record),
            },
            {
              key: 'toggle-status',
              label: (
                <Popconfirm
                  title={
                    record.activeStatus ? 'Ngừng áp dụng coupon này?' : 'Kích hoạt coupon này?'
                  }
                  onConfirm={() => handleChangeStatus(record)}
                >
                  <a>{record.activeStatus ? 'Ngừng áp dụng' : 'Kích hoạt'}</a>
                </Popconfirm>
              ),
            },
          ];

          return (
            <Dropdown menu={{ items }} trigger={['click']}>
              <Button size="small" icon={<EllipsisOutlined />} />
            </Dropdown>
          );
        },
      },
    ],
    [handleChangeStatus],
  );

  const renderAddButton = (
    <Link to="/coupons/create">
      <Button type="primary" icon={<PlusOutlined />}>
        Thêm mã giảm
      </Button>
    </Link>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <Search run={run} />
        {renderAddButton}
      </div>

      {/* Table hoặc Mobile Cards */}
      {isMobile ? (
        <Space direction="vertical" size="middle" className="w-full">
          {data?.coupons?.map((record: Coupon) => {
            const items: MenuProps['items'] = [
              {
                key: 'detail',
                label: <span onClick={() => handleViewDetail(record)}>Chi tiết</span>,
              },
              {
                key: 'toggle',
                label: (
                  <Popconfirm
                    title={record.status ? 'Ngừng áp dụng coupon này?' : 'Kích hoạt coupon này?'}
                    onConfirm={() => handleChangeStatus(record)}
                  >
                    <a>{record.status ? 'Ngừng áp dụng' : 'Kích hoạt'}</a>
                  </Popconfirm>
                ),
              },
            ];

            return (
              <Card key={record.id} size="small" className="relative">
                {record.image && (
                  <Image
                    src={record.image}
                    alt={record.title}
                    width={80}
                    height={60}
                    className="mb-2 object-cover rounded"
                  />
                )}
                <Typography.Text strong>{record.title}</Typography.Text>
                <Typography.Paragraph type="secondary" style={{ marginBottom: 4 }}>
                  {record.code}
                </Typography.Paragraph>
                {renderStatusTag(record.status)}
                <Dropdown menu={{ items }} trigger={['click']}>
                  <Button
                    icon={<EllipsisOutlined />}
                    size="small"
                    className="absolute top-2 right-2"
                  />
                </Dropdown>
              </Card>
            );
          })}
        </Space>
      ) : (
        <Card bodyStyle={{ padding: 0 }} className="overflow-auto">
          <Table
            size="small"
            loading={loading}
            bordered
            columns={columns}
            pagination={{
              onChange: (page, pageSize) => {
                history.push(`/coupons?page=${page}&size=${pageSize}`);
                run();
              },
              pageSize: params?.size || 10,
              total: data?.totalElements,
            }}
            dataSource={data?.coupons}
            rowKey="id"
            scroll={{ x: 1000 }}
            className="w-full"
          />
        </Card>
      )}

      <Drawer
        title={selectedCoupon ? `Mã giảm giá: ${selectedCoupon.code}` : ''}
        width={isMobile ? '95vw' : '50vw'}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {selectedCoupon && <CouponDetailPage coupon={selectedCoupon} />}
      </Drawer>
    </div>
  );
};

export default CouponsTable;
