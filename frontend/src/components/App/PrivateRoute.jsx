import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../../hooks/useAuth.js';

import ROUTES from '../../utils/routes.js';

const PrivateRoute = ({ children }) => {
  const authHandle = useAuth();
  const location = useLocation();

  return authHandle.loggedIn ? (
    children
  ) : (
    <Navigate to={ROUTES.login()} state={{ from: location }} />
  );
};

export default PrivateRoute;
