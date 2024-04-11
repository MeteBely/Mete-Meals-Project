import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return <>{userInfo && userInfo.isAdmin ? <Outlet /> : <div className="mt-20">You are not authorized for an admin!</div>}</>;
};

export default AdminRoute;
