import { patchMerchant } from '@/services/merchants/api';
import { useRequest } from '@umijs/max';

export const usePatchPostServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.Merchants) => patchMerchant(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};
