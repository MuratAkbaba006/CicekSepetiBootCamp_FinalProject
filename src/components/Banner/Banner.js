import React from 'react';
import banner from '../../assets/Home/Banner1.png';
import styled from 'styled-components';
const Banner = () => {
  return (
    <BannerContainer>
      <img src={banner} alt="" />
    </BannerContainer>
  )
}

export default Banner

const BannerContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-top: 15px;
img{
  width: 86%;
}
`