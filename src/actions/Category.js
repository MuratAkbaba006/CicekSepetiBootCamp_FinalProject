import Cookie from 'js-cookie';
import { AxiosPublic } from '../config/AxiosBase';
export const getAllCategories = () => (dispatch) => {
  dispatch({ type: 'FETCH_ALL_CATEGORIES_START' });
  AxiosPublic.get('/detail/category/all')
    .then((res) => {
      dispatch({ type: 'FETCH_ALL_CATEGORIES_SUCCESS', payload: res.data });
    })
    .catch((error) =>
      dispatch({ type: 'FETCH_ALL_CATEGORIES_ERROR', payload:error })
    );
};
