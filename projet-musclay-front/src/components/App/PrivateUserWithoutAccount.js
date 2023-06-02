import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateUserWithoutAccount() {
  // const userState = useSelector((state) => state.userReducer);

  // if (!userState.isLogged && !userState.userWithoutAccount) {
  //   return <Navigate to="/" />;
  // }

  if (!localStorage.getItem('token') && !localStorage.getItem('userWithoutAccount')) {
    return <Navigate to="/" />;
  }

  return (
    <Outlet />
  );
}

export default PrivateUserWithoutAccount;
