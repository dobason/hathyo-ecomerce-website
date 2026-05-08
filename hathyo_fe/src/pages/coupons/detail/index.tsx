import { Descriptions, Divider } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

export type CouponDetail = {
  id: number;
  code: string;
  title: string;
  description: string;
  discountType: 'PERCENT' | 'AMOUNT';
  discountValue: number;
  discountPercent: number;
  minimumPriceApply: number;
  maxDiscountPrice: number;
  quantity: number;
  startAt: string;
  expiredAt: string;
  type: string;
  activeStatus: boolean;
  applyStatus: boolean;
  timeStatus: string;
};

interface CouponDetailPageProps {
  coupon: CouponDetail;
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const CouponDetailPage: React.FC<CouponDetailPageProps> = ({ coupon }) => {
  const getDiscountValue = () => {
    if (coupon.discountType === 'PERCENT') {
      return `${coupon.discountPercent}% (tối đa ${formatCurrency(coupon.maxDiscountPrice)})`;
    }
    return formatCurrency(coupon.discountValue);
  };

  return (
    <>
      <Descriptions title="Thông tin mã giảm giá" column={1} bordered>
        <Descriptions.Item label="Tiêu đề">{coupon.title || 'Không có'}</Descriptions.Item>
        <Descriptions.Item label="Mô tả">{coupon.description || 'Không có'}</Descriptions.Item>
        <Descriptions.Item label="Giá trị giảm">{getDiscountValue()}</Descriptions.Item>
        <Descriptions.Item label="Giới hạn sử dụng">
          {coupon.quantity > 0 ? `${coupon.quantity} lượt` : 'Không giới hạn'}
        </Descriptions.Item>
        <Descriptions.Item label="Đã sử dụng">
          {coupon.applyStatus ? 'Đang áp dụng' : '0'}
        </Descriptions.Item>
        <Descriptions.Item label="Giá tối thiểu áp dụng">
          {formatCurrency(coupon.minimumPriceApply)}
        </Descriptions.Item>
        <Descriptions.Item label="Hiệu lực">
          {dayjs(coupon.startAt).format('DD/MM/YYYY')} -{' '}
          {dayjs(coupon.expiredAt).format('DD/MM/YYYY')}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Trạng thái" column={1} bordered>
        <Descriptions.Item label="Loại mã">{coupon.type}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {coupon.activeStatus ? 'Đang kích hoạt' : 'Ngưng hoạt động'}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian">
          {coupon.timeStatus === 'NOT_STARTED'
            ? 'Chưa bắt đầu'
            : coupon.timeStatus === 'EXPIRED'
            ? 'Đã hết hạn'
            : 'Đang diễn ra'}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default CouponDetailPage;
