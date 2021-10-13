import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { getSingleProduct } from '../../actions/Product';
import styled from 'styled-components';
import { UpperFirstLetter } from '../../utils/utils';
import Modal from '../../components/Modal/Modal';
import cross from '../../assets/ProductDetail/Group 6618.svg';
import OfferModal from '../../components/OfferModal/OfferModal';
const ProductDetail = () => {
  const { product_id } = useParams();
  const modalRef = useRef();
  const product = useSelector((state) => state.product.currentProduct);
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();

  const openModal = () => {
    modalRef.current.openModal();
  };
  useEffect(() => {
    dispatch(getSingleProduct(product_id));
  }, [dispatch, product_id]);

  console.log(product);
  if (product === null) {
    return <div>Loafinf...</div>;
  }
  return (
    <ProductDetailContainer>
      <Header />
      <ProductArea>
        <ImageArea>
          <img src={product.imageUrl} alt="" />
        </ImageArea>
        <Content>
          <Title>{product.title}</Title>
          <Info>
            <div>
              <label htmlFor="">Marka:</label>
              <p>{UpperFirstLetter(product.brand.title)}</p>
            </div>
            <div>
              <label htmlFor="">Renk:</label>
              <p>{UpperFirstLetter(product.color.title)}</p>
            </div>
            <div>
              <label htmlFor="">Kullanım Durumu:</label>
              <p>{UpperFirstLetter(product.status.title)}</p>
            </div>
          </Info>
          <Price>{product.price} TL</Price>
          <ButtonArea>
            <button>Satın Al</button>
            {product.isOfferable && <button onClick={openModal}>Teklif Ver</button>}
          </ButtonArea>
          <Description>
            <label htmlFor="">Açıklama</label>
            <p>{product.description}</p>
          </Description>
        </Content>
      </ProductArea>
      <Modal ref={modalRef}>
        <OfferModal product={product} modalRef={modalRef}/>
      </Modal>
    </ProductDetailContainer>
  );
};

export default ProductDetail;

const ProductDetailContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImageArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  img {
    border-radius: 8px;
    width: 75%;
  }
`;
const ProductArea = styled.div`
  background-color: #ffffff;
  width: 86%;
  height: 78%;
  margin-top: 20px;
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
`;

const Content = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
`;

const Title = styled.div`
  color: #555555;
  font-size: 34px;
  margin-bottom: 18px;
`;
const Info = styled.div`
  div {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    label {
      color: #525252;
      font-size: 15px;
      font-weight: bold;
      min-width: 200px;
      margin: 0;
    }
    p {
      color: #525252;
      font-size: 15px;
      margin-left: 15px;
      margin: 0;
    }
  }
`;
const Price = styled.div`
  color: #525252;
  font-size: 25px;
  font-weight: bold;
  margin-top: 9px;
`;
const ButtonArea = styled.div`
  display: flex;
  margin-top: 30px;
  button {
    width: 35%;
    margin-right: 10px;
    padding: 7px;
    border-radius: 8px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    background-color: #f0f8ff;
    color: #4b9ce2;
    &:hover {
      background-color: #4b9ce2;
      color: #ffffff;
    }
  }
`;
const Description = styled.div`
  margin-top: 25px;
  label {
    margin: 0;
    font-size: 18px;
    color: #525252;
    font-weight: bold;
  }
  p {
    margin: 0;
    font-size: 15px;
    color: #555555;
  }
`;
const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    font-size: 25px;
    font-weight: bold;
    color: #525252;
    margin: 0;
  }
  img {
    margin: 0;
  }
`;

const SmallproductArea = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f0f8ff;
  border-radius: 10px;
  align-items: center;
  padding: 2px;
  div {
    height: 10%;
    display: flex;
    img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
    }
    p {
      font-size: 13px;
      color: #555555;
    }
  }
  p {
    font-size: 18px;
    font-weight: bold;
    color: #525252;
  }
`;
