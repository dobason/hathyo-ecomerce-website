import { history, useRequest } from '@umijs/max';

import { ordersRevenue } from '@/services/orders/api';
import { getSattisticProduct } from '@/services/products/api';
import { useTableUrlParams } from '@/utils/func';
import moment from 'moment';
import QueryString from 'qs';
import { useEffect } from 'react';

export const useOrdersRevenue = () => {
  const { page, size, merchantId, createdTo, createdFrom } = useTableUrlParams();
  const { loading, data, run } = useRequest(
    () =>
      ordersRevenue({
        page: page - 1,
        size: size,
        merchantId: parseInt(merchantId),
        startDate: createdFrom,
        endDate: createdTo,
      }),
    {
      manual: true,
    },
  );

  const {
    loading: loadingStatistic,
    data: dataStatistic,
    run: onGetStatistic,
  } = useRequest(() => getSattisticProduct(), {
    manual: true,
  });

  useEffect(() => {
    run();
    onGetStatistic();
  }, [page, size, merchantId, createdTo, createdFrom]);

  return {
    loading: loading,
    data,
    run,
    loadingStatistic,
    dataStatistic,
    onGetStatistic,
  };
};

export const useSearch = () => {
  const onFinish = (values: API.OrderRevenueSearch) => {
    const search = QueryString.stringify({
      page: 1,
      size: 10,
      merchantId: values?.merchantId || '',
      createdFrom: values?.time?.[0] ? moment(values?.time?.[0]).startOf('D').format("YYYY-MM-DD") : undefined,
      createdTo: values?.time?.[1] ? moment(values?.time?.[1]).endOf('D').format("YYYY-MM-DD") : undefined,
    });
    history.push({
      pathname: '/dashboard',
      search,
    });
  };

  return {
    onFinish,
  };
};
