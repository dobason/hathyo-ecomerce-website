import { addCate, deleteCate } from '@/services/categories/api';
import { useRequest } from '@umijs/max';

export const useCreateCateServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest(addCate, {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};

// export const usePatchCateServices = ({
//   onSuccess,
//   onError,
// }: {
//   onError: (e: Error) => void;
//   onSuccess: (e: unknown) => void;
// }) => {
//   const { loading, data, run } = useRequest(patchCate, {
//     manual: true,
//     onSuccess,
//     onError,
//   });
//   return { loading, data, run };
// };

export const useDeleteCateServices = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: (e: unknown) => void;
}) => {
  const { loading, data, run } = useRequest(deleteCate, {
    manual: true,
    onSuccess,
    onError,
  });
  return { loading, data, run };
};
