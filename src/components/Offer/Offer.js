import React,{useRef,useEffect} from 'react';
import styled from 'styled-components';
import { rejectOffer, acceptOffer,getGivenOffers,getReceivedOffers,offerStatusIdle } from '../../actions/Account';
import { buyProduct } from '../../actions/Product';
import { useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';
import BuyModal from '../BuyModal/BuyModal';
import { useHistory } from 'react-router';
const Offer = ({ offer, name }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalRef= useRef();
  console.log('offer',offer);
useEffect(() => {
return () => {
  dispatch(offerStatusIdle())
}
},[])


  const handleRejectOffer = (e) => {
    e.stopPropagation();
    dispatch(rejectOffer(offer.id));
    setTimeout(() => {
      dispatch(getReceivedOffers())
    }, 500);
  };

  const handleAcceptOffer = (e) => {
    e.stopPropagation();
    dispatch(acceptOffer(offer.id));
    setTimeout(() => {
      dispatch(getReceivedOffers())
    }, 500);

  };

  const handleBuyProduct = (e) => {
    e.stopPropagation();
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

  const handlegoDetail = (e) => {
    const id = offer.product.id;
    history.push(`/detail/${id}`)
  }

  const GaveOfferStatusControl = (status,isSold) => {
    if (status === 'accepted' && isSold === false) {
      return (
        <GaveOffersAcceptArea>
          <BuyButton onClick={handleBuyProduct}>
            Satın Al
          </BuyButton>
            <StatusLabel status={status}>Onaylandı</StatusLabel>
        </GaveOffersAcceptArea>
      );
    } else {
      if(offer.isSold === 'sold')
      {
        return <div style={{color:'#46AF32'}}>Satın Alındı</div>
      }
      else{

        return <StatusLabel status={status} >{status === 'rejected' ? 'Reddedildi':'Bekleniyor'}</StatusLabel>;
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
          : GaveOfferStatusControl(offer.status,offer.product.isSold)}
      </ButtonArea>
      <Modal ref={modalRef}>
      <BuyModal modalRef={modalRef} offer={offer} GaveOfferStatusControl={GaveOfferStatusControl}/>
      </Modal>
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
  cursor:pointer;
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

const GaveOffersAcceptArea = styled.div`
display:flex;
`

const BuyButton = styled(Button)`
background-color:#4B9CE2;
margin-right:10px;
`