import { useRequest } from '@umijs/max';
import { register } from './auth';

export const useRegisterServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.RegisterParams) => register(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};
