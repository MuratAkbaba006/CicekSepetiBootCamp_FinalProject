import Cookie from 'js-cookie';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
const ProtectedRoute = ({ children, path }) => {
  const {auth_token} = Cookie.get()

  const status = useSelector((state) => state.auth.status);



  if (status === 'loading') return <Loading/>;
  if (auth_token===undefined) return <Redirect to="/login" />;

  return <Route path={path}>{children}</Route>;
};

export default ProtectedRoute;
