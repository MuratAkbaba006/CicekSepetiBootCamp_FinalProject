const UploadFormState = {
  imageUrl:'',
  error:null
}

const UploadFormReducer = (state=UploadFormState,action) => {
  switch(action.type)
  {
    case 'POST_IMAGE_SUCCESS':{
      return{
        ...state,
        imageUrl:action.payload
      }
    }
    case 'POST_IMAGE_ERROR':{
      return{
        ...state,
        error:action.payload
      }
    }
    default:
      return state
  }
}

export default UploadFormReducer