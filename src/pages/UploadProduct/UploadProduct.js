import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import UploadProductForm from '../../components/UploadProductForm/UploadProductForm';

const UploadProduct = () => {
  return (
    <UploadProductContainer>
      <Header />
      <UploadProductForm />
    </UploadProductContainer>
  );
};

export default UploadProduct;

const UploadProductContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
