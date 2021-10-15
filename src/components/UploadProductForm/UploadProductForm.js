import React from 'react';
import styled from 'styled-components';
import UploadImage from '../UploadImage/UploadImage';
const UploadProductForm = () => {
  return (
    <FormContainer>
      <Content>
        <ProductDetail>
          <h4>Ürün Detayları</h4>
          <Name>
            <label htmlFor="">Ürün Adı</label>
            <input type="text" />
          </Name>
          <Description>
            <label htmlFor="">Ürün Açıklaması</label>
            <input type="text" />
          </Description>
          <SelectAreaOne>
            <Category>
              <label htmlFor="">Kategori Seçiniz</label>
              <select name="" id="">
                <option value="">1</option>
                <option value="">1</option>
              </select>
            </Category>
            <Brand>
              <label htmlFor="">Kategori Seçiniz</label>
              <select name="" id="">
                <option value="">1</option>
                <option value="">1</option>
              </select>
            </Brand>

          </SelectAreaOne>
          <SelectAreaTwo>
            <Color>
            <label htmlFor="">Kategori Seçiniz</label>
              <select name="" id="">
                <option value="">1</option>
                <option value="">1</option>
              </select>
            </Color>
            <Status>
            <label htmlFor="">Kategori Seçiniz</label>
              <select name="" id="">
                <option value="">1</option>
                <option value="">1</option>
              </select>
            </Status>
          </SelectAreaTwo>
          <Offer>
            <label htmlFor="">Teklif</label>
            <input type="text" />
            <input type="radio" />
          </Offer>
        </ProductDetail>
        <ProductImageArea>
          <h4>Ürün Görseli</h4>
          <UploadImage/>
        </ProductImageArea>
      </Content>
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
`;

const Content = styled.div`
  display: flex;
`;
const ProductDetail = styled.div`
  display: flex;
  width: 55%;
  border-right: 1px solid green;
  flex-direction: column;
  align-items:center;
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
width:100%;
label{
  display: flex;
  align-items: flex-start;
  width: 90%;
  font-size: 15px;
  color:#525252
}
input{
  width: 90%;
  background-color: #F4F4F4;
  font-size: 16px;
  color:#99A0A7;
  border:none;
  border-radius: 8px;
  padding: 10px 12px;
  outline: none;
  box-sizing: border-box;
}

`
const Description = styled(Name)`

`;
const SelectAreaOne = styled.div`
display:flex;
width:90%;
justify-content:space-between;
`
const Category = styled.div`
display:flex;
flex-direction:column;
width:45%;
margin-bottom:5px;
label{
font-size:15px;
color:#525252;
}
select{
background-color:#F4F4F4;
border-radius: 8px;
color:#99A0A7;
font-size:16px;
outline:none;
padding:5px;
border:none
}

`
const Brand = styled(Category)`

`
const SelectAreaTwo = styled(SelectAreaOne)`

`
const Color = styled(Category)`

`
const Status = styled(Category)`

`
const Offer = styled(Name)`

`