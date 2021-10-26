import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';
import { getGivenOffers, cancelOffer, offerStatusIdle } from '../../actions/Account';
import { addNotification } from '../../actions/Notification';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import { getSingleProduct } from '../../actions/Product';
import { UpperFirstLetter } from '../../utils/utils';
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
  BuyInformation,
  OfferInformation,
} from './ScProductDetail';

const Modal = lazy(() => import('../../components/Modal/Modal'));
const OfferModal = lazy(() => import('../../components/OfferModal/OfferModal'));
const BuyModal = lazy(() => import('../../components/BuyModal/BuyModal'));

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
    dispatch(getSingleProduct(product_id));
    if (auth_token !== undefined) {
      dispatch(getGivenOffers());
    }
    return () => {
      dispatch(offerStatusIdle());
    };
  }, []);

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
      givenOffers.map((givenoffer) => {
        if (givenoffer.product.id === product_id) {
          setIsGivenOffer(true);
          setOffer(givenoffer);
        } else {
          counter += 1;
          if (counter === givenOffers.length) {
            setIsGivenOffer(false);
            setOffer(null);
          }
        }
      });
    }
    // ilk olarak givenOffer'lar var mı kontrolü, eğer varsa detayında olduğumuz ürüne verilmiş
    // olan bir teklif varmı kontrolü gerçekleşir. Eşleşme varsa ilgili state değerleri set edilir
    // eşleşme olmayan her durumda counter değeri 1 artırılarak hiç eşleşme olmamışsa ilgili
    // state değerlerinin set edilmesi sağlanır.
  };
  useEffect(() => {
    if (auth_token !== undefined) {
      isGivenOfferControl();
    }
  }, [givenOffers]);

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
          {product.isSold === true && <BuyInformation>Bu Ürün Satışta Değil</BuyInformation>}
          {product.isSold === false && isGivenOffer === true && (
            <OfferInformation>
              <label htmlFor="offer">Verilen Teklif: </label>
              {offer.offeredPrice} TL
            </OfferInformation>
          )}
          {product.isSold === false && isGivenOffer !== true && (
            <ButtonArea>
              <button onClick={openBuyModal}>Satın Al</button>
              {product.isOfferable && <button onClick={openModal}>Teklif Ver</button>}
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
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
