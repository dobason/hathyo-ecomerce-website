import { addPost, patchPost } from '@/services/posts/api';
import { useRequest } from '@umijs/max';

export const useCreatePostServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.PostFormValue) => addPost(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};

export const usePatchPostServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest((values: API.PostFormValue) => patchPost(values), {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};
