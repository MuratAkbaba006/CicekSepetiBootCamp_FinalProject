import React, { useRef, useState } from 'react';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postOffer, getGivenOffers } from '../../actions/Account';
import { ModalTitle, SmallproductArea, Form, Offer, CustomOffer, Button } from './ScOfferModal';
import cross from '../../assets/ProductDetail/Group 6618.svg';

const OfferModal = ({ product, modalRef }) => {
  const [offer, setOffer] = useState({});
  const [error, setError] = useState({});
  const offer1Ref = useRef();
  const offer2Ref = useRef();
  const offer3Ref = useRef();
  const { auth_token } = Cookie.get();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    if (Number.isNaN(parseInt(e.target.value))) {
      setError({ message: 'Teklifiniz rakamlarlardan oluşmalıdır' });
    } else {
      setOffer({ id: e.target.id, offer: parseInt(e.target.value) });
      setError({});
    }
  };
  const closeModal = () => {
    modalRef.current.closeModal();
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!auth_token) {
      history.replace('/login');
    } else {
      dispatch(postOffer(product.id, offer.offer));
      setTimeout(() => {
        dispatch(getGivenOffers());
      }, 500);
      closeModal();
    }
  };

  const handleFocus = () => {
    offer1Ref.current.checked = false;
    offer2Ref.current.checked = false;
    offer3Ref.current.checked = false;
    setOffer({});
  };

  return (
    <>
      <ModalTitle>
        <p>Teklif Ver</p>
        <img src={cross} alt="" onClick={closeModal} />
      </ModalTitle>
      <SmallproductArea>
        <div>
          <img src={product.imageUrl} alt="" />
          <p>{product.title}</p>
        </div>
        <p>{product.price} TL</p>
      </SmallproductArea>

      <Form onSubmit={handleFormSubmit}>
        <Offer id="offer1" offer={offer}>
          <input
            type="radio"
            name="offer"
            id="offer1"
            value={Math.floor(product.price * 0.2)}
            ref={offer1Ref}
            onClick={handleClick}
          />
          <label>%20&apos;si Kadar Teklif Ver</label>
        </Offer>
        <Offer id="offer2" offer={offer}>
          <input
            type="radio"
            name="offer"
            id="offer2"
            value={Math.floor(product.price * 0.3)}
            ref={offer2Ref}
            onClick={handleClick}
          />
          <label>%30&apos;u Kadar Teklif Ver</label>
        </Offer>
        <Offer id="offer3" offer={offer}>
          <input
            type="radio"
            name="offer"
            id="offer3"
            value={Math.floor(product.price * 0.4)}
            ref={offer3Ref}
            onClick={handleClick}
          />
          <label>%40&apos;ı Kadar Teklif Ver</label>
        </Offer>
        <CustomOffer error={error}>
          <input
            type="text"
            id="offer4"
            name="offer"
            placeholder="Teklif Belirtiniz(TL)"
            onFocus={handleFocus}
            onChange={handleClick}
          />
          {error.message !== null && <label style={{ color: 'red' }}>{error.message}</label>}
        </CustomOffer>
        <Button type="submit" disabled={error.message !== undefined}>
          Onayla
        </Button>
      </Form>
    </>
  );
};

export default OfferModal;
