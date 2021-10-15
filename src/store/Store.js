import {createStore, applyMiddleware, compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from '../reducers/AuthReducer'
import CategoryReducer from '../reducers/CategoryReducer';
import ProductsReducer from '../reducers/ProductsReducer';
import AccountReducer from '../reducers/AccountReducer';
import UploadFormReducer from '../reducers/UploadFormReducer';
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(combineReducers({
  auth:AuthReducer,
  category:CategoryReducer,
  product:ProductsReducer,
  account:AccountReducer,
  form:UploadFormReducer
}),composeEnhancers(applyMiddleware(thunk)))