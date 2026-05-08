import OrderTag from '@/components/OrderReturnTag';
import { ORDER_STATUS } from '@/services/orders-return/constants';
import { useTableUrlParams } from '@/utils/func';
import { DownOutlined } from '@ant-design/icons';
import { history, useAccess } from '@umijs/max';
import { Button, Card, Col, Dropdown, Row, Table } from 'antd';
import moment from 'moment';
import React, { Fragment, useMemo } from 'react';
import CancelOrder from './CancelOrder';
import OrderDetailDrawer from './OrderDetailDrawer';
import Search from './Search';
import SendRefund from './SendRefund';
import TransOrder from './TransOrder';
import { useOrderReturnTable } from './hooks';

const OrderReturnTable: React.FC = () => {
  const params = useTableUrlParams();
  const {
    loading,
    data,
    dataListCity,
    dataServiceType,
    onGetServiceType,
    onTransOrder,
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
    onSendRefund,
    isOpenSend,
    onOpenSend,
    onCloseSend,
    formSend,
    onRejectOrder,
  } = useOrderReturnTable();
  const isAdmin = useAccess().admin;

  const column = useMemo(
    () => [
      {
        title: 'Mã đơn hàng',
        key: 'id',
        width: 220,
        render: (record: any) => <a onClick={() => onOpenDetail(record)}>#{record?.id}</a>,
      },
      {
        title: 'Ngày yêu cầu',
        key: 'returnTime',
        width: 150,
        dataIndex: 'returnTime',
        render: (date: any) =>
          moment(date).isValid() ? moment(date).format('DD-MM-YYYY HH:mm:ss') : '--',
      },
      {
        title: 'Số sản phẩm yêu cầu',
        key: 'order',
        width: 220,
        render: (_: any, record: any) => record.orderItems.length,
      },
      {
        title: 'Người yêu cầu',
        key: 'returnName',
        width: 220,
        dataIndex: 'returnName',
      },
      {
        title: 'Số điện thoại yêu cầu',
        key: 'returnPhone',
        dataIndex: 'returnPhone',
      },
      {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        width: 150,
        render: (_: string, record: API.OrderReturn) => {
          return <OrderTag status={record.status} />;
        },
      },
      {
        title: 'Tác vụ',
        key: 'action',
        fixed: 'right',
        align: 'center',
        width: 180,
        render: (record: any) => (
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  label: 'Xem chi tiết',
                  key: 'detail',
                  onClick: () => {
                    onOpenDetail(record);
                  },
                },
                ...(record.status === ORDER_STATUS.PENDING
                  ? [
                      {
                        label: 'Vận chuyển',
                        key: 'delivery',
                        onClick: () => {
                          onOpenTrans(record);
                        },
                      },
                    ]
                  : []),
                ...(record.status === ORDER_STATUS.DELIVERED && isAdmin
                  ? [
                      {
                        label: 'Xác nhận hoàn tiền',
                        key: 'in_refund',
                        onClick: () => {
                          onOpenSend(record);
                        },
                      },
                    ]
                  : []),
                ...(record.status !== ORDER_STATUS.REJECTED
                  ? [
                      {
                        label: 'Từ chối',
                        key: 'Cancel',
                        danger: true,
                        onClick: () => {
                          onOpenCancel(record);
                        },
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
        ),
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
                  history.push({ pathname: `/orders/return?page=${page}&size=${pageSize}` });
                },
                pageSize: params?.size | 10,
                total: data?.totalElements,
              }}
              dataSource={data?.orderReturns as API.OrderReturn[]}
              rowKey="id"
              scroll={{ x: 1400, y: `calc(-524px + 100vh)` }}
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
      <SendRefund
        form={formSend}
        visible={isOpenSend}
        onClose={onCloseSend}
        detail={detail}
        onSendRefund={onSendRefund}
      />
      <CancelOrder
        form={formCancel}
        visible={isOpenCancel}
        onClose={onCloseCancel}
        detail={detail}
        onRejectOrder={onRejectOrder}
      />
    </Fragment>
  );
};

export default OrderReturnTable;
