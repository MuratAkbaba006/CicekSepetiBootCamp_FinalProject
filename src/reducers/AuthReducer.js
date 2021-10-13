const AuthState = {
  auth_token:'',
  status:'idle',
  error:null
}

const AuthReducer = (state=AuthState,action) => {
  switch(action.type)
  {

    case 'LOGIN_CONTROL':{
      return {
        ...state,
        status:'succeded',
        auth_token:action.payload
      }
    }
    case "REGISTER_START":{
      return {
        ...state,
        status:'loading'
      }
    }
    case "REGISTER_SUCCESS":{
      return {
        ...state,
        auth_token:action.payload,
        status:'succeded'
      }
    }
    case "REGISTER_ERROR":{
      return {
        ...state,
        status:'error',
        error:action.payload
      }
    }
    case "LOGIN_START": {
      return {
        ...state,
        status:'loading',
      }
    }
    case "LOGIN_SUCCESS" : {
      return {
        ...state,
        auth_token:action.payload,
        status:'succeded'
      }
    }
    case "LOGIN_ERROR":{
      return {
        ...state,
        error:action.payload
      }
    }
    case "LOGOUT":{
      return {
        ...state,
        auth_token:''
      }
    }

    default:
      return state;
  }
}

export default AuthReducer