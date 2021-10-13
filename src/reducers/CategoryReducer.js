const CategoryState = {
  categories:[],
  currentCategories:['Diğer'],
  status:'idle',
  error:null
}

const CategoryReducer = (state=CategoryState,action) => {
  switch(action.type)
  {
    case 'FETCH_ALL_CATEGORIES_START':{
      return {
        ...state,
        status:'loading'
      }
    }
    case 'FETCH_ALL_CATEGORIES_SUCCESS':{
      return {
        ...state,
        categories:action.payload,
        status:'succeded'
      }
    }
    case 'FETCH_ALL_CATEGORIES_ERROR':{
      return {
        ...state,
        error:action.payload,
        status:'error'
      }
    }

    default:
      return state
  }



}

export default CategoryReducer