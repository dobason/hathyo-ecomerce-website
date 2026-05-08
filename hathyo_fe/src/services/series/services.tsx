import { addSeries, patchSeries, updateOrderSeries } from '@/services/series/api';
import { useRequest } from '@umijs/max';

export const useCreateSeriesServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.Series) => addSeries(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};

export const usePatchSeriesServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.Series) => patchSeries(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};

export const useUpdateOrderSeriesServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest(
    (values: API.UpdatePostOrder) => updateOrderSeries(values),
    {
      manual: true,
      onSuccess,
      onError,
    },
  );
  return { loading, data, run };
};
