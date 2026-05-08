import { useRequest } from '@umijs/max';

import { upload } from '@/services/posts/api';

export const useUpload = () => {
  const { loading, run } = useRequest((file) => upload({ file }), { manual: true });
  return {
    loading,
    run,
  };
};
