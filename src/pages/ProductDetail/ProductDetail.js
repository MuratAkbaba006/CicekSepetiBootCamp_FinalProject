import React, { useEffect, useRef,useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { getSingleProduct } from '../../actions/Product';
import styled from 'styled-components';
import { UpperFirstLetter } from '../../utils/utils';
import Modal from '../../components/Modal/Modal';
import OfferModal from '../../components/OfferModal/OfferModal';
import { getGivenOffers,cancelOffer,offerStatusIdle } from '../../actions/Account';
import BuyModal from '../../components/BuyModal/BuyModal';
import Cookies from 'js-cookie';
import { addNotification } from '../../actions/Notification';
import {v4 as uuid} from 'uuid'
import Loading from '../../components/Loading/Loading';
const ProductDetail = () => {
  const { product_id } = useParams();
  const {auth_token} = Cookies.get();
  const modalRef = useRef();
  const buyModalRef = useRef();
  const [isGivenOffer,setIsGivenOffer] = useState(false);
  const [offer,setOffer] = useState(null);
  const product = useSelector((state) => state.product.currentProduct);
  const dispatch = useDispatch();
  const givenOffers = useSelector((state) => state.account.givenOffers);
  let counter = 0;

  const openModal = () => {
    if(auth_token === undefined)
    {
      dispatch((addNotification({id:uuid(),type:'WARNING',message:'Giriş yapmalısınız'})))
    }
    else{
      modalRef.current.openModal();
    }
  };
  useEffect(  ()  => {
     //isGivenOfferControl();
     dispatch(getSingleProduct(product_id));
     if(auth_token !== undefined)
     {
      dispatch(getGivenOffers())
     }
     return () => {
      dispatch(offerStatusIdle());
     }
  }, []);

  useEffect(() => {
    if(auth_token !== undefined)
    {
      isGivenOfferControl();
    }
  },[givenOffers])



  const openBuyModal = () => {
    if(auth_token === undefined)
    {
      dispatch((addNotification({id:uuid(),type:'WARNING',message:'Giriş yapmalısınız'})))
    }
    else{

      buyModalRef.current.openModal();
    }
  }


  const isGivenOfferControl = () => {
    if(givenOffers.length===0)
    {
      setIsGivenOffer(false);
      setOffer(null);
    }
    else{
      givenOffers.map((offer) => {
        if (offer.product.id === product_id) {
          setIsGivenOffer(true);

          setOffer(offer)
        }
        else{
          counter ++;
          if(counter === givenOffers.length)
          {
            setIsGivenOffer(false);
            setOffer(null);
          }
        }
      });
    }

  };

  const handleCancelOffer = () => {
    dispatch(cancelOffer(offer.id));
    setTimeout(() => {
     dispatch(getSingleProduct(product_id));
     dispatch(getGivenOffers())
     isGivenOfferControl();
    }, 1000);

  }

  if (product === null  ) {
    return <Loading/>;
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
          {product.isSold === true && <BuyInformation>Bu Ürün Satışta Değil</BuyInformation>}
          {product.isSold === false && isGivenOffer === true && (
            <OfferInformation><label htmlFor="offer">Verilen Teklif: </label>{offer.offeredPrice} TL</OfferInformation>
          )}
          {(product.isSold === false &&
            isGivenOffer !==
              true) && (
                <ButtonArea>
                  <button onClick={openBuyModal}>Satın Al</button>
                  {product.isOfferable && (
                    <button onClick={openModal}>Teklif Ver</button>
                  )}
                </ButtonArea>
              )}

          {product.isSold === false &&
            isGivenOffer ===
              true &&(
                <ButtonArea>
                  <button onClick={openBuyModal}>Satın Al</button>
                  <button onClick={handleCancelOffer}>Teklifi Geri çek</button>
                </ButtonArea>
              )}
          <Description>
            <label htmlFor="">Açıklama</label>
            <p>{product.description}</p>
          </Description>
        </Content>
      </ProductArea>
      <Modal ref={modalRef}>
        <OfferModal product={product} modalRef={modalRef} setIsGivenOffer={setIsGivenOffer} isGivenOfferControl={isGivenOfferControl} setOffers={setOffer} currentOffer={offer}/>
      </Modal>
      <Modal ref={buyModalRef}>
        <BuyModal modalRef={buyModalRef} offer={offer} product={product} />
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
  @media (max-width: 768px){
    height: 100%;
  }

`;
const ImageArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  img {
    border-radius: 8px;
    width: 75%;
    @media (max-width: 768px){
    width:100%;
  }
  }
  @media (max-width: 768px){
    width:100%;
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

  @media (max-width: 768px){
    display: block;
    height:100%;
    width: 90%;
  }
`;

const Content = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  @media (max-width:768px){
    width:100%;
  }
`;

const Title = styled.div`
  color: #555555;
  font-size: 34px;
  margin-bottom: 18px;

  @media (max-width: 768px){
    display:flex;
    width:100%;
    font-size:18px;
  }
`;
const Info = styled.div`

  div {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    width:50%;

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

const Information = styled.div`
font-size: 18px;
font-weight: bold;
width: 50%;
text-align: center;
padding: 5px;
border-radius: 8px;
margin-top:10px;
`
const BuyInformation = styled(Information)`
background-color: #FFF0E2;
color:#FAAD60;

`

const OfferInformation = styled(Information)`
background-color:#F2F2F2;
font-size:15px;
color:#525252;

label{
  color:#B1B1B1;
  font-weight:600;
}

`