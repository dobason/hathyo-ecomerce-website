// import { Navigate, Outlet } from 'umi'
import { Navigate, useAccess } from '@umijs/max';

export default () => {
  const access = useAccess();

  if (access?.posts_crud) {
    return <Navigate to="/dashboard" />;
  } else if (access?.merchants_detail) {
    return <Navigate to="/user-management/merchant-info" />;
  } else if (access?.viewer) {
    return <Navigate to="/report" />;
  } else {
    return <Navigate to="/user/login" />;
  }
};
