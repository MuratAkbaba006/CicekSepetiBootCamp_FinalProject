import { AxiosPrivate, AxiosPublic } from '../config/AxiosBase';
export const PostImage =
  (file, setProgress, setIsCompleteUpload) => (dispatch) => {
    AxiosPrivate.post('/file/upload/image', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: ({ loaded, total }) => {
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setProgress(percent);
        }
      },
    })
      .then((res) => {
        dispatch({ type: 'POST_IMAGE_SUCCESS', payload: res.data });
        setProgress(100);
        setIsCompleteUpload(true);
        setTimeout(() => {
          setProgress(0);
        }, 100);
      })
      .catch((error) => dispatch({ type: 'POST_IMAGE_ERROR', payload: error }));
  };

const BrandRequest = () => {
  return AxiosPublic.get('/detail/brand/all');
};
const ColorRequest = () => {
  return AxiosPublic.get('/detail/color/all');
};

const StatusRequest = () => {
  return AxiosPublic.get('/detail/status/all');
};

const CategoryRequest = () => {
  return AxiosPublic.get('/detail/category/all');
};

export const getAllDropdownItem = () => (dispatch) => {
  Promise.all([
    BrandRequest(),
    ColorRequest(),
    StatusRequest(),
    CategoryRequest(),
  ])
    .then((res) => {
      dispatch({ type: 'GET_ALL_DROPDOWNITEM_SUCCESS', payload: res });
    })
    .catch((error) =>
      dispatch({ type: 'GET_ALL_DROPDOWNITEM_ERROR', payload: error })
    );
};

const SingleBrandRequest = (brandId) => {
  return AxiosPublic.get(`detail/brand/${brandId}`);
};
const SingleColorRequest = (colorId) => {
  return AxiosPublic.get(`detail/color/${colorId}`);
};

const SingleStatusRequest = (statusId) => {
  return AxiosPublic.get(`detail/status/${statusId}`);
};

const SingleCategoryRequest = (categoryId) => {
  return AxiosPublic.get(`detail/category/${categoryId}`);
};

export const AddProduct =
  ({
    price,
    imageUrl,
    title,
    statusId,
    colorId,
    brandId,
    categoryId,
    description,
    isOfferable,
  }) =>
  (dispatch) => {
    Promise.all([
      SingleBrandRequest(brandId),
      SingleColorRequest(colorId),
      SingleStatusRequest(statusId),
      SingleCategoryRequest(categoryId),
    ])
      .then((res) => {
        const data = AxiosPrivate.post(
          '/product/create',
          {
            price,
            imageUrl,
            title,
            status: res[2].data,
            color: res[1].data,
            brand: res[0].data,
            category: res[3].data,
            description,
            isOfferable,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        return data;
      })
      .then((response) => {});
  };
