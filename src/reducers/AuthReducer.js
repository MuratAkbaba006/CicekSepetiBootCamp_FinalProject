const AuthState = {
  auth_token: null,
  status: 'idle',
  error: null,
  statusCode: [],
};

const AuthReducer = (state = AuthState, action) => {
  switch (action.type) {
    case 'LOGIN_CONTROL': {
      return {
        ...state,
        status: 'succeded',
        auth_token: action.payload,
      };
    }
    case 'REGISTER_START': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        auth_token: action.payload,
        status: 'succeded',
        statusCode: {
          code: action.response.status,
          url: action.response.config.url,
        },
      };
    }
    case 'REGISTER_ERROR': {
      return {
        ...state,
        status: 'error',
        error: action.payload,
        statusCode: { code: action.payload, url: '' },
      };
    }
    case 'LOGIN_START': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        auth_token: action.payload,
        status: 'login_success',
        statusCode: {
          code: action.response.status,
          url: action.response.config.url,
        },
      };
    }
    case 'LOGIN_ERROR': {
      return {
        ...state,
        error: action.payload,
        status: 'error',
        statusCode: { code: action.payload, url: '' },
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        auth_token: '',
      };
    }

    case 'CLEAR_STATUS_CODE': {
      return {
        ...state,
        statusCode: [],
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
