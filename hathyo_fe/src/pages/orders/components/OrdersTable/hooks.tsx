import { history, useRequest } from '@umijs/max';
import type { FormProps } from 'antd';
import { Form, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

// import { deletePost, post } from '@/services/posts/api';
import {
  cancelOrders,
  getListCityByAhamove,
  getListServiceTypeByAhamove,
  orders,
  transOrders,
} from '@/services/orders/api';
import { useTableUrlParams } from '@/utils/func';

export const useOrdersTable = () => {
  const [detail, setDetail] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTrans, setIsOpenTrans] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [formTrans] = Form.useForm();
  const [formCancel] = Form.useForm();

  const { page = 1, size, status, merchantId } = useTableUrlParams();

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
    loading: loadingTrans,
    data: dataTrans,
    run: handleTransOrders,
  } = useRequest((values) => transOrders(values), {
    manual: true,
  });
  const { run: handleCancelOrders } = useRequest((values) => cancelOrders(values), {
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

  const onCloseCancel = () => {
    formCancel.resetFields();
    setDetail(undefined);
    setIsOpenCancel(false);
  };

  const onTransOrder: FormProps<API.OrderTransRequest>['onFinish'] = async (values) => {
    try {
      const res = await handleTransOrders({
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

  const onCancelOrder: FormProps<API.OrderCancelRequest>['onFinish'] = async (values) => {
    try {
      const res = await handleCancelOrders(values);
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

  return {
    formTrans,
    loading: loading,
    data,
    run,
    loadingListCity,
    dataListCity,
    loadingServiceType,
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
    onCloseTrans,
    isOpenCancel,
    onOpenCancel,
    onCloseCancel,
    formCancel,
  };
};

export const useSearch = () => {
  const onFinish = (values: { status: string; merchantId: string }) => {
    history.push({
      pathname: '/orders/list',
      search: `page=1&size=10&status=${values?.status || 'PENDING'}&merchantId=${
        values?.merchantId || ''
      }`,
    });
  };

  return {
    onFinish,
  };
};
