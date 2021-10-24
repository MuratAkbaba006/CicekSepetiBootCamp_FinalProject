import React from 'react';
import {
  GridItem,
  ProductInfoArea,
  BrandTitle,
  Color,
  Price,
  ProductImageArea,
} from './ScProduct';
import { UpperFirstLetter } from '../../utils/utils';
import { useHistory } from 'react-router';
const Product = ({ product }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/detail/${product.id}`);
  };

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
