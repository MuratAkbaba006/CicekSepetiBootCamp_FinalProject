import React,{useEffect} from 'react';
import styled from 'styled-components';
import { UpperFirstLetter } from '../../utils/utils';
import { useHistory } from 'react-router';
import { useDispatch} from 'react-redux';
const Product = ({ product }) => {
  const history = useHistory();
  const dispatch= useDispatch();

  const handleClick = () => {
    history.push(`/detail/${product.id}`)
  }



  return (
    <GridItem onClick={handleClick}>
      <ProductImageArea>
      <img src={product.imageUrl} alt="" />
      </ProductImageArea>
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
  //text-align: center;
  border-radius: 8px;
  cursor:pointer;




`

const ProductInfoArea = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
@media (max-width: 768px){
  display:block;
  justify-content: center;
}
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

const ProductImageArea = styled.div`
max-width: 220px;
display:flex;
align-items:center;
justify-content: center;
position: relative;
img{
  width: 100%;
  object-fit: fill;
  height: 250px;
  border-radius: 8px;
}
`