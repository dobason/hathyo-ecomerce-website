import { useRequest } from '@umijs/max';
import { addProduct, patchProduct } from './api';

export const useCreateProductServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.Product) => addProduct(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};

export const usePatchProductServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.Product) => patchProduct(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};
