import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import cross from '../../assets/ProductDetail/Group 6618.svg';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { postOffer,getGivenOffers } from '../../actions/Account';
const OfferModal = ({ product,modalRef,setIsGivenOffer,isGivenOfferControl,setOffers,currentOffer }) => {
  const [offer,setOffer] = useState({});
  const [error,setError] = useState({})
  const offer1Ref=useRef();
  const offer2Ref=useRef();
  const offer3Ref=useRef();
  const {auth_token} = Cookie.get();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    if(isNaN(parseInt(e.target.value)) )
    {
      setError({message:'Teklifiniz rakamlarlardan oluşmalıdır'})
    }
    else{
    setOffer({id:e.target.id,offer:parseInt(e.target.value)})
      setError({})
    }

  }
  const closeModal = () => {
    modalRef.current.closeModal();
  }
  const handleFormSubmit = (e) =>{
    e.preventDefault();
    if(!auth_token)
    {
      history.replace('/login')
    }
    else{
      dispatch(postOffer(product.id,offer.offer));
      dispatch(getGivenOffers());
      closeModal();

    }
  }

  const handleFocus = () => {
    offer1Ref.current.checked=false;
    offer2Ref.current.checked=false;
    offer3Ref.current.checked=false;
    setOffer({})
  }


  return (
    <>
      <ModalTitle >
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
        <Offer id={'offer1'} offer={offer}>
          <input type="radio" name="offer" id="offer1" value={Math.floor(product.price*0.20)}  ref={offer1Ref} onClick={handleClick} />
          <label>%20'si Kadar Teklif Ver</label>
        </Offer>
        <Offer id={'offer2'} offer={offer}>
          <input type="radio" name="offer" id="offer2" value={Math.floor(product.price*0.30)}  ref={offer2Ref} onClick={handleClick}/>
          <label>%30'si Kadar Teklif Ver</label>
        </Offer>
        <Offer id={'offer3'} offer={offer}>
          <input type="radio" name="offer" id="offer3" value={Math.floor(product.price*0.40)} ref={offer3Ref} onClick={handleClick} />
          <label>%40'si Kadar Teklif Ver</label>
        </Offer>
        <CustomOffer error={error}>
          <input type="text" id="offer4" name="offer"  placeholder='Teklif Belirtiniz(TL)' onFocus={handleFocus} onChange={handleClick}  />
          {
            error.message !==null && (<label>{error.message}</label>)
          }
        </CustomOffer>
        <Button type="submit" >
          Onayla
        </Button>
      </Form>

    </>
  );
};

export default OfferModal;
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
  padding: 0 2px;
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

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;


`

const Offer = styled.div`
display: flex;
  align-items: center;
  background-color: ${props=> props.offer.id === props.id ? '#F0F8FF' :'#FFFFFF'} ;
  width:100%;
  padding: 9px;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top:5px ;
  border:1px solid #E0E0E0;
  input{



  }
  label{
    font-size: 15px;
    color:${props=> props.offer.id === props.id ? '#4B9CE2' :'#525252'} ;

  }

`

const CustomOffer = styled.div`
display: flex;
width: 100%;
flex-direction: column;
input{
  width: 100%;
  margin-top: 5px;
  padding:9px;
box-sizing: border-box;
border-radius: 8px;
background-color:${props=>props.error.message ? 'red':'#F4F4F4'};
border:none;
font-size: 16px;
:focus{
  outline: none;
}


}
`

const Button = styled.button`
width: 70%;
background-color: #4B9CE2;
margin-top: 5px;
border: none;
border-radius: 8px;
font-size: 18px;
font-weight: bold;
color:#FFFFFF;
padding: 5px;
cursor:pointer
`