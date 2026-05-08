import { useAccess } from '@umijs/max';

export const usePermissionTopic = () => {
  const access = useAccess();

  const permissionCrudTopic = access?.topics_crud;

  return {
    permissionCrudTopic,
  };
};
