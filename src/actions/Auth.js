import Cookie from 'js-cookie';
import { AxiosAuth } from '../config/AxiosBase';

export const SignIn = (email, password) => (dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  AxiosAuth.post('/signin', {
    email,
    password,
  })
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data.access_token,
          response: res,
        });
        Cookie.set('auth_token', res.data.access_token);
      }
    })
    .catch(() => dispatch({ type: 'LOGIN_ERROR', payload: 401 }));
};

export const SignUp = (email, password) => (dispatch) => {
  dispatch({ type: 'REGISTER_START' });
  AxiosAuth.post('/signup', { email, password })
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: res.data.access_token,
          response: res,
        });
        Cookie.set('auth_token', res.data.access_token);
      }
    })
    .catch(() => dispatch({ type: 'REGISTER_ERROR', payload: 409 }));
};

export const LogOut = () => (dispatch) => {
  Cookie.remove('auth_token');
  dispatch({ type: 'LOGOUT' });
};

export const ClearStatusCode = () => (dispatch) => {
  dispatch({ type: 'CLEAR_STATUS_CODE' });
};
