import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Product from '../Product/Product';
import Loading from '../Loading/Loading';

const ProductList = () => {
  const status = useSelector((state) => state.product.status);
  const filter = useSelector((state) => state.product.filteredproductsList);

  if (status === 'loading') {
    return <Loading />;
  }
  return (
    <GridContainer>
      {filter.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </GridContainer>
  );
};

export default ProductList;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 10px;
  gap: 5px;
  width: 86%;
  background-color: #f2f2f2;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;
