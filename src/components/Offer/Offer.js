import React from 'react'
import styled from 'styled-components'
const Offer = ({offer}) => {
  return (
    <OffersArea>
      <div>
        <img src={offer.product.imageUrl} style={{width:50}} alt="" />
        <p>{offer.product.title}</p>
      </div>
      <div>
        {offer.offeredPrice}
      </div>
    </OffersArea>
  )
}

export default Offer
const OffersArea = styled.div`
margin-top: 10px;
display: flex;
`;
