const ProductState = {
  products:[],
  filteredproductsList:[],
  currentProduct:null,
  status:'idle',
  error:null
}

const ProductsReducer = (state = ProductState,action) => {
  switch(action.type)
  {
    case 'FETCH_ALL_PRODUCTS_START':{
      return {
        ...state,
        status:'loading'
      }
    }
    case 'FETCH_ALL_PRODUCTS_SUCCESS':{
      return{
        ...state,
        status:'succeded',
        products:action.payload,
        filteredproductsList:action.payload
      }
    }
    case 'FETCH_ALL_PRODUCTS_ERROR' :{
      return{
        ...state,
        status:'error',
        error:action.payload
      }
    }
    case 'FETCH_BY_CATEGORIES_START':{
      return {
        ...state,
        status:'loading'
      }
    }
    case 'FETCH_BY_CATEGORIES_SUCCESS':{
     if(action.payload === 1)
     {

      return{
        ...state,
        status:'succeded',
        filteredproductsList:state.products
      }
     }
     else{
      const filteredProducts = state.products.filter((product) => product.category.id === action.payload)
      return{
        ...state,
        status:'succeded',
        filteredproductsList:filteredProducts
      }
     }
    }
    case 'FETCH_SINGLE_PRODUCT_START':{
      return {
        ...state,
        status:'loading'
      }
    }
    case 'FETCH_SINGLE_PRODUCT_SUCCESS':{
      return {
        ...state,
        status:'succeded',
        currentProduct:action.payload
      }
    }
    case 'FETCH_SINGLE_PRODUCT_ERROR':{
      return {
        ...state,
        status:'error',
        error:action.payload
      }
    }
    case 'POST_OFFER_SUCCESS':{
      return{
        ...state,
        status:'succeded'
      }
    }
    default:
      return state
  }
}

export default ProductsReducer