const UploadFormState = {
  imageUrl: '',
  error: null,
  colors: [],
  brands: [],
  productStatus: [],
  categories: [],
};

const UploadFormReducer = (state = UploadFormState, action) => {
  switch (action.type) {
    case 'POST_IMAGE_SUCCESS': {
      return {
        ...state,
        imageUrl: action.payload,
      };
    }
    case 'POST_IMAGE_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    case 'GET_ALL_DROPDOWNITEM_SUCCESS': {
      return {
        ...state,
        brands: action.payload[0].data,
        colors: action.payload[1].data,
        productStatus: action.payload[2].data,
        categories: action.payload[3].data,
      };
    }
    case 'GET_ALL_DROPDOWNITEM_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default UploadFormReducer;
