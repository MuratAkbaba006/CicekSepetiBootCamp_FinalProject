import { AxiosPrivate } from '../config/AxiosBase';
export const PostImage = (file,setProgress,progress) => (dispatch) => {
  AxiosPrivate.post(
    '/file/upload/image',
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress:({loaded,total}) => {
        let percent = Math.floor((loaded * 100)/total);
        if(percent < 100 )
        {
          setProgress(percent)
        }
      }
    }
  )
    .then((res) => {
      dispatch({ type: 'POST_IMAGE_SUCCESS', payload: res.data });
      setProgress(100);
      setTimeout(() => {
        setProgress(0)
      }, 100);
    })
    .catch((error) => dispatch({ type: 'POST_IMAGE_ERROR', payload: error }));
};
