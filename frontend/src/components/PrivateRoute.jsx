import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return <>{userInfo ? <Outlet /> : <Navigate to={'users/sing_in'} replace />}</>;
};

export default PrivateRoute;
