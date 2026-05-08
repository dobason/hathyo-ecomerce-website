import { Pie } from '@ant-design/charts';
import { Card, Table, Tag } from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import React, { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useOrdersRevenue } from './hooks';

const statusColorMap: Record<string, string> = {
  'Đang giao': 'blue',
  'Hoàn tất': 'green',
  'Chờ xử lý': 'orange',
  'Đã huỷ': 'red',
  'Đã hoàn tiền': 'purple',
};

const OrdersRevenue: React.FC = () => {
  const { loading, data, dataStatistic } = useOrdersRevenue();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const statisticsRaw = [
    { type: 'Sản phẩm được duyệt', value: dataStatistic?.approvedProducts ?? 0 },
    { type: 'Sản phẩm nháp', value: dataStatistic?.draftProducts ?? 0 },
    { type: 'Sản phẩm mới', value: dataStatistic?.newProducts ?? 0 },
    { type: 'Sản phẩm chờ xử lý', value: dataStatistic?.pendingProducts ?? 0 },
    { type: 'Sản phẩm bị từ chối', value: dataStatistic?.rejectedProducts ?? 0 },
  ];

  const statisticsForPie = statisticsRaw.filter((item) => item.value > 0);

  const statisticsOrder = [
    { type: 'Tổng đơn', value: data?.totalOrders ?? 0 },
    { type: 'Doanh thu', value: `${numeral(data?.totalRevenue ?? 0).format('0,0')} đ` },
  ];

  const pieConfig = {
    data: statisticsForPie,
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: { fontWeight: 'bold' },
    },
    legend: {
      color: {
        title: false,
        position: 'bottom',
        rowPadding: isMobile ? 4 : 5,
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'Sản phẩm',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: isMobile ? 12 : 18,
          fontStyle: 'bold',
        },
      },
    ],
  };

  const columns = useMemo(
    () => [
      {
        title: 'Mã đơn hàng',
        dataIndex: 'orderCode',
        render: (orderCode: string, record: any) => (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-blue-600 text-base">#{orderCode}</span>
            <Tag color={statusColorMap[record.status] || 'default'} className="w-fit">
              {record.status}
            </Tag>
          </div>
        ),
      },
      {
        title: 'Thông tin giao hàng',
        render: (record: any) => (
          <div className="space-y-1 text-sm">
            <div className="font-medium text-gray-800">
              {record.customerName} ({record.customerPhone})
            </div>
            <div className="text-gray-500">{record.customerAddress || 'Không có địa chỉ'}</div>
            <div className="text-xs text-gray-400">
              Ngày tạo: {moment(record.createdAt).format('DD-MM-YYYY HH:mm')}
            </div>
          </div>
        ),
      },
      {
        title: 'Chi tiết đơn hàng',
        render: (_: any, record: any) => (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
            <div>
              <span className="block text-gray-500">Tổng SP</span>
              <span className="font-semibold">
                {numeral(record.totalProductsPrice).format('0,0')}đ
              </span>
            </div>
            <div>
              <span className="block text-gray-500">Phí ship</span>
              <span className="font-semibold">{numeral(record.totalShippingPrice).format('0,0')}đ</span>
            </div>
            <div>
              <span className="block text-gray-500">Giảm giá</span>
              <span className="font-semibold text-red-600">
                {numeral(record.discountProductsPrice).format('0,0')}đ
              </span>
            </div>
            <div>
              <span className="block text-gray-500">Thành tiền</span>
              <span className="font-bold text-blue-700">
                {numeral(record.totalPrice).format('0,0')}đ
              </span>
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6">
          <Card
            title="Tỉ lệ sản phẩm"
            className="rounded-lg shadow-sm h-full flex flex-col"
            styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column', padding: 16 } }}
          >
            <div className="flex-1 flex justify-center items-center">
              <Pie {...pieConfig} />
            </div>
          </Card>
        </div>

        <div className="md:col-span-6">
          <div className="grid grid-cols-2 flex flex-wrap gap-2">
            {[...statisticsOrder, ...statisticsRaw].map((item, idx) => {
              const gradients = [
                'from-blue-100 to-blue-200 text-blue-800',
                'from-yellow-100 to-yellow-200 text-yellow-800',
                'from-green-100 to-green-200 text-green-800',
                'from-orange-100 to-orange-200 text-orange-800',
                'from-pink-100 to-pink-200 text-pink-800',
              ];
              const colorClass = gradients[idx % gradients.length];

              return (
                <Card
                  key={item.type}
                  className={`h-28 shadow-inner rounded-xl bg-gradient-to-br ${colorClass}`}
                  styles={{ body: { padding: 16 } }}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="text-sm font-medium">{item.type}</div>
                    <div className="text-2xl font-bold">{item.value}</div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <Card title="Danh sách đơn hàng" className="rounded-lg shadow-sm">
        <Table
          rowKey="orderCode"
          loading={loading}
          columns={columns}
          dataSource={data?.orderData?.orders}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          className="rounded-lg"
        />
      </Card>
    </div>
  );
};

export default OrdersRevenue;
