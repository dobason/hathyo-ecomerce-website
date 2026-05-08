import { history, useRequest } from '@umijs/max';
import type { FormProps } from 'antd';
import { Form, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

// import { deletePost, post } from '@/services/posts/api';
import {
  cancelOrderReturn,
  getListCityByAhamove,
  getListServiceTypeByAhamove,
  orders,
  rejectOrderReturn,
  sentRefund,
  transOrderReturn,
} from '@/services/orders-return/api';
import { useTableUrlParams } from '@/utils/func';

export const useOrderReturnTable = () => {
  const [detail, setDetail] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTrans, setIsOpenTrans] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenSend, setIsOpenSend] = useState(false);
  const [formTrans] = Form.useForm();
  const [formCancel] = Form.useForm();
  const [formSend] = Form.useForm();

  const { page = 1, size, status, merchantId } = useTableUrlParams();

  const { run: handleRejectOrderReturn } = useRequest((values) => rejectOrderReturn(values), {
    manual: true,
  });

  const { loading, data, run } = useRequest(
    () => orders({ page: page - 1, size: size, status, merchantId }),
    {
      manual: true,
    },
  );
  const {
    loading: loadingListCity,
    data: dataListCity,
    run: onInitListCity,
  } = useRequest(() => getListCityByAhamove(), {
    manual: true,
  });
  const {
    loading: loadingServiceType,
    data: dataServiceType,
    run: onGetServiceType,
  } = useRequest((city_id) => getListServiceTypeByAhamove({ city_id }), {
    manual: true,
  });
  const {
    loading: loadingSend,
    data: dataSend,
    run: sendRefund,
  } = useRequest((values) => sentRefund(values), {
    manual: true,
  });

  const {
    loading: loadingTrans,
    data: dataTrans,
    run: handleTransOrderReturn,
  } = useRequest((values) => transOrderReturn(values), {
    manual: true,
  });
  const { run: handleCancelOrderReturn } = useRequest((values) => cancelOrderReturn(values), {
    manual: true,
  });

  // const updateStatusSuccess = () => {
  //   run();
  //   message.success('Cập nhật trạng thái thành công');
  // };

  // const { loading: deleting, run: updateStatus } = useRequest((params) => patchStatus(params), {
  //   manual: true,
  //   onSuccess: updateStatusSuccess,
  // });

  // const changeStatus = ({ status, id }: API.UpdateMerchantStatusParams) => {
  //   updateStatus({ status, id });
  // };

  useEffect(() => {
    run();
  }, [page, size, status, merchantId]);

  useEffect(() => {
    onInitListCity();
  }, []);

  const onOpenDetail = (item: any) => {
    setDetail(item);
    setIsOpen(true);
  };

  const onCloseDetail = () => {
    setDetail(undefined);
    setIsOpen(false);
  };

  const onOpenTrans = (item: any) => {
    setDetail(item);
    setIsOpenTrans(true);
  };

  const onCloseTrans = () => {
    formTrans.resetFields();
    setDetail(undefined);
    setIsOpenTrans(false);
  };

  const onOpenCancel = (item: any) => {
    setDetail(item);
    setIsOpenCancel(true);
  };

  const onOpenSend = (item: any) => {
    setDetail(item);
    setIsOpenSend(true);
  };

  const onCloseCancel = () => {
    formCancel.resetFields();
    setDetail(undefined);
    setIsOpenCancel(false);
  };

  const onCloseSend = () => {
    formSend.resetFields();
    setDetail(undefined);
    setIsOpenSend(false);
  };

  const onTransOrder: FormProps<API.OrderTransRequest>['onFinish'] = async (values) => {
    try {
      const res = await handleTransOrderReturn({
        ...values,
        order_time: moment(values.order_time).format('YYYY-MM-DD HH:mm:ss'),
      });
      if (!!res.message) {
        message.warning(res.message);
        return;
      }
      message.success('Cập nhật trạng thái thành công!');
      onCloseTrans();
      run();
      console.log('res', res);
    } catch (e) {
      console.log('Error', e);
    }
  };

  const onSendRefund: FormProps<API.OrderTransRequest>['onFinish'] = async (values) => {
    try {
      const res = await sendRefund(values);
      if (!!res.message) {
        message.warning(res.message);
        return;
      }
      message.success('Cập nhật trạng thái thành công!');
      onCloseTrans();
      run();
      console.log('res', res);
    } catch (e) {
      console.log('Error', e);
    }
  };

  const onCancelOrder: FormProps<API.OrderCancelRequest>['onFinish'] = async (values) => {
    try {
      const res = await handleCancelOrderReturn(values);
      if (!!res.message) {
        message.warning(res.message);
        return;
      }
      message.success('Cập nhật trạng thái thành công!');
      onCloseCancel();
      run();
      console.log('res', res);
    } catch (e) {
      console.log('Error', e);
    }
  };

  const onRejectOrder: FormProps<API.OrderRejectRequest>['onFinish'] = async (values) => {
    try {
      const res = await handleRejectOrderReturn(values);

      if (!!res.message) {
        message.warning(res.message);
        return;
      }
      message.success('Từ chối yêu cầu hoàn trả thành công!');
      onCloseCancel();
      run();
    } catch (e) {
      console.error('Reject error:', e);
      message.error('Từ chối thất bại');
    }
  };

  return {
    formTrans,
    loading: loading,
    data,
    run,
    loadingListCity,
    dataListCity,
    loadingServiceType,
    loadingSend,
    dataSend,
    dataServiceType,
    onGetServiceType,
    onTransOrder,
    onCancelOrder,
    loadingTrans,
    dataTrans,
    detail,
    isOpen,
    onOpenDetail,
    onCloseDetail,
    isOpenTrans,
    setIsOpenTrans,
    onOpenTrans,
    onSendRefund,
    onCloseTrans,
    isOpenCancel,
    onOpenCancel,
    onCloseCancel,
    formCancel,
    isOpenSend,
    onOpenSend,
    onCloseSend,
    formSend,
    onRejectOrder,
  };
};

export const useSearch = () => {
  const onFinish = (values: { status: string; merchantId: string }) => {
    history.push({
      pathname: '/orders/return',
      search: `page=1&size=10&status=${values?.status || 'PENDING'}&merchantId=${
        values?.merchantId || ''
      }`,
    });
  };

  return {
    onFinish,
  };
};
