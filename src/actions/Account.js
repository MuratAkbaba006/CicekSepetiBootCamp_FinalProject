import { AxiosPrivate } from "../config/AxiosBase"
export const getGivenOffers = () => (dispatch) => {
  dispatch({type:'GET_GIVEN_OFFERS_START'});
  AxiosPrivate.get('/account/given-offers').then((res)=>{
    dispatch({type:'GET_GIVEN_OFFERS_SUCCESS',payload:res.data})
  }).catch((error)=>dispatch({type:'GET_GIVEN_OFFERS_ERROR',payload:error}))
}