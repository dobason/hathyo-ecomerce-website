import { Pie } from '@ant-design/charts';
import { Card, Statistic, Spin } from 'antd';
import React from 'react';
import { useHathyoReport } from './hooks';

const HathyoReport: React.FC = () => {
  const { loading, data } = useHathyoReport();

  const pieData = [
    { type: 'Thành công', value: data?.tongSoDonHangThanhCong },
    { type: 'Không thành công', value: data?.tongSoDonHangKhongThanhCong },
  ];

  const config = {
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    color: ['#52c41a', '#ff4d4f'],
    interactions: [{ type: 'element-active' }],
  };

  return (
    <Spin spinning={loading}>
      {/* Top 4 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="h-full shadow-sm">
          <Statistic title="Lượt truy cập" value={data?.soLuongTruyCap} />
        </Card>
        <Card className="h-full shadow-sm">
          <Statistic title="Người bán" value={data?.soNguoiBan} />
          <Statistic
            title="Người bán mới"
            value={data?.soNguoiBanMoi}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
        <Card className="h-full shadow-sm">
          <Statistic title="Tổng sản phẩm" value={data?.tongSoSanPham} />
          <Statistic
            title="Sản phẩm mới"
            value={data?.soSanPhamMoi}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
        <Card className="h-full shadow-sm">
          <Statistic
            title="Tổng giá trị giao dịch"
            value={data?.tongGiaTriGiaoDich}
            prefix="₫"
            precision={0}
          />
        </Card>
      </div>

      {/* Pie + Total Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Tổng số giao dịch" className="h-full shadow-sm">
          <Statistic value={data?.soLuongGiaoDich} />
        </Card>
        <Card title="Tỉ lệ đơn hàng" className="h-full shadow-sm">
          <Pie {...config} height={250} />
        </Card>
      </div>
    </Spin>
  );
};

export default HathyoReport;
