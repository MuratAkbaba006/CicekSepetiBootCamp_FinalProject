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
    })
    .catch((error) =>
      dispatch({ type: 'GET_RECEIVED_OFFERS_ERROR', payload: error })
    );
};

export const rejectOffer = (id) => (dispatch) => {
  AxiosPrivate.post(`/account/reject-offer/${id}`).then((res) => {
    dispatch({type:'POST_REJECT_OFFER_SUCCESS',payload:res.data})
  })
}

export const acceptOffer = (id) => (dispatch) => {
  AxiosPrivate.put(`/account/accept-offer/${id}`).then((res) => {
    dispatch({type:'PUT_ACCEPT_OFFER_SUCCESS',payload:res.data})
  })
}