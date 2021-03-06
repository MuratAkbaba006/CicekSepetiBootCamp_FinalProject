const AccountState = {
  givenOffers: [],
  receivedOffers: [],
  status: 'idle',
  error: null,
};

const AccountReducer = (state = AccountState, action) => {
  switch (action.type) {
    case 'GET_GIVEN_OFFERS_START': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'GET_GIVEN_OFFERS_SUCCESS': {
      return {
        ...state,
        status: 'succeded',
        givenOffers: action.payload,
      };
    }
    case 'GET_GIVEN_OFFERS_ERROR': {
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    }

    case 'GET_RECEIVED_OFFERS_START': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'GET_RECEIVED_OFFERS_SUCCESS': {
      return {
        ...state,
        status: 'succeded',
        receivedOffers: action.payload,
      };
    }
    case 'GET_RECEIVED_OFFERS_ERROR': {
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    }
    case 'OFFER_STATUS_IDLE': {
      return {
        ...state,
        status: 'idle',
      };
    }

    default:
      return state;
  }
};

export default AccountReducer;
