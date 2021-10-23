import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { buyProduct,getSingleProduct } from '../../actions/Product';
import { getGivenOffers,getReceivedOffers } from '../../actions/Account';
import {addNotification} from '../../actions/Notification';
import {v4 as uuid} from 'uuid'
const BuyModal = ({modalRef,offer,GaveOfferStatusControl,product}) => {
  const dispatch = useDispatch();
  const handleBuyProduct = (e) => {
    e.stopPropagation();
    console.log('offer',offer);
    dispatch(buyProduct(offer !== null ?offer.product.id:product.id));
    setTimeout(() => {
      dispatch(getSingleProduct(offer !== null ? offer.product.id : product.id));
      dispatch(getGivenOffers());
    dispatch(getReceivedOffers());
    }, 500);
    // getSingleProduct endpointi hızlı çalıştığı için güncelleme olmuyordu
    dispatch(addNotification({id:uuid(),type:'SUCCESS',message:'Satın Alma Başarılı'}))
    if(GaveOfferStatusControl !== undefined)
    {
      GaveOfferStatusControl(offer.status,offer.product.isSold)

    }
    modalRef.current.closeModal();
  }

  const handleCancel = (e) => {
    e.stopPropagation();
    modalRef.current.closeModal();

  }

  return (
    <BuyModalContainer>
      <h2>Satın Al</h2>
      <p>Satın Almak İstiyor musunuz?</p>
      <ButtonArea>
        <CancelButton onClick={handleCancel}>Vazgeç</CancelButton>
        <BuyButton onClick={handleBuyProduct}>Satın Al</BuyButton>
      </ButtonArea>
    </BuyModalContainer>
  )
}

export default BuyModal

const BuyModalContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
h2{
  font-size:25px;
  font-weight:bold;
  color:#525252;
  margin:0;
}
p{
  margin:0;
  font-size:15px;
  color:#555555;
  margin-top:12px;
}
`

const ButtonArea = styled.div`
width:100%;
display:flex;
justify-content:center;
align-items:center;
margin-top:12px;
`

const Button = styled.button`
margin:5px;
border:none;
padding:5px;
font-size:18px;
font-weight:bold;
width:45%;
border-radius:8px;
cursor:pointer;
`

const CancelButton = styled(Button)`
background-color:#F0F8FF;
color:#4B9CE2;
`
const BuyButton = styled(Button)`
background-color:#4B9CE2;
color:#F0F8FF;
`