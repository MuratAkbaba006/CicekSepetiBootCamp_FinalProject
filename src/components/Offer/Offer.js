import React, { useRef, useEffect, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { rejectOffer, acceptOffer, getReceivedOffers, offerStatusIdle } from '../../actions/Account';
import Loading from '../Loading/Loading';
import {
  OfferContainer,
  ContentArea,
  ButtonArea,
  RejectButton,
  ConfirmButton,
  DescriptionArea,
  StatusLabel,
  ImageArea,
  GaveOffersAcceptArea,
  BuyButton,
} from './ScOffer';

const Modal = lazy(() => import('../Modal/Modal'));
const BuyModal = lazy(() => import('../BuyModal/BuyModal'));

const Offer = ({ offer, name }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalRef = useRef();
  useEffect(() => {
    return () => {
      dispatch(offerStatusIdle());
    };
  }, []);

  const handleRejectOffer = (e) => {
    e.stopPropagation();
    dispatch(rejectOffer(offer.id));
    setTimeout(() => {
      dispatch(getReceivedOffers());
    }, 500);
  };

  const handleAcceptOffer = (e) => {
    e.stopPropagation();
    dispatch(acceptOffer(offer.id));
    setTimeout(() => {
      dispatch(getReceivedOffers());
    }, 500);
  };

  const handleBuyProduct = (e) => {
    e.stopPropagation();
    modalRef.current.openModal();
  };
  const OfferStatusControl = (status) => {
    // Alınan Teklifler
    if (status === 'offered') {
      return (
        <>
          <ConfirmButton onClick={handleAcceptOffer}>Onayla</ConfirmButton>
          <RejectButton onClick={handleRejectOffer}>Reddet</RejectButton>
        </>
      );
    } else {
      const statusTurkish = status === 'rejected' ? 'Reddedildi' : 'Onaylandı';
      return <StatusLabel status={status}>{statusTurkish}</StatusLabel>;
    }
  };

  const handlegoDetail = () => {
    const { id } = offer.product;
    history.push(`/detail/${id}`);
  };

  const GaveOfferStatusControl = (status, isSold) => {
    if (status === 'accepted' && isSold === false) {
      return (
        <GaveOffersAcceptArea>
          <BuyButton onClick={handleBuyProduct}>Satın Al</BuyButton>
          <StatusLabel status={status}>Onaylandı</StatusLabel>
        </GaveOffersAcceptArea>
      );
    } else {
      if (offer.isSold === 'sold') {
        return <div style={{ color: '#46AF32' }}>Satın Alındı</div>;
      } else {
        return <StatusLabel status={status}>{status === 'rejected' ? 'Reddedildi' : 'Bekleniyor'}</StatusLabel>;
      }
    }
  };
  return (
    <OfferContainer onClick={handlegoDetail}>
      <ContentArea>
        <ImageArea>
          <img src={offer.product.imageUrl} alt="" />
        </ImageArea>
        <DescriptionArea>
          <p>{offer.product.title}</p>
          <div>
            <label htmlFor="">{name === 'Teklif Aldıklarım' ? 'Alınan Teklif:' : 'Verilen Teklif:'}</label>
            <p>{offer.offeredPrice} TL</p>
          </div>
        </DescriptionArea>
      </ContentArea>
      <ButtonArea>
        {name === 'Teklif Aldıklarım'
          ? OfferStatusControl(offer.status)
          : GaveOfferStatusControl(offer.status, offer.product.isSold)}
      </ButtonArea>
      <Suspense fallback={<Loading />}>
        <Modal ref={modalRef}>
          <BuyModal modalRef={modalRef} offer={offer} GaveOfferStatusControl={GaveOfferStatusControl} />
        </Modal>
      </Suspense>
    </OfferContainer>
  );
};

export default Offer;
