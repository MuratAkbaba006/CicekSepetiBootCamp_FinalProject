import Cookie from 'js-cookie';
import { AxiosAuth } from '../config/AxiosBase';

export const AuthControl = () => (dispatch) => {
  const { auth_token } = Cookie.get();
  dispatch({ type: 'LOGIN_CONTROL', payload: auth_token });
};

export const SignIn = (email, password) => (dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  AxiosAuth.post('/signin', {
    email,
    password,
  })
    .then((res) => {
      console.log(res.data)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.access_token });
      Cookie.set('auth_token', res.data.access_token);
    })
    .catch((error) => dispatch({ type: 'LOGIN_ERROR', payload: error }));
};

export const SignUp = (email, password) => (dispatch) => {
  dispatch({ type: 'REGISTER_START' });
  AxiosAuth.post('/signup', { email, password })
    .then((res) => {
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data.access_token });
      Cookie.set('auth_token', res.data.access_token);
    })
    .catch((error) => dispatch({ type: 'REGISTER_ERROR', payload: error }));
};

export const LogOut = () => (dispatch) => {
  Cookie.remove('auth_token');
  dispatch({ type: 'LOGOUT' });
};
