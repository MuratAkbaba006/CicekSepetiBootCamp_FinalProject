import Cookie from 'js-cookie';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { AuthControl } from '../actions/Auth';
import Loading from '../components/Loading/Loading';
const ProtectedRoute = ({ children, path }) => {
  const dispatch = useDispatch();
  const {auth_token} = Cookie.get()

  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!auth_token) {
      dispatch(AuthControl());
    }
  }, [dispatch, auth_token]);

  if (status === 'loading') return <Loading/>;
  if (!auth_token) return <Redirect to="/login" />;

  return <Route path={path}>{children}</Route>;
};

export default ProtectedRoute;
