import React,{useRef} from 'react';
import styled from 'styled-components';
import { rejectOffer, acceptOffer } from '../../actions/Account';
import { buyProduct } from '../../actions/Product';
import { useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';
const Offer = ({ offer, name }) => {
  const dispatch = useDispatch();
  const modalRef= useRef();
  console.log(offer);
  const handleRejectOffer = () => {
    dispatch(rejectOffer(offer.id));
  };

  const handleAcceptOffer = () => {
    dispatch(acceptOffer(offer.id));
  };

  const handleBuyProduct = () => {
    modalRef.current.openModal();
    //dispatch(buyProduct(offer.product.id))
  }
  const OfferStatusControl = (status) => {
    //Alınan Teklifler
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

  const ReceivedOfferStatusControl = (status,isSold) => {
    if (status === 'accepted' && isSold === false) {
      return (
        <ReceivedOffersAcceptArea>
          <BuyButton onClick={handleBuyProduct}>
            Satın Al
          </BuyButton>
            <StatusLabel status={status}>{status}</StatusLabel>
        </ReceivedOffersAcceptArea>
      );
    } else {
      if(offer.isSold === 'sold')
      {
        return <div>Satın Alındı</div>
      }
      else{

        return <StatusLabel status={status}>{status}</StatusLabel>;
      }
    }
  };
  return (
    <OfferContainer>
      <ContentArea>
        <ImageArea>
          <img src={offer.product.imageUrl} alt="" />
        </ImageArea>
        <DescriptionArea>
          <p>{offer.product.title}</p>
          <div>
            <label htmlFor="">
              {name === 'Teklif Aldıklarım'
                ? 'Alınan Teklif'
                : 'Verilen Teklif'}
              :
            </label>
            <p>{offer.offeredPrice} TL</p>
          </div>
        </DescriptionArea>
      </ContentArea>
      <ButtonArea>
        {name === 'Teklif Aldıklarım'
          ? OfferStatusControl(offer.status)
          : ReceivedOfferStatusControl(offer.status,offer.product.isSold)}
      </ButtonArea>
      <Modal ref={modalRef}></Modal>
    </OfferContainer>
  );
};

export default Offer;

const OfferContainer = styled.div`
  border: 1px solid #f2f2f2;
  display: flex;
  width: 98%;
  margin: 5px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  box-sizing: border-box;
`;

const ContentArea = styled.div`
  display: flex;
`;
const ButtonArea = styled.div`
  margin-right: 15px;
`;
const Button = styled.button`
  margin-left: 5px;
  cursor: pointer;
  padding: 3px 15px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 15px;
`;

const RejectButton = styled(Button)`
  background-color: #f77474;
`;

const ConfirmButton = styled(Button)`
  background-color: #4b9ce2;
`;
const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    color: #555555;
    font-size: 18px;
    margin: 0 5px;
  }
  div {
    background-color: #f2f2f2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 5px 15px;
    margin: 0 5px;
    p {
      margin: 0;
      font-size: 15px;
      font-weight: bold;
      color: #525252;
    }
    label {
      font-size: 15px;
      color: #b1b1b1;
      margin-right: 2px;
    }
  }
`;

const StatusLabel = styled.div`
  margin-right: 15px;
  color: ${(props) => {
    if (props.status === 'rejected') return '#F77474';
    else if (props.status === 'offered') return 'orange';
    else {
      return '#4B9CE2';
    }
  }};
`;

const ImageArea = styled.div`
  max-width: 100px;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const ReceivedOffersAcceptArea = styled.div`
display:flex;
`

const BuyButton = styled(Button)`
background-color:#4B9CE2;
margin-right:10px;
`