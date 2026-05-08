import { addTopic, deleteTopic, patchTopic } from '@/services/topics/api';
import { useRequest } from '@umijs/max';

export const useCreateTopicServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest(addTopic, {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};

export const usePatchTopicServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest(patchTopic, {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};

export const useDeleteTopicServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest(deleteTopic, {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};
