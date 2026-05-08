import { addContent, patchContent } from '@/services/static-content/api';
import { useRequest } from '@umijs/max';

export const useCreateContentServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.ContentFormValue) => addContent(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};

export const usePatchContentServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.ContentFormValue) => patchContent(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};
