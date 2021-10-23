import { AxiosPrivate } from '../config/AxiosBase';
export const getGivenOffers = () => (dispatch) => {
  dispatch({ type: 'GET_GIVEN_OFFERS_START' });
  AxiosPrivate.get('/account/given-offers')
    .then((res) => {
      dispatch({ type: 'GET_GIVEN_OFFERS_SUCCESS', payload: res.data });

    })
    .catch((error) =>
      dispatch({ type: 'GET_GIVEN_OFFERS_ERROR', payload: error })
    );
};

export const getReceivedOffers = () => (dispatch) => {
  dispatch({ type: 'GET_RECEIVED_OFFERS_START' });
  AxiosPrivate.get('/account/received-offers')
    .then((res) => {
      dispatch({ type: 'GET_RECEIVED_OFFERS_SUCCESS', payload: res.data });
      console.log(res);
    })
    .catch((error) =>
      dispatch({ type: 'GET_RECEIVED_OFFERS_ERROR', payload: error })
    );
};

export const postOffer = (product_id, offer) => (dispatch) => {
  AxiosPrivate.post(`/product/offer/${product_id}`, {
    offeredPrice: offer,
  }).then((res) => {
    dispatch({type:'POST_OFFER_SUCCESS',payload:res})
  });
};

export const rejectOffer = (id) => (dispatch) => {
  AxiosPrivate.post(`/account/reject-offer/${id}`).then((res) => {
    dispatch({type:'POST_REJECT_OFFER_SUCCESS',payload:res})

  })
}

export const acceptOffer = (id) => (dispatch) => {
  AxiosPrivate.put(`/account/accept-offer/${id}`).then((res) => {
    dispatch({type:'PUT_ACCEPT_OFFER_SUCCESS',payload:res})

  })
}

export const cancelOffer = (id) => (dispatch) => {
  AxiosPrivate.delete(`/account/cancel-offer/${id}`).then((res) => {
    dispatch({type:'CANCEL_OFFER_SUCCESS',payload:res,id:id});

  })
}

export const offerStatusIdle = () => (dispatch) => {
  dispatch({type:'OFFER_STATUS_IDLE'})
}