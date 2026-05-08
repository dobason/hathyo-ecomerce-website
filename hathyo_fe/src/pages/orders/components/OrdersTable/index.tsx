import OrderTag from '@/components/OrderTag';
import { ORDER_STATUS } from '@/services/orders/constants';
import { useTableUrlParams } from '@/utils/func';
import { DownOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Card, Col, Dropdown, Row, Table, Typography } from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import React, { Fragment, useMemo } from 'react';
import CancelOrder from './CancelOrder';
import OrderDetailDrawer from './OrderDetailDrawer';
import Search from './Search';
import TransOrder from './TransOrder';
import { useOrdersTable } from './hooks';

const OrdersTable: React.FC = () => {
  const params = useTableUrlParams();
  const {
    loading,
    data,
    dataListCity,
    dataServiceType,
    onGetServiceType,
    onTransOrder,
    onCancelOrder,
    detail,
    isOpen,
    onOpenDetail,
    onCloseDetail,
    onOpenTrans,
    onCloseTrans,
    isOpenTrans,
    formTrans,
    onOpenCancel,
    onCloseCancel,
    isOpenCancel,
    formCancel,
  } = useOrdersTable();

  const column = useMemo(
    () => [
      {
        title: 'Mã đơn hàng',
        key: 'orderCode',
        width: 220,
        render: (record: any) => <a onClick={() => onOpenDetail(record)}>#{record?.orderCode}</a>,
      },
      {
        title: 'Ngày tạo',
        key: 'createdAt',
        width: 150,
        dataIndex: 'createdAt',
        render: (date: any) =>
          moment(date).isValid() ? moment(date).format('DD-MM-YYYY HH:mm:ss') : '--',
      },
      {
        title: 'Thông tin đơn hàng',
        key: 'order',
        width: 220,
        render: (_: any, record: any) => (
          <Row>
            {!!record?.totalProductAmount && (
              <Col span={24}>
                <Typography.Text strong>Tổng SP: </Typography.Text>
                <Typography.Text>
                  {numeral(record?.totalProductAmount).format('0,0')}đ
                </Typography.Text>
              </Col>
            )}
            {!!record?.shippingFee && (
              <Col span={24}>
                <Typography.Text strong>Phí ship: </Typography.Text>
                <Typography.Text>{numeral(record?.shippingFee).format('0,0')}đ</Typography.Text>
              </Col>
            )}
            {!!record?.discountProductsPrice && (
              <Col span={24}>
                <Typography.Text strong>Giảm giá: </Typography.Text>
                <Typography.Text>
                  {numeral(record?.discountProductsPrice).format('0,0')}đ
                </Typography.Text>
              </Col>
            )}
            {!!record?.totalPrice && (
              <Col span={24}>
                <Typography.Text strong>Thành tiền: </Typography.Text>
                <Typography.Text>{numeral(record?.totalPrice).format('0,0')}đ</Typography.Text>
              </Col>
            )}
          </Row>
        ),
      },
      {
        title: 'Thông tin nhận hàng',
        key: 'address',
        render: (record: any) => (
          <Row>
            <Col span={24}>
              <Typography.Text strong>
                {record.customerName} ({record.customerPhone})
              </Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Text>{record.customerAddress}</Typography.Text>
            </Col>
          </Row>
        ),
      },
      {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        width: 150,
        render: (_: string, record: API.Orders) => {
          return <OrderTag status={record.status} />;
        },
      },
      {
        title: 'Tác vụ',
        key: 'action',
        fixed: 'right',
        align: 'center',
        width: 180,
        render: (record: any) => {
          const notCancel = [
            ORDER_STATUS.IN_TRANSIT,
            ORDER_STATUS.DELIVERED,
            ORDER_STATUS.CANCELLED,
          ];
          return (
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  {
                    label: 'Xem chi tiết',
                    key: 'detail',
                    onClick: () => onOpenDetail(record),
                  },
                  ...(record.status === ORDER_STATUS.PENDING
                    ? [
                        {
                          label: 'Vận chuyển',
                          key: 'delivery',
                          onClick: () => onOpenTrans(record),
                        },
                      ]
                    : []),
                  ...(!notCancel.includes(record.status)
                    ? [
                        {
                          label: 'Hủy',
                          key: 'Cancel',
                          danger: true,
                          onClick: () => onOpenCancel(record),
                        },
                      ]
                    : []),
                ],
              }}
            >
              <Button type="link">
                Tác vụ <DownOutlined />
              </Button>
            </Dropdown>
          );
        },
      },
    ],
    [],
  );

  return (
    <Fragment>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Search />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Table
              size="small"
              loading={loading}
              bordered
              columns={column as any}
              pagination={{
                onChange: (page, pageSize) => {
                  history.push({ pathname: `/orders/list?page=${page}&size=${pageSize}` });
                },
                pageSize: params?.size | 10,
                total: data?.totalElements,
              }}
              dataSource={data?.orders as API.Orders[]}
              rowKey="id"
              scroll={{ x: 1300, y: `calc(-524px + 100vh)` }}
            />
          </Card>
        </Col>
      </Row>
      <OrderDetailDrawer
        visible={isOpen}
        onClose={onCloseDetail}
        detail={detail}
        dataListCity={dataListCity}
        onGetServiceType={onGetServiceType}
        dataServiceType={dataServiceType}
        onTransOrder={onTransOrder}
      />
      <TransOrder
        form={formTrans}
        visible={isOpenTrans}
        onClose={onCloseTrans}
        detail={detail}
        dataListCity={dataListCity}
        onGetServiceType={onGetServiceType}
        dataServiceType={dataServiceType}
        onTransOrder={onTransOrder}
      />
      <CancelOrder
        form={formCancel}
        visible={isOpenCancel}
        onClose={onCloseCancel}
        detail={detail}
        onCancelOrder={onCancelOrder}
      />
    </Fragment>
  );
};

export default OrdersTable;
