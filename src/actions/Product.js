import { AxiosPublic, AxiosPrivate } from '../config/AxiosBase';

export const getAllProducts = ({where}) => (dispatch) => {
  console.log(where);
  dispatch({ type: 'FETCH_ALL_PRODUCTS_START' });
  AxiosPublic.get('/product/all')
    .then((res) => {
      dispatch({ type: 'FETCH_ALL_PRODUCTS_SUCCESS', payload: res.data });
    })
    .catch((error) =>
      dispatch({ type: 'FETCH_ALL_PRODUCTS_ERROR', payload: error })
    );
};

export const getByCategory = (category_id) => (dispatch) => {
  console.log('from action',category_id);
  dispatch({ type: 'FETCH_BY_CATEGORIES_START' });
  AxiosPublic.get('/product/all').then((res) => {
  dispatch({ type: 'FETCH_BY_CATEGORIES_SUCCESS', payload: res.data, category_id:category_id });

  })
};

export const getSingleProduct = (product_id) => (dispatch) => {
  dispatch({ type: 'FETCH_SINGLE_PRODUCT_START' });
  AxiosPublic.get(`/product/${product_id}`)
    .then((res) => {
      dispatch({ type: 'FETCH_SINGLE_PRODUCT_SUCCESS', payload: res.data });
    })
    .catch((error) =>
      dispatch({ type: 'FETCH_SINGLE_PRODUCT_ERROR', payload: error })
    );
};



export const buyProduct = (product_id) => (dispatch) => {
  console.log(product_id);
  AxiosPrivate.put(`/product/purchase/${product_id}`).then((res) => {
    dispatch({type: 'BUY_PRODUCT_SUCCESS',payload:res.data})
    console.log(res)
  })
}