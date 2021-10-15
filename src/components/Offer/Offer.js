import React from 'react'
import styled from 'styled-components'
const Offer = ({offer}) => {
  return (
    <OfferContainer>
      <ContentArea>
        <img src={offer.product.imageUrl}  alt="" />
        <DescriptionArea>
        <p>{offer.product.title}</p>
        <div>
        <label htmlFor="">Alınan Teklif:</label>
        <p>{offer.offeredPrice} TL</p>
        </div>
        </DescriptionArea>
      </ContentArea>
      <ButtonArea>
        <button>Onayla</button>
        <button>Reddet</button>
      </ButtonArea>
    </OfferContainer>
  )
}

export default Offer

const OfferContainer = styled.div`
border:1px solid #F2F2F2;
display: flex;
width: 100%;
margin:5px;
border-radius: 8px;
align-items: center;
justify-content: space-between;
padding: 5px;
`

const ContentArea = styled.div`
display: flex;
img{
  width:12%;
  border-radius: 8px;
}

`
const ButtonArea= styled.div`
`
const DescriptionArea = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
  p{
    color:#555555;
    font-size: 18px;
    margin:0
  }
  div{
    background-color: #F2F2F2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 5px 15px;

    p{
      margin:0;
      font-size: 15px;
      font-weight: bold;
      color:#525252
    }
    label{
      font-size: 15px;
      color:#B1B1B1;
      margin-right: 2px;
    }
  }
`