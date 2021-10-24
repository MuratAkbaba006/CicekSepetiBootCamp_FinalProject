import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { getSingleProduct } from '../../actions/Product';
import {
  ProductDetailContainer,
  ImageArea,
  ProductArea,
  Content,
  Title,
  Info,
  Price,
  ButtonArea,
  Description,
  ModalTitle,
  SmallproductArea,
  Information,
  BuyInformation,
  OfferInformation,
} from './ScProductDetail';
import { UpperFirstLetter } from '../../utils/utils';
import Modal from '../../components/Modal/Modal';
import OfferModal from '../../components/OfferModal/OfferModal';
import {
  getGivenOffers,
  cancelOffer,
  offerStatusIdle,
} from '../../actions/Account';
import BuyModal from '../../components/BuyModal/BuyModal';
import Cookies from 'js-cookie';
import { addNotification } from '../../actions/Notification';
import { v4 as uuid } from 'uuid';
import Loading from '../../components/Loading/Loading';
const ProductDetail = () => {
  const { product_id } = useParams();
  const { auth_token } = Cookies.get();
  const modalRef = useRef();
  const buyModalRef = useRef();
  const [isGivenOffer, setIsGivenOffer] = useState(false);
  const [offer, setOffer] = useState(null);
  const product = useSelector((state) => state.product.currentProduct);
  const dispatch = useDispatch();
  const givenOffers = useSelector((state) => state.account.givenOffers);
  let counter = 0;

  const openModal = () => {
    if (auth_token === undefined) {
      dispatch(
        addNotification({
          id: uuid(),
          type: 'WARNING',
          message: 'Giriş yapmalısınız',
        })
      );
    } else {
      modalRef.current.openModal();
    }
  };
  useEffect(() => {
    //isGivenOfferControl();
    dispatch(getSingleProduct(product_id));
    if (auth_token !== undefined) {
      dispatch(getGivenOffers());
    }
    return () => {
      dispatch(offerStatusIdle());
    };
  }, []);

  useEffect(() => {
    if (auth_token !== undefined) {
      isGivenOfferControl();
    }
  }, [givenOffers]);

  const openBuyModal = () => {
    if (auth_token === undefined) {
      dispatch(
        addNotification({
          id: uuid(),
          type: 'WARNING',
          message: 'Giriş yapmalısınız',
        })
      );
    } else {
      buyModalRef.current.openModal();
    }
  };

  const isGivenOfferControl = () => {
    if (givenOffers.length === 0) {
      setIsGivenOffer(false);
      setOffer(null);
    } else {
      givenOffers.map((offer) => {
        if (offer.product.id === product_id) {
          setIsGivenOffer(true);

          setOffer(offer);
        } else {
          counter++;
          if (counter === givenOffers.length) {
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
      dispatch(getGivenOffers());
      isGivenOfferControl();
    }, 1000);
  };

  if (product === null) {
    return <Loading />;
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
          {product.isSold === true && (
            <BuyInformation>Bu Ürün Satışta Değil</BuyInformation>
          )}
          {product.isSold === false && isGivenOffer === true && (
            <OfferInformation>
              <label htmlFor="offer">Verilen Teklif: </label>
              {offer.offeredPrice} TL
            </OfferInformation>
          )}
          {product.isSold === false && isGivenOffer !== true && (
            <ButtonArea>
              <button onClick={openBuyModal}>Satın Al</button>
              {product.isOfferable && (
                <button onClick={openModal}>Teklif Ver</button>
              )}
            </ButtonArea>
          )}

          {product.isSold === false && isGivenOffer === true && (
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
        <OfferModal
          product={product}
          modalRef={modalRef}
          setIsGivenOffer={setIsGivenOffer}
          isGivenOfferControl={isGivenOfferControl}
          setOffers={setOffer}
          currentOffer={offer}
        />
      </Modal>
      <Modal ref={buyModalRef}>
        <BuyModal modalRef={buyModalRef} offer={offer} product={product} />
      </Modal>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
