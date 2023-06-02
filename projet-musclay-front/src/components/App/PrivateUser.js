import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateUser() {
  // const userState = useSelector((state) => state.userReducer);

  // if (!userState.isLogged) {
  //   return <Navigate to="/" />;
  // }

  if (!localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <Outlet />
  );
}

export default PrivateUser;
