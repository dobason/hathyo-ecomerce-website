import { useParams, useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import { isEmpty, pick } from 'lodash';
import { useEffect } from 'react';

import { detailSeries } from '@/services/series/api';
import { usePatchSeriesServices, useUpdateOrderSeriesServices } from '@/services/series/services';

export const useDetail = () => {
  const [form] = Form.useForm();
  const { id = '' } = useParams();

  const { loading: getting, refresh, data: seriesDetail } = useRequest(() => detailSeries({ id }));

  const onSuccess = () => {
    message.success('Cập nhật Series thành công');
    refresh();
  };

  const onError = (e: Error) => {
    console.log(e);
    message.error('Lỗi cập nhật Series');
  };

  const { loading, run: onPatch } = usePatchSeriesServices({ onSuccess, onError });
  const { loading: updating, run: onUpdate } = useUpdateOrderSeriesServices({ onSuccess, onError });

  const onFinish = (values: API.Series) => {
    onPatch({ ...values, id });
  };

  const onUpdateOrder = (values: API.PostOrder[]) => {
    onUpdate({ body: values, id });
  };

  useEffect(() => {
    if (!isEmpty(seriesDetail)) {
      form.setFieldsValue({
        ...pick(seriesDetail, ['title', 'content']),
      });
    }
  }, [seriesDetail]);

  return {
    seriesDetail,
    form,
    loading: loading || getting || updating,
    onFinish,
    onUpdateOrder,
  };
};
