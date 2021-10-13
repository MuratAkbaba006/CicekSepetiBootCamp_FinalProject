import React from 'react';
import styled from 'styled-components';
import { UpperFirstLetter } from '../../utils/utils';
import { useHistory } from 'react-router';
const Product = ({ product }) => {
  const history = useHistory();
  const handleClick = () => {
    console.log(product.id)
    history.push(`/detail/${product.id}`)
  }


  return (
    <GridItem onClick={handleClick}>
      <img src={product.imageUrl} alt="" />
      <ProductInfoArea>
        <BrandTitle>{UpperFirstLetter(product.brand.title)}</BrandTitle>
        <Color>
          <label htmlFor="">Renk:</label>
          <p>{UpperFirstLetter(product.color.title)}</p>
        </Color>
      </ProductInfoArea>
      <Price>
          <label htmlFor="">{product.price} TL</label>
      </Price>
    </GridItem>
  );
};

export default Product;

const GridItem = styled.div`
  background-color: #ffffff;
  padding: 10px;
  font-size: 30px;
  text-align: center;
  border-radius: 8px;
  cursor:pointer;

  img{
    width: 100%;
    border-radius:8px;
    background-color: red;

  }

`

const ProductInfoArea = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const BrandTitle = styled.div`
font-size: 15px;
font-weight: bold;
color:#4B9CE2;
`

const Color = styled.div`
display: flex;
align-items: center;

label{
  font-weight: bold;
  color:#3E3E3E;
  font-size: 13px;
  margin-right: 2px;
}
p{
  color:#3E3E3E;
  font-size: 13px;
}
`

const Price = styled.div`
color:#3E3E3E;
font-size: 18px;
font-weight: bold;
display: flex;
justify-content: flex-start;
`