import { useAccess } from '@umijs/max';

export const usePermissionCategory = () => {
  const access = useAccess();

  const permissionCrudCate = access?.admin;

  return {
    permissionCrudCate,
  };
};
