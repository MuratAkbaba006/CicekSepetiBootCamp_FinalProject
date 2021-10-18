const AccountState = {
  givenOffers:[],
  receivedOffers:[],
  status:'idle',
  error:null
}

const AccountReducer = (state = AccountState,action) =>{
  switch(action.type)
  {
    case 'GET_GIVEN_OFFERS_START':{
      return{
        ...state,
        status:'loading'
      }
    }
    case 'GET_GIVEN_OFFERS_SUCCESS':{
      return{
        ...state,
        status:'succeded',
        givenOffers:action.payload
      }
    }
    case 'GET_GIVEN_OFFERS_ERROR':{
      return{
        ...state,
        status:'error',
        error:action.payload
      }
    }

    case 'GET_RECEIVED_OFFERS_START' : {
      return{
        ...state,
        status:'loading'
      }
    }
    case 'GET_RECEIVED_OFFERS_SUCCESS' : {
      return{
        ...state,
        status:'succeded',
        receivedOffers:action.payload
      }
    }
    case 'GET_RECEIVED_OFFERS_ERROR' : {
      return{
        ...state,
        status:'error',
        error:action.payload
      }
    }
    case 'CANCEL_OFFER_SUCCESS':{
      const filteredOffer = state.givenOffers.filter((offer) => offer.id !==action.id )
      console.log(filteredOffer);
      return{
        ...state,
        givenOffers:filteredOffer
      }
    }

    case 'POST_OFFER_SUCCESS':{
      return{
        ...state,
        givenOffers:action.payload
      }
    }

    default:
      return state

  }
}

export default AccountReducer