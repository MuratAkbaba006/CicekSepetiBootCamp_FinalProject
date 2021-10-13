import { AxiosPublic,AxiosPrivate } from '../config/AxiosBase';

export const getAllProducts = () => (dispatch) => {
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
  dispatch({ type: 'FETCH_BY_CATEGORIES_START' });
  dispatch({ type: 'FETCH_BY_CATEGORIES_SUCCESS', payload: category_id });
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

export const postOffer = (product_id,offer) => (dispatch) => {
  AxiosPrivate.post(`/product/offer/${product_id}`,{offeredPrice:offer}).then(()=>{
    dispatch({type:'POST_OFFER_SUCCESS'})
  })
}
