import React from 'react';
import {
  BuyModalContainer,
  ButtonArea,
  Button,
  CancelButton,
  BuyButton,
} from './ScBuyModal';
import { useDispatch } from 'react-redux';
import { buyProduct, getSingleProduct } from '../../actions/Product';
import { getGivenOffers, getReceivedOffers } from '../../actions/Account';
import { addNotification } from '../../actions/Notification';
import { v4 as uuid } from 'uuid';
const BuyModal = ({ modalRef, offer, GaveOfferStatusControl, product }) => {
  const dispatch = useDispatch();
  const handleBuyProduct = (e) => {
    e.stopPropagation();
    dispatch(buyProduct(offer !== null ? offer.product.id : product.id));
    setTimeout(() => {
      dispatch(
        getSingleProduct(offer !== null ? offer.product.id : product.id)
      );
      dispatch(getGivenOffers());
      dispatch(getReceivedOffers());
    }, 500);
    // getSingleProduct endpointi hızlı çalıştığı için güncelleme olmuyordu
    dispatch(
      addNotification({
        id: uuid(),
        type: 'SUCCESS',
        message: 'Satın Alma Başarılı',
      })
    );
    if (GaveOfferStatusControl !== undefined) {
      GaveOfferStatusControl(offer.status, offer.product.isSold);
    }
    modalRef.current.closeModal();
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    modalRef.current.closeModal();
  };

  return (
    <BuyModalContainer>
      <h2>Satın Al</h2>
      <p>Satın Almak İstiyor musunuz?</p>
      <ButtonArea>
        <CancelButton onClick={handleCancel}>Vazgeç</CancelButton>
        <BuyButton onClick={handleBuyProduct}>Satın Al</BuyButton>
      </ButtonArea>
    </BuyModalContainer>
  );
};

export default BuyModal;
