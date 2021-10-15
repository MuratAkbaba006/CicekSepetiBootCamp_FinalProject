import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { Formik } from 'formik';
import * as Yup from 'yup';
import UploadImage from '../UploadImage/UploadImage';
import { getAllDropdownItem,AddProduct } from '../../actions/UploadForm';
import { useDispatch, useSelector } from 'react-redux';
import { UpperFirstLetter } from '../../utils/utils';
const UploadProductForm = () => {
  const dispatch = useDispatch();
  const [offerOpt, setOfferOpt] = useState(false);
  const colors = useSelector((state) => [
    { title: 'Renk Seçiniz', id: 1 },
    ...state.form.colors,
  ]);
  const brands = useSelector((state) => [
    { title: 'Marka Seçiniz', id: 1 },
    ...state.form.brands,
  ]);
  const productStatus = useSelector((state) => [
    { title: 'Kullanım Durumu Seçiniz', id: 1 },
    ...state.form.productStatus,
  ]);
  const categories = useSelector((state) => [
    { title: 'Kategori Seçiniz', id: 1 },
    ...state.form.categories,
  ]);

  const imageurl = useSelector((state) => state.form.imageUrl);

  useEffect(() => {
    dispatch(getAllDropdownItem());
  }, []);

  const handleFormSubmit = (values) => {
  const {price,brand,category,color,description,productname,status} = values;
  dispatch(AddProduct({
    price:parseInt(price),
    imageUrl:imageurl.url,
    title:productname,
    statusId:status,
    colorId:color,
    brandId:brand,
    categoryId:category,
    description,
    isOfferable:offerOpt,}))
  }
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
          productname: Yup.string().required('Bir urün ismi girmelisiniz'),
          description: Yup.string().required('Açıklama girmelisiniz'),
          category: Yup.string().required('Kategori Seçimi yapmalısınız'),
          brand: Yup.string().required('Marka Seçimi yapmalısınız'),
          color: Yup.string().required('Renk Seçimi yapmalısınız'),
          status: Yup.string().required('Durum Seçimi yapmalısınız'),
          price: Yup.number().required('Fiyat girmelisiniz'),
        })}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          touched,
          dirty,
          isSubmitting,
        }) => (
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
                  />
                </Name>
                <Description>
                  <label htmlFor="description">Ürün Açıklaması</label>
                  <input
                    type="text"
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Description>
                <SelectAreaOne>
                  <Category>
                    <label htmlFor="category">Kategori</label>
                    <select
                      name=""
                      id="category"
                      value={values.category}
                      onChange={handleChange}
                      defaultValue="category"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {UpperFirstLetter(category.title)}
                        </option>
                      ))}
                    </select>
                  </Category>
                  <Brand>
                    <label htmlFor="brand">Marka</label>
                    <select
                      name=""
                      id="brand"
                      defaultValue="marka"
                      value={values.brand}
                      onChange={handleChange}
                    >
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {UpperFirstLetter(brand.title)}
                        </option>
                      ))}
                    </select>
                  </Brand>
                </SelectAreaOne>
                <SelectAreaTwo>
                  <Color>
                    <label htmlFor="color">Renk</label>
                    <select
                      name=""
                      id="color"
                      value={values.color}
                      onChange={handleChange}
                    >
                      {colors.map((color) => (
                        <option key={color.id} value={color.id}>
                          {UpperFirstLetter(color.title)}
                        </option>
                      ))}
                    </select>
                  </Color>
                  <Status>
                    <label htmlFor="status">Kullanım Durumu</label>
                    <select
                      name=""
                      id="status"
                      value={values.status}
                      onChange={handleChange}
                    >
                      {productStatus.map((category) => (
                        <option key={category.id} value={category.id}>
                          {UpperFirstLetter(category.title)}
                        </option>
                      ))}
                    </select>
                  </Status>
                </SelectAreaTwo>
                <Offer>
                  <label htmlFor="price">Fiyat</label>
                  <input
                    type="text"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                  />
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
                <UploadImage />
              </ProductImageArea>
            </Content>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <button type="submit" disabled={!dirty || isSubmitting}>
                Onayla
              </button>
            </div>
          </form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default UploadProductForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 86%;
  height: 50%;
  background-color: #ffffff;
  margin-top: 15px;
  border-radius: 8px;
  button {
    display: flex;
    background-color: red;
    width: 30%;
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
`;
const ProductDetail = styled.div`
  display: flex;
  width: 55%;
  border-right: 1px solid green;
  flex-direction: column;
  align-items: center;
`;

const ProductImageArea = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

  label {
    display: flex;
    align-items: flex-start;
    width: 90%;
    font-size: 15px;
    color: #525252;
  }
  input {
    width: 90%;
    background-color: #f4f4f4;
    font-size: 16px;
    color: #99a0a7;
    border: none;
    border-radius: 8px;
    padding: 10px 12px;
    outline: none;
    box-sizing: border-box;
    :focus {
      background-color: #f0f8ff;
    }
  }
`;
const Description = styled(Name)``;
const SelectAreaOne = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;
const Category = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-bottom: 5px;
  label {
    font-size: 15px;
    color: #525252;
  }
  select {
    background-color: #f4f4f4;
    border-radius: 8px;
    color: #99a0a7;
    font-size: 16px;
    outline: none;
    padding: 5px;
    border: none;
  }
`;
const Brand = styled(Category)``;
const SelectAreaTwo = styled(SelectAreaOne)``;
const Color = styled(Category)``;
const Status = styled(Category)``;
const Offer = styled(Name)`
  align-items: flex-start;
  margin-left: 10%;
  input {
    width: 30%;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    width: 30%;
    justify-content: space-around;
    align-items: center;
    label {
      margin: 0px;
      padding: 0px;
    }
  }
`;
