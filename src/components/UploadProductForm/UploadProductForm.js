import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Switch from 'react-switch';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../UploadImage/UploadImage';
import { getAllDropdownItem, AddProduct, PostImageClear } from '../../actions/UploadForm';
import { UpperFirstLetter } from '../../utils/utils';
import { addNotification } from '../../actions/Notification';
import {
  FormContainer,
  Content,
  ProductDetail,
  ProductImageArea,
  Name,
  Description,
  SelectAreaOne,
  Category,
  Brand,
  SelectAreaTwo,
  Color,
  Status,
  Offer,
  Error,
} from './ScUploadProductForm';

const UploadProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [offerOpt, setOfferOpt] = useState(false);
  const colors = useSelector((state) => [{ title: 'Renk Seçiniz', id: 1 }, ...state.form.colors]);
  const brands = useSelector((state) => [{ title: 'Marka Seçiniz', id: 1 }, ...state.form.brands]);
  const productStatus = useSelector((state) => [
    { title: 'Kullanım Durumu Seçiniz', id: 1 },
    ...state.form.productStatus,
  ]);
  const categories = useSelector((state) => [{ title: 'Kategori Seçiniz', id: 1 }, ...state.form.categories]);

  const imageurl = useSelector((state) => state.form.imageUrl);
  useEffect(() => {
    dispatch(getAllDropdownItem());
  }, []);

  const handleFormSubmit = (values, { setSubmitting }) => {
    const { price, brand, category, color, description, productname, status } = values;
    if (imageurl === '') {
      dispatch(addNotification({ id: uuid(), type: 'ERROR', message: 'Ürün fotoğrafı eklemelisiniz' }));
      setSubmitting(false);
    } else {
      dispatch(
        AddProduct({
          price: parseInt(price),
          imageUrl: imageurl.url,
          title: productname,
          statusId: status,
          colorId: color,
          brandId: brand,
          categoryId: category,
          description,
          isOfferable: offerOpt,
        })
      );
      dispatch(
        addNotification({
          id: uuid(),
          type: 'SUCCESS',
          message: 'Ürün Ekleme işlemi Başarılı',
        })
      );
      setTimeout(() => {
        history.push('/');
        dispatch(PostImageClear());
      }, 3000);
      setSubmitting(false);
    }
  };
  return (
    <FormContainer>
      <Formik
        initialValues={{
          productname: '',
          description: '',
          category: '',
          brand: '',
          color: '',
          status: '',
          price: 0,
        }}
        validationSchema={Yup.object({
          productname: Yup.string()
            .max(100, 'Ürün ismi 100 karakterden uzun olamaz')
            .required('Bir urün ismi girmelisiniz'),
          description: Yup.string()
            .max(500, 'Ürün açıklaması 500 karakterden uzun olamaz')
            .required('Açıklama girmelisiniz'),
          category: Yup.string().required('Kategori Seçimi yapmalısınız'),
          brand: Yup.string().required('Marka Seçimi yapmalısınız'),
          color: Yup.string().required('Renk Seçimi yapmalısınız'),
          status: Yup.string().required('Durum Seçimi yapmalısınız'),
          price: Yup.number().positive().required('Fiyat girmelisiniz').typeError('Fiyat değeri sayı olmalıdır'),
        })}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, handleBlur, touched, dirty, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Content>
              <ProductDetail>
                <h4>Ürün Detayları</h4>
                <Name>
                  <label htmlFor="productname">Ürün Adı</label>
                  <input
                    type="text"
                    id="productname"
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.productname && touched.productname && <Error>{errors.productname}</Error>}
                </Name>
                <Description>
                  <label htmlFor="description">Ürün Açıklaması</label>
                  <input
                    type="text"
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && touched.description && <Error>{errors.description}</Error>}
                </Description>
                <SelectAreaOne>
                  <Category>
                    <label htmlFor="category">Kategori</label>
                    <select name="" id="category" value={values.category} onChange={handleChange} onBlur={handleBlur}>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id === 1 ? '' : category.id}>
                          {UpperFirstLetter(category.title)}
                        </option>
                      ))}
                    </select>
                    {errors.category && touched.category && <Error>{errors.category}</Error>}
                  </Category>
                  <Brand>
                    <label htmlFor="brand">Marka</label>
                    <select name="" id="brand" value={values.brand} onChange={handleChange} onBlur={handleBlur}>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id === 1 ? '' : brand.id}>
                          {UpperFirstLetter(brand.title)}
                        </option>
                      ))}
                    </select>
                    {errors.brand && touched.brand && <Error>{errors.brand}</Error>}
                  </Brand>
                </SelectAreaOne>
                <SelectAreaTwo>
                  <Color>
                    <label htmlFor="color">Renk</label>
                    <select name="" id="color" value={values.color} onChange={handleChange} onBlur={handleBlur}>
                      {colors.map((color) => (
                        <option key={color.id} value={color.id === 1 ? '' : color.id}>
                          {UpperFirstLetter(color.title)}
                        </option>
                      ))}
                    </select>
                    {errors.color && touched.color && <Error>{errors.color}</Error>}
                  </Color>
                  <Status>
                    <label htmlFor="status">Kullanım Durumu</label>
                    <select name="" id="status" value={values.status} onChange={handleChange} onBlur={handleBlur}>
                      {productStatus.map((status) => (
                        <option key={status.id} value={status.id === 1 ? '' : status.id}>
                          {UpperFirstLetter(status.title)}
                        </option>
                      ))}
                    </select>
                    {errors.status && touched.status && <Error>{errors.status}</Error>}
                  </Status>
                </SelectAreaTwo>
                <Offer>
                  <label htmlFor="price">Fiyat</label>
                  <input type="text" id="price" value={values.price} onChange={handleChange} onBlur={handleBlur} />
                  {errors.price && touched.price && <Error>{errors.price}</Error>}
                  <div>
                    <label htmlFor="offerOpt">Teklif Opsiyonu</label>
                    <Switch
                      onChange={() => setOfferOpt(!offerOpt)}
                      checked={offerOpt}
                      onColor="#86d3ff"
                      onHandleColor="#2693e6"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      id="offerOpt"
                    />
                  </div>
                </Offer>
              </ProductDetail>
              <ProductImageArea>
                <h4>Ürün Görseli</h4>
                <UploadImage errors={errors} />
              </ProductImageArea>
            </Content>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="submit"
                disabled={
                  !dirty ||
                  isSubmitting ||
                  errors.productname ||
                  errors.description ||
                  errors.category ||
                  errors.brand ||
                  errors.color ||
                  errors.status ||
                  errors.price
                }
              >
                Kaydet
              </button>
            </div>
          </form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default UploadProductForm;
