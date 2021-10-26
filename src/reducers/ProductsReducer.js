const ProductState = {
  products: [],
  filteredproductsList: [],
  currentProduct: null,
  status: 'idle',
  error: null,
};

const ProductsReducer = (state = ProductState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_PRODUCTS_START': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'FETCH_ALL_PRODUCTS_SUCCESS': {
      return {
        ...state,
        status: 'succeded',
        products: action.payload,
        filteredproductsList: action.payload,
      };
    }
    case 'FETCH_ALL_PRODUCTS_ERROR': {
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    }
    case 'FETCH_BY_CATEGORIES_START': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'FETCH_BY_CATEGORIES_SUCCESS': {
      if (action.category_id === '1') {
        return {
          ...state,
          products: action.payload,
          status: 'succeded',
          filteredproductsList: action.payload,
        };
      } else {
        const filteredProducts = action.payload.filter(
          (product) => product.category.id === action.category_id
        );
        return {
          ...state,
          status: 'succeded',
          filteredproductsList: filteredProducts,
        };
      }
    }
    // gelen kategori id bilgisi 1 ise tüm ürünleri değil ise ilgili id değerine sahip ürünleri set eder
    case 'FETCH_SINGLE_PRODUCT_START': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'FETCH_SINGLE_PRODUCT_SUCCESS': {
      return {
        ...state,
        status: 'succeded',
        currentProduct: action.payload,
      };
    }
    case 'FETCH_SINGLE_PRODUCT_ERROR': {
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default ProductsReducer;
