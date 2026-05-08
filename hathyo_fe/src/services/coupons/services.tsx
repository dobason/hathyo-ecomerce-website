import { addCoupon, patchCoupon } from '@/services/coupons/api';
import { useRequest } from '@umijs/max';

export const useCreateCouponServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.CouponFormValue) => addCoupon(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};

export const usePatchCouponServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.CouponFormValue) => patchCoupon(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};
